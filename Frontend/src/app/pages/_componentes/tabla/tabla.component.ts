import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/_model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})

export class TablaComponent implements OnInit {

   _registros = [] as any[];
   displayedColumns: string[];
   dataSource: MatTableDataSource<Usuario>;

   @Input() set registros(value: any[]) {
      this._registros = value;
      this.dataSource.data = this._registros;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
   }

   @Input() set columnDef(value: string[]){
      this.displayedColumns = value;
   }

   @Input() set displayColumns(value: string[]){
      this.displayedColumns = value;
   }

   @Output() itemDeleted = new EventEmitter<string>();
   @Output() itemEdit = new EventEmitter<Usuario>();

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

   Editar(registro: Usuario) {
      this.itemEdit.emit(registro);
   }

   applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
      }
   }

}
