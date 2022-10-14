import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { InstruccionOperatoria, InstruccionPago } from 'src/app/_model';
import { FormControl, FormBuilder, Validators, NG_VALUE_ACCESSOR } from '@angular/forms';
import tagsValor from 'src/assets/json/tagvalor.json';

@Component({
  selector: 'input-cuit',
  templateUrl: './input-cuit.component.html',
  providers: [
   {
     provide: NG_VALUE_ACCESSOR,
     useExisting: forwardRef(() => InputCuitComponent),
     multi: true
   }
  ]
})
export class InputCuitComponent implements OnInit {

   tagValor: any = tagsValor;
   operatoria: string;
   instruccion: InstruccionOperatoria;
   cuit = new FormControl('', []);
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
      this.valor = value;
      if(this.valor != null ){
         if(this.valor.length > 0){
            this.EnviarValor()
         }
      }
   }

   @Output() selectedValue = new EventEmitter<InstruccionPago>();

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
      if(this.instruccion == null){return}
      var salida = {} as InstruccionPago;
      salida.clave = this.instruccion.tag;
      salida.nombre = this.instruccion.nombre;
      salida.valor = this.valor;
      salida.error = ((this.valor =="" || this.valor == null) && this.instruccion.requerido == 1)?true:!this.cuit.valid;
      this.selectedValue.emit(salida);
   }

   constructor(private fb: FormBuilder) {

   }

   ngOnInit(): void {
      var validator= [] as any[];

      validator.push(cuitValidator);
      validator.push(Validators.maxLength(this.instruccion.longitudMaxima));
      validator.push(Validators.minLength(this.instruccion.longitudMinima));
      if(this.instruccion.requerido == 1){
         validator.push(Validators.required);
         this.requerido = true;
      }

      this.cuit.setValidators(validator);
      if(this.instruccion.requerido == 1){
         this.EnviarValor();
      }

   }

}

function validarCuit(cuit: any): boolean {

   cuit = cuit.replace(/[^0-9]/g, ''); // only numbers

   if(cuit.length != 11) {
      return true;
   }

   var acumulado = 0;
   var digitos = cuit.split("");
   var digito = digitos.pop();

   for(var i = 0; i < digitos.length; i++) {
      acumulado += digitos[9 - i] * (2 + (i % 6));
   }

   var verif = 11 - (acumulado % 11);

   if(verif == 11) {
      verif = 0;
   }

   return digito == verif;
}

function cuitValidator(c: FormControl){

   return validarCuit(c.value) ? null : {
      cuitValidator: {
         valid: false
       }
   };
}
