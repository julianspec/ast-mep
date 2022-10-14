import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Transferencia } from 'src/app/_model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ExportPDFService, TransferenciaService } from 'src/app/_servicios';
import { SelectionModel } from '@angular/cdk/collections';
import { DialogoConfirmacionComponent } from '../..';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { EntidadPipe } from 'src/app/_helpers';
import { LoadingComponent } from '../../loading/loading.component';
import { GlobalService } from 'src/app/_helpers/global.service';
import { DialogoCorrectoComponent } from '../../dialogo-correcto/dialogo-correcto.component';

@Component({
  selector: 'app-tabla-aprobacion',
  templateUrl: './tabla-aprobacion.component.html',
  styleUrls: ['.././tabla.component.css'],
  providers: [DatePipe, CurrencyPipe, EntidadPipe]
})
export class AprobacionComponent implements OnInit {

   _registros = [] as Transferencia[];
   displayedColumns: string[] = ['select','detalle', 'operatoria','cliente','moneda','importe','entidadDeudora','cuentaDeudora','entidadAcreedora','cuentaAcreedora','usuarioAlta', 'fechaAlta'];
   dataSource: MatTableDataSource<Transferencia>;
   selection = new SelectionModel<Transferencia>(true, []);
   completo: boolean;
   subtitulo: string = "";
   tabIndex = 1 as number;
   fechaConsultada = {} as Date;
   procesadas: number = 1;
   rechazadas: number = 1;
   procesando:boolean = false;

   @Input() set registros(value: Transferencia[]) {
      this._registros = value;
      this.dataSource.data = this._registros;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
   }

   //@Input() set filtroAutomaticas(value: boolean){
   //   this.automaticas = value
   //}

   @Input() set displayColumns(value: string[]) {
      this.displayedColumns = value;
   }

   @Input() set TabId(value: number){
      this.tabIndex = value;
   }

   @Input() set fechaConsulta(value: Date){
      this.fechaConsultada = value;
   }

   @Input() set subTitulo(value: string) {
      this.subtitulo = value;
   }

   @Output() activeLoading = new EventEmitter<Boolean>();
   @Output() itemAprove = new EventEmitter<Boolean>();
   @Output() itemSend = new EventEmitter<Boolean>();
   @Output() itemReject = new EventEmitter<Transferencia>();

   @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
   @ViewChild(MatSort, { static: true }) sort: MatSort;

   constructor(private router: Router,
               private datePipe: DatePipe,
               private currencyPipe: CurrencyPipe,
               private entidadPipe: EntidadPipe,
               private pdfService: ExportPDFService,
               public dialog: MatDialog,
               public loadDialog: MatDialog,
               private global: GlobalService,
               private transferenciaService: TransferenciaService) {
      this.dataSource = new MatTableDataSource(this.registros);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
   }

   ngOnInit(): void {

   }

   Rechazar(registro: Transferencia) {
      var i = this.selection.selected.length;
      this.transferenciaService.Rechazar(registro.id).subscribe(
         (salida) => {

               if(i == this.rechazadas){
                  this.itemReject.emit(registro);
                  this.selection.clear();
                  this.rechazadas = 0
                  this.procesando = false;
                  setTimeout(()=>{ this.dialog.closeAll() }, 4000)
               }
               this.rechazadas++;

               return salida;
            }
      );
   }

   applyFilter(filterValue: string) {

      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
         this.dataSource.paginator.firstPage();
      }
   }

   isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
   }

   verDetalle(transferencia: Transferencia, tabIndex: number, fechaConsultada: Date){
      transferencia.edit = false;
      this.router.navigate(['/transferencias/reenvio'], {state: {transferencia, tabIndex, fechaConsultada}});
   }

   editDetalle(transferencia: Transferencia, tabIndex: number, fechaConsultada: Date){
      transferencia.edit = true;
      this.router.navigate(['/transferencias/reenvio'], {state: {transferencia, tabIndex, fechaConsultada}});
   }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
   masterToggle() {
      this.isAllSelected() ?
         this.selection.clear() :
         this.dataSource.data.forEach(row => this.selection.select(row));
   }

   aprobarSeleccionado() {
      var i = this.selection.selected.length;
      this.procesando = true;

      //CONTROLO QUE QUIEN APRUEBE NO SEA QUIEN DIO DE ALTA
      var data = this.selection.selected.filter(x => x.usuarioAlta == this.global.getUser().usuario).length;

      if(data > 0){
         this.mensaje("Error al aprobar Transferencias", "No se pueden aprobar transferencias que hayan sido dadas de alta por el usuario.", true);
         this.procesando = false;
         return;
      }

      this.loadingDialog();
      this.selection.selected.forEach(s => {
         this.transferenciaService.Autorizar(s.id).subscribe(
            (salida) => {
               if(i == this.procesadas){
                  this.itemAprove.emit(true);
                  this.selection.clear();
                  this.procesadas = 0
                  this.procesando = false;
                  setTimeout(()=>{ this.dialog.closeAll() }, 4000)
               }
               this.procesadas++;
            });
         }
      );
   }

   enviarSeleccionado() {
      var i = this.selection.selected.length;
      this.procesando = true;

      //CONTROLO QUE QUIEN APRUEBE NO SEA QUIEN DIO DE ALTA
      var data = this.selection.selected.filter(x => x.usuarioAprueba == this.global.getUser().usuario).length;

      if(data > 0){
         this.mensaje("Error al enviar Transferencias", "No se pueden enviar transferencias que hayan sido aprobadas por el usuario.", true);
         this.procesando = false;
         return;
      }

      this.loadingDialog();
      var list = [] as number[];
      this.selection.selected.forEach(s => list.push(s.id));

      this.transferenciaService.EnviarListado(list).subscribe(
         (salida) => {
            this.itemSend.emit(true);
            this.selection.clear();
            this.procesadas = 0
            this.procesando = false;
            setTimeout(()=>{ this.dialog.closeAll() }, 4000)

         },
         error => {
            this.itemSend.emit(true);
            this.selection.clear();
            this.procesadas = 0
            this.procesando = false;
            setTimeout(()=>{ this.dialog.closeAll() }, 4000)
         }
      );
   }


   mensaje(titulo: string, mensaje:string, error: boolean){
      this.dialog
         .open(DialogoCorrectoComponent, {
            data: {titulo, mensaje, error}
         })
         .afterClosed()
         .subscribe((confirmado: Boolean) => {
            return;
         });
   }

   rechazarSeleccionado() {
      this.loadingDialog();
      this.procesando = true;
      this.selection.selected.forEach(s => {
         this.Rechazar(s)
      });
      //this.selection.clear();
   }

   generatePdf() {
      this.pdfService.generatePdf('open', this.getReporte(this._registros), 'Bandeja de Control', this.subtitulo);
   }

   getReporte(data: Transferencia[]) {
      return {
         style: 'tableBody',
         table: {
            widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
            body: [
               [
                  {
                     text: 'Codigo MEP',
                     style: 'tableHeader'
                  },
                  {
                     text: 'Cliente',
                     style: 'tableHeader'
                  },
                  {
                     text: 'Moneda',
                     style: 'tableHeader'
                  },
                  {
                     text: 'Importe',
                     style: 'tableHeader'
                  },
                  {
                     text: 'Entidad Deudora',
                     style: 'tableHeader'
                  },
                  {
                     text: 'Cuenta Deudora',
                     style: 'tableHeader'
                  },
                  {
                     text: 'Entidad Acreedora',
                     style: 'tableHeader'
                  },
                  {
                     text: 'Cuenta Acreedora',
                     style: 'tableHeader'
                  },
                  {
                     text: 'Usuario Alta',
                     style: 'tableHeader'
                  },
                  {
                     text: 'Fecha Alta',
                     style: 'tableHeader'
                  }
               ],
               ...data.map(ed => {
                  return [ed.codigoOperatoria,
                          ed.nombreCliente.toUpperCase(),
                          ed.moneda,
                          (ed.moneda=='80'?'$ ':'u$s ') + this.currencyPipe.transform(ed.importe.toString().trim().replace(",",".")).replace("$", ""),
                          this.entidadPipe.transform(ed.codigoEntidadDeudora),
                          ed.codigoCuentaDeudora,
                          this.entidadPipe.transform(ed.codigoEntidadAcreedora),
                          ed.codigoCuentaAcreedora,
                          ed.usuarioAlta,
                          this.datePipe.transform(ed.fechaAlta, 'short')];
               }),

            ]
         }
      };
   }

   solicitarConfirmacionAprobar(){
      this.dialog
            .open(DialogoConfirmacionComponent, {
               data: `¿Desea APROBAR las transferencias seleccionadas?`
            })
            .afterClosed()
            .subscribe((confirmado: Boolean) => {
            if (confirmado) {

               this.aprobarSeleccionado();

            } else {
               return;
            }
         });
   }

   solicitarConfirmacionEnviar(){
      this.dialog
            .open(DialogoConfirmacionComponent, {
               data: `¿Desea ENVIAR las transferencias seleccionadas?`
            })
            .afterClosed()
            .subscribe((confirmado: Boolean) => {
            if (confirmado) {

               this.enviarSeleccionado();

            } else {
               return;
            }
         });
   }

   solicitarConfirmacionRechazar(){
      this.dialog
            .open(DialogoConfirmacionComponent, {
               data: `¿Desea RECHAZAR las transferencias seleccionadas?`
            })
            .afterClosed()
            .subscribe((confirmado: Boolean) => {
            if (confirmado) {
               this.rechazarSeleccionado();
            } else {
               return;
            }
         });
   }

   onPaginateChange(event){
      //alert(JSON.stringify(event))
   }

   loadingDialog(){
      this.dialog
         .open(LoadingComponent, {
            data: `Se estan procesando las transferencias. Aguarde por favor...`
         })
   }

   //verAutomaticas(valor: any){
   //   if (this.automaticas){
   //      if(!valor){
//
   //         this.dataSource.data = this._registros.filter(r=>{return r.origen != "AUTOMATICO"});
   //         this.dataSource.paginator = this.paginator;
   //         this.dataSource.sort = this.sort;
//
   //      }else{
   //         this.dataSource.data = this._registros;
   //         this.dataSource.paginator = this.paginator;
   //         this.dataSource.sort = this.sort;
   //      }
//
   //   }
   //}

}
