import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/internal/operators/first';
import { GlobalService } from '../_helpers/global.service';
import { Catalogo, InstruccionOperatoria, InstruccionPago, Saldo } from '../_model';
import { ReservaEfectivo } from '../_model/reservaEfectivo';
import { AlertService, CatalogoService, ReservaEfectivoService } from '../_servicios';

@Component({
  selector: 'app-form-reserva-efectivo',
  templateUrl: './form-reserva-efectivo.component.html',
  styleUrls: ['./form-reserva-efectivo.component.css']
})
export class FormReservaEfectivoComponent implements OnInit {
   userForm: FormGroup;
   nuevoRegistro = {} as ReservaEfectivo;
   loading = false;
   submitted = false;
   datos: any;
   crear: boolean;
   cuentas: Catalogo[];
   importe = {} as InstruccionOperatoria;
   selectCuenta = {} as Catalogo;
   cuenta = {} as Saldo;

   public titulo: string = "Alta de Reserva"

   constructor(private entorno: GlobalService,
               private router: Router,
               private formBuilder: FormBuilder,
               public activatedRoute: ActivatedRoute,
               private alertService: AlertService,
               private reservaService: ReservaEfectivoService,
               private catalogoService: CatalogoService) {

      this.catalogoService.getCatalogo('cuenta_banco').subscribe(
         (registro) =>{
            this.cuentas = registro;
         },
         error => {
            this.alertService.error("No se pdieron recuperar las cuentas del banco.");
            this.loading = false;
         }
      );

      this.importe.requerido = 1;
      this.importe.nombre = "Monto a Reservar";
      this.importe.valorMinimo = "0";
      this.importe.valorMaximo = Number.MAX_SAFE_INTEGER.toString();
   }

   getImporte(valor: InstruccionPago){
      this.nuevoRegistro.monto = +valor.valor;
   }

   ngOnInit(): void {
      this.userForm = this.formBuilder.group({
         cuenta: ['', Validators.required]
      });

      this.crear = true;
      this.datos = history.state;
      if(this.datos.usuario){
         this.nuevoRegistro = this.datos.usuario;
         this.crear = false;
      }else{
         //SI ES UN NUEVO REGISTRO INICIALIZO EL ROL
         this.nuevoRegistro = {} as ReservaEfectivo;
      }
   }

   cuentaFormControl = new FormControl('', [
      Validators.required
   ]);

   cambioCuenta(){
      this.nuevoRegistro.cuenta = this.selectCuenta.codigo;
      this.nuevoRegistro.monedaSimbolo = (this.selectCuenta.codigo=='198'?'80':'');
      //PARA PASAR EL PARAMETRO DE CUENTA ENTRE PANTALLAS
      this.cuenta.cuenta = this.selectCuenta.codigo
   }


   // PARA ACCEDER RAPIDAMENTE A LOS CONTROLES DEL FORMULARIO
   get f() { return this.userForm.controls; }

   Guardar(cuenta) {
      this.submitted = true;

      // stop here if form is invalid
      if (this.userForm.invalid) {
         return;
      }

      this.loading = true;
      this.nuevoRegistro.usuario = this.entorno.getUser().usuario;

      this.reservaService.Create(this.nuevoRegistro)
          .pipe(first())
          .subscribe(
               data => {
                  if(data){
                     this.LimpiarForma();
                     this.router.navigate(['/reserva'], {state: {cuenta}});
                  }else{
                     this.alertService.error('Error al crear la reserva de efectivo.');
                     this.loading = false;
                  }
               },
               error => {
                  this.alertService.error(error.mensaje);
                  this.loading = false;
               });
   }

   LimpiarForma() {
      this.nuevoRegistro = {} as ReservaEfectivo;
   }

}
