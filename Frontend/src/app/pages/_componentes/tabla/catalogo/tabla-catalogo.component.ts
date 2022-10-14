import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Catalogo } from 'src/app/_model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-tabla-catalogo',
  templateUrl: './tabla-catalogo.component.html',
  styleUrls: ['.././tabla.component.css']
})
export class TablaCatalogoComponent implements OnInit {

   _registros = [] as Catalogo[];
   displayedColumns: string[] = ['id', 'codigo', 'valor', 'estado', 'actions'];
   dataSource: MatTableDataSource<Catalogo>;

   @Input() set registros(value: Catalogo[]) {
      this._registros = value;
      this.dataSource.data = this._registros;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
   }

   @Input() set displayColumns(value: string[]){
      this.displayedColumns = value;
   }

   @Output() itemDeleted = new EventEmitter<string>();
   @Output() itemEdit = new EventEmitter<Catalogo>();

   @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
   @ViewChild(MatSort, { static: true }) sort: MatSort;

   constructor() {
      this.dataSource = new MatTableDataSource(this.registros);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
   }

   ngOnInit(): void {

   }

   Eliminar(id: string) {
      this.itemDeleted.emit(id);
   }

   Editar(registro: Catalogo) {
      this.itemEdit.emit(registro);
   }

   applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
      }
   }
}
