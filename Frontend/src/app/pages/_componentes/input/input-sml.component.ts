import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InstruccionOperatoria } from 'src/app/_model/instruccionOperatoria';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { InstruccionPago } from 'src/app/_model';

@Component({
  selector: 'input-sml',
  templateUrl: './input-sml.component.html'
})
export class InputSmlComponent implements OnInit {

   instruccion: InstruccionOperatoria;
   requerido = false;
   sml = new FormControl('', []);

   @Input() set formato(value: InstruccionOperatoria) {
      this.instruccion = value;
   }

   @Output() selectedValue = new EventEmitter<InstruccionPago>();


   EnviarValor(registro: string) {
      var salida = {} as InstruccionPago;
      salida.clave = this.instruccion.tag;
      salida.valor = registro;
      salida.nombre = this.instruccion.nombre;
      salida.error = ((registro=="" || registro == null) && this.instruccion.requerido == 1)?true:!this.sml.valid;
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

      this.sml.setValidators(validator);

      if(this.instruccion.requerido == 1){this.EnviarValor("");}
   }



}
