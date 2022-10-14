import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Catalogo, CuentaBcra } from '../_model';
import { ReservaEfectivo } from '../_model/reservaEfectivo';
import { AlertService, CatalogoService, ReservaEfectivoService } from '../_servicios';

@Component({
  selector: 'app-reserva-efectivo',
  templateUrl: './reserva-efectivo.component.html',
  styleUrls: ['./reserva-efectivo.component.css']
})
export class ReservaEfectivoComponent implements OnInit {

   registros = [] as ReservaEfectivo[];
   reservaForm: FormGroup;
   loading = false;
   displayedColumns: string[] = ['cuenta', 'monto', 'usuario', 'actions'];
   cuentas = [] as Catalogo[];
   selectCuenta = {} as Catalogo;
   datos: any;
   vacio: boolean = true;

   constructor(private efectivoService: ReservaEfectivoService,
               private alertService: AlertService,
               private formBuilder: FormBuilder,
               private catalogoService: CatalogoService) { }

   ngOnInit(): void {

      this.reservaForm = this.formBuilder.group({
         cuentaSeleccion:  ['']
      });

      this.loading = true;
      this.catalogoService.getCatalogo('cuenta_banco').subscribe(
         (registro) =>{
            this.cuentas = registro;

            this.datos = history.state;

            if(this.datos.cuenta == null) {
               this.loading = false;
               return;
            }

            if(this.datos.cuenta.cuenta.length > 0){
               this.cuentas.forEach(e => {
                  if(e.codigo == this.datos.cuenta.cuenta){
                     this.selectCuenta = e;
                  }
               });
            }

            if(this.selectCuenta != null){
               this.buscarRegistros();
            }

            this.loading = false;

         },
         error => {
            this.alertService.error("No se pdieron recuperar las cuentas del banco.");
            this.loading = false;
         }
      );
   }

   buscarRegistros() {

      var c = [] as Catalogo[];

      if(this.selectCuenta.codigo == null){
         this.vacio = true;
         this.registros = [];
         return;
      }else{
         c.push
      }

      this.vacio = false;
      this.loading = true;
      this.efectivoService.getReservas(this.selectCuenta.codigo).subscribe(
         (reservas) => {
            this.registros = reservas;
            this.loading = false;
         },
         error => {
            this.alertService.error(error.mensaje);
            this.loading = false;
         }
      );
   }

   Eliminar(id: string) {
      this.loading = true;
      this.efectivoService.Delete(id).subscribe(
         () =>{
            this.loading = false;
            this.buscarRegistros();
         });
   }

}
