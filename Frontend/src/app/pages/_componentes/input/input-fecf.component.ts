import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InstruccionOperatoria, InstruccionPago } from 'src/app/_model';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'input-fecf',
  templateUrl: './input-fecf.component.html'
})
export class InputFecfComponent implements OnInit {

   instruccion: InstruccionOperatoria;
   requerido = false;
   fecf = new FormControl('', []);

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
      salida.error = ((registro=="" || registro == null) && this.instruccion.requerido == 1)?true:!this.fecf.valid;
      this.selectedValue.emit(salida);
   }

   constructor() { }

   ngOnInit(): void {

      var validator= [] as any[];

      validator.push(Validators.maxLength(this.instruccion.longitudMaxima));
      validator.push(Validators.minLength(this.instruccion.longitudMinima));
      if(this.instruccion.requerido == 1){
         validator.push(Validators.required);
         this.requerido = true;
      }

      this.fecf.setValidators(validator);
      if(this.instruccion.requerido == 1){this.EnviarValor("");}
   }

}
