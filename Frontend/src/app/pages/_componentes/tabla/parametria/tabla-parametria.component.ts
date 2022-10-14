import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Parametro } from 'src/app/_model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from '../../dialogo-confirmacion/dialogo-confirmacion.component';
import { ExportPDFService } from 'src/app/_servicios';

@Component({
  selector: 'app-tabla-parametria',
  templateUrl: './tabla-parametria.component.html',
  styleUrls: ['.././tabla.component.css']
})
export class TablaParametriaComponent implements OnInit {

   _registros = [] as any[];
   displayedColumns: string[] = ['nemonico', 'descripcion', 'tipo', 'valor', 'actions'];
   dataSource: MatTableDataSource<Parametro>;

   @Input() set registros(value: any[]) {
      this._registros = value;
      this.dataSource.data = this._registros;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
   }

   @Input() set displayColumns(value: string[]){
      this.displayedColumns = value;
   }

   @Output() itemDeleted = new EventEmitter<Parametro>();
   @Output() itemEdit = new EventEmitter<Parametro>();

   @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
   @ViewChild(MatSort, { static: true }) sort: MatSort;


   constructor(public dialog: MatDialog,
               private pdfService: ExportPDFService) {
      this.dataSource = new MatTableDataSource(this.registros);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
   }

   ngOnInit(): void {

   }

   Eliminar(param: Parametro) {
      this.confirmar(param);
   }

   Editar(registro: Parametro) {
      this.itemEdit.emit(registro);
   }

   applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
      }
   }

   confirmar(param: Parametro): void {
      this.dialog
         .open(DialogoConfirmacionComponent, {
            data: `¿Esta seguro que desea eliminar el parametro ${param.nemonico}?`
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

   getReporte(data: Parametro[]) {
      return {
         style: 'tableBody',
         table: {
            widths: ['auto', '*', 'auto', 'auto'],
            body: [
               [
                  {
                    text: 'Nemónico',
                    style: 'tableHeader'
                  },
                  {
                    text: 'Descripción',
                    style: 'tableHeader'
                  },
                  {
                    text: 'Tipo',
                    style: 'tableHeader'
                  },
                  {
                    text: 'Valor',
                    style: 'tableHeader'
                  }
               ],
               ...data.map(ed => {
                 return [ed.nemonico, ed.descripcion.toUpperCase(), ed.tipo, ed.valor];
               }),

            ]
         }
      };
   }

}
