import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import { Permiso } from 'src/app/_model/permiso';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ExportPDFService } from 'src/app/_servicios';

@Component({
   selector: 'app-tabla-permiso',
   templateUrl: './tabla-permiso.component.html',
   styleUrls: ['.././tabla.component.css']
})
export class TablaPermisoComponent implements OnInit {

   _registros = [] as Permiso[];
   _rol = "" as String;
   displayedColumns: string[] = ['id', 'descripcion', 'habilitado'];
   dataSource: MatTableDataSource<Permiso>;
   edit = true as boolean;

   @Input() set rol(value: String) {
      this._rol = value;
   }

   @Input() set registros(value: Permiso[]) {
      this._registros = value;
      this.dataSource.data = this._registros;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
   }

   @Input() set displayColumns(value: string[]) {
      this.displayedColumns = value;
   }

   @Input() set editable(value: boolean) {
      this.edit = value;
   }

   @Output() itemDetail = new EventEmitter<string>();
   @Output() itemEdit = new EventEmitter<Permiso>();
   @Output() itemDeleted = new EventEmitter<Permiso>();


   @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
   @ViewChild(MatSort, { static: true }) sort: MatSort;

   constructor(private pdfService: ExportPDFService) {
      this.dataSource = new MatTableDataSource(this.registros);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
   }

   ngOnInit(): void {

   }

   Detalle(id: string) {
      this.itemDetail.emit(id);
   }

   Editar(registro: Permiso) {
      this.itemEdit.emit(registro);
   }

   Eliminar(param: Permiso) {
      this.itemDeleted.emit(param);
   }

   Habilitar(param: Permiso) {
      if (param.habilitado) {
         //ESTA ACTIVO LO ELIMINO
         this.Eliminar(param)
      } else {
         //ESTA INACTIVO LO ASOCIO
         this.Editar(param)
      }
      param.habilitado = !param.habilitado;
   }

   applyFilter(filterValue: string) {

      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
         this.dataSource.paginator.firstPage();
      }
   }

   generatePdf() {
      this.pdfService.generatePdf('open', this.getReporte(this._registros), 'Permisos', 'Permisos asociados al Rol: ' + this._rol);
   }

   getReporte(data: Permiso[]) {
      return {
         style: 'tableBody',
         table: {
            widths: ['auto', '*', 'auto'],
            body: [
               [
                  {
                     text: 'Id',
                     style: 'tableHeader'
                  },
                  {
                     text: 'Permiso',
                     style: 'tableHeader'
                  },
                  {
                     text: 'Habilitado',
                     style: 'tableHeader'
                  }
               ],
               ...data.map(ed => {
                  return [ed.id, ed.descripcion.toUpperCase(), (ed.habilitado ? 'SI' : 'NO')];
               }),

            ]
         }
      };
   }
}
