import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InstruccionOperatoria, InstruccionPago } from 'src/app/_model';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'input-num',
  templateUrl: './input-num.component.html'
})
export class InputNumComponent implements OnInit {

   instruccion: InstruccionOperatoria;
   num = new FormControl('', []);
   valor: number;
   requerido = false;


   @Input() set formato(value: InstruccionOperatoria) {
      this.instruccion = value;
   }

   @Input() set inputValor(value: number){
      this.valor = value;
   }

   @Output() selectedValue = new EventEmitter<InstruccionPago>();

   EnviarValor(registro: string) {
      var salida = {} as InstruccionPago;
      salida.clave = this.instruccion.tag;
      salida.valor = registro;
      salida.nombre = this.instruccion.nombre;
      salida.error = ((registro=="" || registro == null) && this.instruccion.requerido == 1)?true:!this.num.valid;
      this.selectedValue.emit(salida);
   }

   constructor(private fb: FormBuilder) {
   }

   ngOnInit(): void {
      var validator= [] as any[];

      validator.push(Validators.maxLength(this.instruccion.longitudMaxima));
      validator.push(Validators.minLength(this.instruccion.longitudMinima));
      if(this.instruccion.requerido == 1){
         validator.push(Validators.required);
         this.requerido = true;
      }

      this.num.setValidators(validator);
      if(this.instruccion.requerido == 1){this.EnviarValor("");}
   }

}
