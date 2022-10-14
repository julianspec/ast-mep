import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { InstruccionOperatoria, InstruccionPago } from 'src/app/_model';
import { FormControl, FormBuilder, Validators, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CobisService } from 'src/app/_servicios';
import { CbuValidator } from 'src/app/_helpers/cbu-validator';
import tagsValor from 'src/assets/json/tagvalor.json';

@Component({
  selector: 'input-cbu',
  templateUrl: './input-cbu.component.html',
  providers: [
   {
     provide: NG_VALUE_ACCESSOR,
     useExisting: forwardRef(() => InputCbuComponent),
     multi: true
   }
  ]
})

export class InputCbuComponent implements OnInit  {

   tagValor: any = tagsValor;
   instruccion: InstruccionOperatoria;
   operatoria: string;
   moneda: string;
   cbu = new FormControl('', {validators: [], asyncValidators:[], updateOn:'change'} );
   valor = "" as string;
   ingreso = "" as string;
   isDisabled: boolean;
   requerido = false;
   onChange = (_:any) => { }
   onTouch = () => { }

   @Input() set codigoOperatoria(value: string) {
      this.operatoria = value;
   }

   @Input() set formato(value: InstruccionOperatoria) {
      this.instruccion = value;
   }

   @Input() set inputValor(value: string){
      this.ingreso = value;
   }

   @Input() set monedaOperacion(value: string){
      this.moneda = value;
   }

   @Output() selectedValue = new EventEmitter<InstruccionPago>();

   @Output() tieneErrores = new EventEmitter<boolean>();

   registerOnChange(fn: any): void {
      this.onChange = fn;
   }

   registerOnTouched(fn: any): void {
      this.onTouch = fn;
   }

   setDisabledState?(isDisabled: boolean): void {
      this.isDisabled = isDisabled;
   }

   EnviarValor() {

      var error = false;
      if(this.instruccion.requerido == 1){
         if (this.valor=="" || this.valor == null){
            error = true;
         }else{
            error = false; //!this.cbu.valid;
         }
      }else{
         if (this.valor != null){
            if(this.valor.length > 0){
               error = false; //!this.cbu.valid;
            }
         }
      }


      var salida = {} as InstruccionPago;
      salida.clave = this.instruccion.tag;
      salida.nombre = this.instruccion.nombre;
      salida.valor = this.valor;
      salida.error = error; //((this.valor=="" || this.valor == null) && this.instruccion.requerido == 1)?true:!this.cbu.valid;
      this.selectedValue.emit(salida);
   }

   constructor(private fb: FormBuilder,
               private cobis: CobisService) {

   }

   ngOnInit(): void {

      var validator= [] as any[];
      if(this.instruccion.longitudMaxima != null){
         validator.push(Validators.maxLength(this.instruccion.longitudMaxima));
      }
      if(this.instruccion.longitudMinima != null){
         validator.push(Validators.minLength(this.instruccion.longitudMinima));
      }
      if(this.instruccion.requerido == 1){
         validator.push(Validators.required);
         this.requerido = true;
      }

      this.cbu.setValidators(validator);
      this.cbu.setAsyncValidators(CbuValidator.createValidator(this.cobis, this.moneda));

      if(this.instruccion.requerido == 1){this.EnviarValor();}

      //LOGICA PARA CARGAR EL DATO
      this.tagValor.forEach(element => {
         if(element.operatoria == this.operatoria){
            if (element.tags.includes(this.instruccion.tag)){
               this.valor = this.ingreso;
               if(this.valor.length > 0){
                  this.cbu.markAsTouched();
               }
               this.EnviarValor();
            }
         }
      });

   }

}
