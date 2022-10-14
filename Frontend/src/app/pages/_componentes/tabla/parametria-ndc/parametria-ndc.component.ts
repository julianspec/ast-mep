import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ParametroNDC } from 'src/app/_model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ExportPDFService } from 'src/app/_servicios';
import { DialogoConfirmacionComponent } from '../..';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'tabla-parametria-ndc',
  templateUrl: './parametria-ndc.component.html',
  styleUrls: ['.././tabla.component.css'],
  providers: [DatePipe]
})
export class ParametriaNDCComponent implements OnInit {

   _registros = [] as any[];
   displayedColumns: string[] = ['id','codigoMep','tipoCuenta','moneda','causa','movimiento','mismoBenefOrd','estado','usuarioAlta','fechaAlta','usuarioModificacion','fechaModificacion','actions'];

   dataSource: MatTableDataSource<ParametroNDC>;

   @Input() set registros(value: any[]) {
      this._registros = value;
      this.dataSource.data = this._registros;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
   }

   @Input() set displayColumns(value: string[]){
      this.displayedColumns = value;
   }

   @Output() itemDeleted = new EventEmitter<ParametroNDC>();
   @Output() itemEdit = new EventEmitter<ParametroNDC>();

   @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
   @ViewChild(MatSort, { static: true }) sort: MatSort;


   constructor(public dialog: MatDialog,
               private datePipe: DatePipe,
               private pdfService: ExportPDFService) {
      this.dataSource = new MatTableDataSource(this.registros);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
   }

   ngOnInit(): void {

   }

   Eliminar(param: ParametroNDC) {
      this.confirmar(param);
   }

   Editar(registro: ParametroNDC) {
      this.itemEdit.emit(registro);
   }

   applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
      }
   }

   confirmar(param: ParametroNDC): void {
      this.dialog
         .open(DialogoConfirmacionComponent, {
            data: `¿Esta seguro que desea eliminar la parametría ${param.id}?`
         })
         .afterClosed()
         .subscribe((confirmado: Boolean) => {
         if (confirmado) {
            this.itemDeleted.emit(param);
         } else {
            return;
         }
      });
   }

   generatePdf(){
      this.pdfService.generatePdf('open', this.getReporte(this._registros), 'Parametros');
   }

   getReporte(data: ParametroNDC[]) {
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
                    text: 'Tipo Cuenta',
                    style: 'tableHeader'
                  },
                  {
                    text: 'Moneda',
                    style: 'tableHeader'
                  },
                  {
                     text: 'Tipo Movimiento',
                     style: 'tableHeader'
                  },
                  {
                     text: 'Mismo Ordenante y Beneficiario',
                     style: 'tableHeader'
                  },
                  {
                    text: 'Causal',
                    style: 'tableHeader'
                  },
                  {
                    text: 'Usuario Alta',
                    style: 'tableHeader'
                  },
                  {
                    text: 'Fecha Alta',
                    style: 'tableHeader'
                  },
                  {
                    text: 'Usuario Modifica',
                    style: 'tableHeader'
                  },
                  {
                    text: 'Fecha Modifica',
                    style: 'tableHeader'
                  }
               ],
               ...data.map(ed => {
                 return [ed.codigoMEP.toUpperCase(), ed.tipoCuenta, ed.moneda, (ed.movimiento=='C'?'CREDITO':'DEBITO'), (ed.mismoOrdenanteBeneficiario?'SI':'NO'), ed.causa, ed.usuarioAlta, this.datePipe.transform(ed.fechaAlta, 'short'), ed.usuarioModificacion, this.datePipe.transform(ed.fechaModificacion, 'short')];
               }),

            ]
         }
      };
   }

}
