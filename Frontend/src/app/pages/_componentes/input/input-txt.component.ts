import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { InstruccionOperatoria, InstruccionPago } from 'src/app/_model';
import { FormGroup, FormBuilder, Validators, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import tagsValor from 'src/assets/json/tagvalor.json';

@Component({
  selector: 'input-text',
  templateUrl: './input-txt.component.html',
  providers: [
   {
     provide: NG_VALUE_ACCESSOR,
     useExisting: forwardRef(() => InputTxtComponent),
     multi: true
   }
  ]
})


export class InputTxtComponent implements OnInit {

   tagValor: any = tagsValor;
   operatoria: string;
   instruccion: InstruccionOperatoria;
   txt = new FormControl('', []);
   valor = "" as string;
   ingreso = "" as string;
   isDisabled: boolean;
   requerido = false;
   onChange = (_:any) => { }
   onTouch = () => { }

   @Output() selectedValue = new EventEmitter<InstruccionPago>();

   @Input() set formato(value: InstruccionOperatoria) {
      this.instruccion = value;
      this.setValidator();
      this.EnviarValor();
   }

   @Input() set codigoOperatoria(value: string) {
      this.operatoria = value;
   }

   @Input() set inputValor(value: string){
      this.valor = value;
      if(this.valor != null ){
         if(this.valor.length > 0){
            this.EnviarValor()
         }
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

   constructor(private fb: FormBuilder) {
   }

   EnviarValor() {
      var salida = {} as InstruccionPago;
      salida.clave = this.instruccion.tag;
      salida.valor = this.valor;
      salida.nombre = this.instruccion.nombre;
      salida.error = ((this.valor=="" || this.valor==null) && this.instruccion.requerido == 1)?true:!this.txt.valid;
      this.selectedValue.emit(salida);
   }

   ngOnInit(): void {

      this.setValidator();
      if(this.instruccion.requerido == 1){this.EnviarValor();}
      //LOGICA PARA CARGAR EL DATO
      /*
      this.tagValor.forEach(element => {
         if(element.operatoria == this.operatoria){
            if (element.tags.includes(this.instruccion.tag)){
               this.valor = this.ingreso;
               this.EnviarValor();
            }
         }
      });
      */
   }

   setValidator(){
      var validator= [] as any[];

      if(this.instruccion.longitudMaxima != undefined){
         validator.push(Validators.maxLength(this.instruccion.longitudMaxima));
      }
      if(this.instruccion.longitudMinima != null){
         validator.push(Validators.minLength(this.instruccion.longitudMinima));
      }
      if(this.instruccion.requerido == 1){
         validator.push(Validators.required);
         this.requerido = true;
      }

      this.txt.setValidators(validator);

   }
}
