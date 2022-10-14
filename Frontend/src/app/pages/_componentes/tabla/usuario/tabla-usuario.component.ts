import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/_model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ExportPDFService } from 'src/app/_servicios';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tabla-usuario',
  templateUrl: './tabla-usuario.component.html',
  styleUrls: ['.././tabla.component.css'],
  providers: [DatePipe]
})
export class TablausuarioComponent implements OnInit {

   _registros = [] as Usuario[];
   displayedColumns: string[] = ['login', 'nombre', 'estado', 'fechaCreacion', 'usuarioModificacion', 'rol', 'actions'];
   dataSource: MatTableDataSource<Usuario>;

   @Input() set registros(value: Usuario[]) {
      this._registros = value;
      this.dataSource.data = this._registros;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
   }

   @Input() set displayColumns(value: string[]){
      this.displayedColumns = value;
   }

   @Output() itemDeleted = new EventEmitter<string>();
   @Output() itemEdit = new EventEmitter<Usuario>();

   @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
   @ViewChild(MatSort, { static: true }) sort: MatSort;

   constructor(private pdfService: ExportPDFService, private datePipe: DatePipe) {
      this.dataSource = new MatTableDataSource(this.registros);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
   }

   ngOnInit(): void {

   }

   Eliminar(id: string) {
      this.itemDeleted.emit(id);
   }

   Editar(registro: Usuario) {
      this.itemEdit.emit(registro);
   }

   applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
      }
   }


   generatePdf(){
      this.pdfService.generatePdf('open', this.getReporte(this._registros), 'Usuarios');
   }

   getReporte(data: Usuario[]) {
      return {
         style: 'tableBody',
         table: {
            widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto'],
            body: [
               [
                  {
                    text: 'Login',
                    style: 'tableHeader'
                  },
                  {
                    text: 'Nombre',
                    style: 'tableHeader'
                  },
                  {
                    text: 'Estado',
                    style: 'tableHeader'
                  },
                  {
                    text: 'Fecha Modificación',
                    style: 'tableHeader'
                  },
                  {
                     text: 'Usuario Modificación',
                     style: 'tableHeader'
                   },
                  {
                    text: 'Rol',
                    style: 'tableHeader'
                  },
               ],
               ...data.map(ed => {
                 return [ed.login, ed.nombre.toUpperCase(), ed.estado, this.datePipe.transform(ed.fechaCreacion, 'short'), ed.usuarioModificacion, ed.rol!=null?ed.rol.id + ' - ' + ed.rol.descripcion.toUpperCase():'-'];
               }),

            ]
         }
      };
   }
}
