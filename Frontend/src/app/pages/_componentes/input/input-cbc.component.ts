import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { InstruccionOperatoria, InstruccionPago } from 'src/app/_model';
import { FormControl, FormBuilder, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'input-cbc',
  templateUrl: './input-cbc.component.html',
  providers: [
   {
     provide: NG_VALUE_ACCESSOR,
     useExisting: forwardRef(() => InputCbcComponent),
     multi: true
   }
  ]
})
export class InputCbcComponent implements OnInit, ControlValueAccessor {

   instruccion: InstruccionOperatoria;
   valor= "" as string;
   isDisabled: boolean;
   onChange = (_:any) => { }
   onTouch = () => { }
   cbc = new FormControl('', []);
   required = false;


   @Input() set formato(value: InstruccionOperatoria) {
      this.instruccion = value;
   }

   @Input() set inputValor(value: string){
      this.valor = value;
   }

   @Output() selectedValue = new EventEmitter<InstruccionPago>();

   writeValue(value: any): void {
      if (value) {
         this.valor = value || "";
       } else {
         this.valor = "";
       }
   }

   registerOnChange(fn: any): void {
      this.onChange = fn;
   }

   registerOnTouched(fn: any): void {
      this.onTouch = fn;
   }

   setDisabledState?(isDisabled: boolean): void {
      this.isDisabled = isDisabled;
   }

   EnviarValor(registro: string) {
      var salida = {} as InstruccionPago;
      salida.clave = this.instruccion.tag;
      salida.nombre = this.instruccion.nombre;
      salida.valor = registro;
      salida.error = ((this.valor=="" || this.valor == null) && this.instruccion.requerido == 1)?true:!this.cbc.valid;
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
         this.required = true;
      }

      this.cbc.setValidators(validator);
      if(this.instruccion.requerido == 1){this.EnviarValor("");}
   }

}
