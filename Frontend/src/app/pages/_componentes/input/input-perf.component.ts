import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
import { InstruccionOperatoria, InstruccionPago } from 'src/app/_model';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
   selector: 'input-perf',
   templateUrl: './input-perf.component.html',
   providers: [
      {
         provide: DateAdapter,
         useClass: MomentDateAdapter,
         deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
      },
      {
         provide: MAT_DATE_FORMATS,
         useValue: MY_FORMATS
      },
   ],
})
export class InputPerfComponent implements OnInit {

   date = new FormControl(moment());
   instruccion: InstruccionOperatoria;
   perf = new FormControl('', []);
   requerido = false;

   @Input() set formato(value: InstruccionOperatoria) {
      this.instruccion = value;
   }

   @Output() selectedValue = new EventEmitter<InstruccionPago>();

   EnviarValor(registro: string) {
      var salida = {} as InstruccionPago;
      salida.clave = this.instruccion.tag;
      if(String(registro).length >0){
         var fecha = new Date(registro);
         salida.valor = fecha.getFullYear().toString()+(fecha.getMonth()+1).toString().padStart(2, '0');
      }else{
         salida.valor = registro;
      }
      salida.nombre = this.instruccion.nombre;
      salida.error = ((registro=="" || registro == null) && this.instruccion.requerido == 1)?true:!this.perf.valid;
      this.selectedValue.emit(salida);
   }

   chosenYearHandler(normalizedYear: Moment) {
      const ctrlValue = this.date.value;
      ctrlValue.year(normalizedYear.year());
      this.date.setValue(ctrlValue);
   }

   chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
      const ctrlValue = this.date.value;
      ctrlValue.month(normalizedMonth.month());
      this.date.setValue(ctrlValue);
      datepicker.close();
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

      this.perf.setValidators(validator);
      if(this.instruccion.requerido == 1){this.EnviarValor("");}
   }

}
