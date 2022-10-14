import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs/internal/operators/first';
import { CuentaBcra, Saldo } from 'src/app/_model';
import { CuentaBcraService, PosicionService } from 'src/app/_servicios';

@Component({
  selector: 'app-tabla-saldo-cuenta',
  templateUrl: './tabla-saldo-cuenta.component.html',
  styleUrls: ['.././tabla.component.css'],
  providers: [DatePipe]
})
export class TablaSaldoCuentaComponent implements OnInit {

   _registros = [] as Saldo[];
   cuentas: CuentaBcra[];
   displayedColumns: string[] = ['cuenta', 'descripcion', 'saldo', 'reservado', 'real', 'fecha', 'actions'];
   dataSource: MatTableDataSource<Saldo>;

   @Input() set displayColumns(value: string[]){
      this.displayedColumns = value;
   }

   @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
   @ViewChild(MatSort, { static: true }) sort: MatSort;

   constructor(private posicionService: PosicionService,
               private cuentaBcraService: CuentaBcraService)
   {
      this.cuentaBcraService.getCuentaEntidad("198")
      .pipe(first())
         .subscribe(
            (cuentas) => {
               this.cuentas = cuentas
               if(cuentas.length > 0){
                  this.cuentas.forEach(c => {
                     if(c.estado == "1"){
                        var saldo = {} as Saldo;
                        saldo.cuenta = c.codigoCuenta;
                        saldo.descripcion = c.descripcion;
                        saldo.entidad = c.codigoEntidad;
                        saldo.moneda = c.moneda;
                        saldo.simbolo = this.getSimbolo(c.moneda)
                        this._registros.push(saldo);
                     }
                  });

                  this.dataSource = new MatTableDataSource(this._registros);
                  this.dataSource.paginator = this.paginator;
                  this.dataSource.sort = this.sort;
               }
            },
            error => {
            }
      );
   }

   getSimbolo(moneda: string): string {
      var simbolo: string;
      switch(moneda) {
         case 'ARS': {
            simbolo = '$ ';
            break;
         }
         case 'USD': {
            simbolo ='u$s ';
            break;
         }
      }
      return simbolo;
   }

   ngOnInit(): void {

   }


   applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
      }
   }

   ConsultarSaldo(cuenta: Saldo){
      this.posicionService.getSaldo(cuenta.cuenta)
      .pipe(first())
         .subscribe(
            (saldo) => {

               cuenta.saldo = saldo.saldo;
               cuenta.saldoDisponibleReal = saldo.saldoDisponibleReal;
               cuenta.saldoReservado = saldo.saldoReservado;
               cuenta.horaConsulta = saldo.horaConsulta;

               this.UpdateItem(cuenta);

               this.dataSource = new MatTableDataSource(this._registros);
               this.dataSource.paginator = this.paginator;
               this.dataSource.sort = this.sort;
            },
            error => {
            }
      );
   }

   UpdateItem(newItem: Saldo){
      let updateItem = this._registros.find(this.findIndexToUpdate, newItem.cuenta);
      let index = this._registros.indexOf(updateItem);
      this._registros[index] = newItem;
   }

   findIndexToUpdate(newItem) {
      return newItem.cuenta === this;
   }

}
