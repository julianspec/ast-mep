import { Component, OnInit, Output, EventEmitter, Input, forwardRef } from '@angular/core';
import { InstruccionOperatoria, InstruccionPago } from 'src/app/_model';
import { FormControl, FormBuilder, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'input-importe',
  templateUrl: './input-importe.component.html',
  providers: [
   {
     provide: NG_VALUE_ACCESSOR,
     useExisting: forwardRef(() => InputImporteComponent),
     multi: true
   }
  ]
})
export class InputImporteComponent implements OnInit, ControlValueAccessor {

   importe: number;
   instruccion: InstruccionOperatoria;
   txt = new FormControl('', []);
   monedaImporte: string;
   isDisabled: boolean;
   requerido = false;
   onChange = (_:any) => { }
   onTouch = () => { }
   min: number;
   max: number;

   @Output() getImporte = new EventEmitter<InstruccionPago>();

   @Input() set valorMaximo(value: number){
      this.instruccion.valorMaximo = value.toString();
      this.cargarValidators();
   }

   @Input() set formato(value: InstruccionOperatoria) {
      this.instruccion = value;
      this.cargarValidators();
   }

   @Input() set moneda(value:string){
      this.monedaImporte = value;
   }

   constructor(private fb: FormBuilder) {
   }

   writeValue(value: any): void {
      if (value) {
         this.importe = value || 0;
       } else {
         this.importe = 0;
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

   EnviarValor(registro: number) {
      var salida = {} as InstruccionPago;
      salida.clave = this.instruccion.tag;
      salida.nombre = this.instruccion.nombre;
      salida.valor = ('' + registro).replace('$', '').replace('u$s', '').replace(',', '');
      salida.error = (registro==null)?true:!this.txt.valid;
      this.onTouch();
      this.onChange(salida);

      this.getImporte.emit(salida);

   }

   public select( event ) { event.target.select(); }

   ngOnInit(): void {
      this.cargarValidators();
      if(this.instruccion.requerido == 1){this.EnviarValor({} as number);}
   }

   cargarValidators(){

      var validator= [] as any[];

      validator.push(Validators.maxLength(this.instruccion.longitudMaxima));
      validator.push(Validators.minLength(this.instruccion.longitudMinima));
      validator.push(Validators.min(parseInt(this.instruccion.valorMinimo)));
      validator.push(Validators.max(parseInt(this.instruccion.valorMaximo)));
      if(this.instruccion.requerido == 1){
         validator.push(Validators.required);
         this.requerido = true;
      }

      this.txt.setValidators(validator);

      this.min = parseInt(this.instruccion.valorMinimo);
      this.max = parseInt(this.instruccion.valorMaximo)

   }
}
