import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReservaEfectivo } from 'src/app/_model/reservaEfectivo';
import { ExportPDFService } from 'src/app/_servicios';
import { DialogoConfirmacionComponent } from '../../dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-tabla-reserva-efectivo',
  templateUrl: './tabla-reserva-efectivo.component.html',
  styleUrls: ['.././tabla.component.css'],
  providers: [DatePipe]
})
export class TablaReservaEfectivoComponent implements OnInit {

   _registros = [] as ReservaEfectivo[];
   displayedColumns: string[] = ['id','cuenta', 'monto', 'usuario', 'actions'];
   dataSource: MatTableDataSource<ReservaEfectivo>;

   @Input() set registros(value: ReservaEfectivo[]) {
      this._registros = value;
      this.dataSource.data = this._registros;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
   }

   @Input() set displayColumns(value: string[]){
      this.displayedColumns = value;
   }

   @Output() itemDeleted = new EventEmitter<string>();

   @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
   @ViewChild(MatSort, { static: true }) sort: MatSort;

   constructor(private pdfService: ExportPDFService, public dialog: MatDialog) {
      this.dataSource = new MatTableDataSource(this.registros);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
   }

   ngOnInit(): void {

   }

   Eliminar(id: string) {
      this.confirmar(id);
   }

   confirmar(id: string): void {
      this.dialog
         .open(DialogoConfirmacionComponent, {
            data: `¿Esta seguro que desea levantar la reserva de efectivo?`
         })
         .afterClosed()
         .subscribe((confirmado: Boolean) => {
         if (confirmado) {
            this.itemDeleted.emit(id);
         } else {
            return;
         }
      });
   }

   applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
      }
   }


   generatePdf(){
      this.pdfService.generatePdf('open', this.getReporte(this._registros), 'Reserva de Efectivo');
   }

   getReporte(data: ReservaEfectivo[]) {
      return {
         style: 'tableBody',
         table: {
            widths: ['auto', '*', 'auto'],
            body: [
               [
                  {
                    text: 'Cuenta',
                    style: 'tableHeader'
                  },
                  {
                    text: 'Monto Reservado',
                    style: 'tableHeader'
                  },
                  {
                    text: 'Usuario Alta',
                    style: 'tableHeader'
                  },
               ],
               ...data.map(ed => {
                 return [ed.cuenta, ed.monto, ed.usuario];
               }),

            ]
         }
      };
   }
}
