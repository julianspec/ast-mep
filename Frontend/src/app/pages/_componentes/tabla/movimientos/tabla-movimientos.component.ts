import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ConsultaMovimiento, InstruccionPago, Movimiento } from 'src/app/_model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-tabla-movimientos',
  templateUrl: './tabla-movimientos.component.html',
  styleUrls: ['.././tabla.component.css']
})
export class TablaMovimientosComponent implements OnInit {

   _registros = [] as any[];
   displayedColumns: string[] = ['actions','operatoria', 'transaccion', 'entidadDeudora', 'cuentaDeudora', 'entidadAcreedora', 'cuentaAcreedora', 'importe', 'instruccionDePago', 'fechaProcesado'];
   dataSource: MatTableDataSource<Movimiento>;
   cuenta: ConsultaMovimiento;

   @Input() set registros(value: any[]) {
      this._registros = value;
      this.dataSource.data = this._registros;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
   }

   @Input() set displayColumns(value: string[]){
      this.displayedColumns = value;
   }

   @Input() set cuentaRegistro(value: ConsultaMovimiento){
      this.cuenta = value;
   }

   @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
   @ViewChild(MatSort, { static: true }) sort: MatSort;

   @Output() itemDetail = new EventEmitter<any>();

   constructor() {
      this.dataSource = new MatTableDataSource(this.registros);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
   }

   ngOnInit(): void {

   }

   applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
      }
   }

   VerDetalle(instruccionDePago: string, operatoria: string){
      this.itemDetail.emit({instruccion: instruccionDePago, codigo: operatoria});
   }


}
