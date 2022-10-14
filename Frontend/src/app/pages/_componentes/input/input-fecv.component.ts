import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InstruccionOperatoria, InstruccionPago } from 'src/app/_model';
import { Validators, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'input-fecv',
  templateUrl: './input-fecv.component.html'
})
export class InputFecvComponent implements OnInit {

   importeValidation: FormGroup;
   requerido = false;
   instruccion: InstruccionOperatoria;
   fecv = new FormControl('', []);
   minDate: Date;
   maxDate: Date;

   @Input() set formato(value: InstruccionOperatoria) {
      this.instruccion = value;
   }

   @Output() selectedValue = new EventEmitter<InstruccionPago>();


   EnviarValor(registro: string) {
      var salida = {} as InstruccionPago;
      salida.clave = this.instruccion.tag;
      salida.nombre = this.instruccion.nombre;
      if(String(registro).length >0){
         var fecha = new Date(registro);
         salida.valor = fecha.getFullYear().toString()+(fecha.getMonth()+1).toString().padStart(2, '0')+fecha.getDate().toString().padStart(2, '0');
      }else{
         salida.valor = registro;
      }

      salida.error = ((registro=="" || registro == null) && this.instruccion.requerido == 1)?true:!this.fecv.valid;
      this.selectedValue.emit(salida);
   }

   constructor() { }

   ngOnInit(): void {

      if(+this.instruccion.valorMinimo < 0){
         this.minDate = this.addDays(new Date(Date.now()), +this.instruccion.valorMinimo);
      }

      if(+this.instruccion.valorMaximo > 0){
         this.maxDate = this.addDays(new Date(Date.now()), +this.instruccion.valorMaximo);
      }

      var validator= [] as any[];

      validator.push(Validators.maxLength(this.instruccion.longitudMaxima));
      validator.push(Validators.minLength(this.instruccion.longitudMinima));
      if(this.instruccion.requerido == 1){
         validator.push(Validators.required);
         this.requerido = true;
      }

      this.fecv.setValidators(validator);
      if(this.instruccion.requerido == 1){this.EnviarValor("");}
   }

   addDays(date: Date, days: number): Date {
      date.setDate(date.getDate() + days);
      return date;
   }

}
