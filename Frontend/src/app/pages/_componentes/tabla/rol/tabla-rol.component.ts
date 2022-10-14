import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Rol } from 'src/app/_model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-tabla-rol',
  templateUrl: './tabla-rol.component.html',
  styleUrls: ['.././tabla.component.css']
})
export class TablaRolComponent implements OnInit {
   _registros = [] as Rol[];
   displayedColumns: string[] = ['id', 'descripcion', 'actions'];
   dataSource: MatTableDataSource<Rol>;

   @Input() set registros(value: Rol[]) {
      this._registros = value;
      this.dataSource.data = this._registros;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
   }

   @Input() set displayColumns(value: string[]){
      this.displayedColumns = value;
   }

   @Output() itemDetail = new EventEmitter<string>();
   @Output() itemEdit = new EventEmitter<Rol>();

   @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
   @ViewChild(MatSort, { static: true }) sort: MatSort;

   constructor() {
      this.dataSource = new MatTableDataSource(this.registros);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
   }

   ngOnInit(): void {

   }

   Detalle(id: string) {
      this.itemDetail.emit(id);
   }

   Editar(registro: Rol) {
      this.itemEdit.emit(registro);
   }

   applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
      }
   }

}
