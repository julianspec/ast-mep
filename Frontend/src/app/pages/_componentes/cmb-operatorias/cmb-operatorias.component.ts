import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Catalogo, Operatoria } from 'src/app/_model';
import { OperatoriaBcraService } from 'src/app/_servicios';

@Component({
  selector: 'cmb-operatorias',
  templateUrl: './cmb-operatorias.component.html',
  styleUrls: ['./cmb-operatorias.component.css'],
  providers: [
   {
     provide: NG_VALUE_ACCESSOR,
     useExisting: forwardRef(() => CmbOperatoriasComponent),
     multi: true
   }
 ]
})
export class CmbOperatoriasComponent implements OnInit {
   _datos = [] as Operatoria[];
   empty = {} as Operatoria;
   vacio = false as boolean;
   label = "" as string;
   filteredList1 = this._datos.slice();
   value = {} as Operatoria;
   isDisabled: boolean;
   onChange = (_:any) => { }
   onTouch = () => { }
   required = false;
   catalogo =new FormControl('', {validators: [], asyncValidators:[], updateOn:'change'} );
   loading = false as boolean;
   operatorias = [] as Catalogo[];

   @Input() set permiteVacio(value: boolean){
      this.vacio = value;
   }

   @Input() set filtro(value: Catalogo[]){
      this.operatorias = value;
      this.getOperatorias();
   }

   @Input() set inputValue(value: string){
      this.value.codigo = value;
   }

   @Input() set requerido(value: boolean){
      this.required = value;
   }

   @Input() set labelInput(value:string){
      this.label = value;
   }

   @Output() selectedValue = new EventEmitter<Operatoria>();

   constructor(private operatoriaService: OperatoriaBcraService) {
   }

   writeValue(value: any): void {
      if (value) {
         this.value = value || '';
       } else {
         this.value = null;
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


   ItemElegido(registro: Operatoria) {

      var salida = {} as Operatoria;

      if(registro != undefined){
         salida.codigo = registro.codigo;
         salida.descripcion = registro.descripcion;

      }else{
         salida = registro;
      }

      //this.value = salida;
      this.onTouch();
      this.onChange(salida);
      this.catalogo.markAsTouched();
      this.selectedValue.emit(salida);

   }

   getOperatorias(){
      this.loading = true;
      this.operatoriaService.getListOperatoria().subscribe(
         (salida) => {
            this._datos = [];
            if(this.operatorias.length > 0){

               salida.forEach(i=>{
                  if(this.operatorias.find(filtro => filtro.codigo == i.codigo)){

                     this._datos.push(i);
                  }
               });

            }else{
               this._datos = salida;
            }

            this.filteredList1 = this._datos.slice();
            if(this.value != null){
               if(this._datos != null){
                  this._datos.forEach(element => {
                     if(element.codigo == this.value.codigo){
                        this.value = element;
                        this.ItemElegido(this.value);
                     }
                  });
               }
            }
            this.loading = false;

            if(this._datos.length == 1){
               this.value = this._datos[0];
               this.ItemElegido(this.value);
            }

         },
         error => {
            this.loading = false;
         }
      );
   }

   ngOnInit(): void {
      this.getOperatorias();

      var validator= [] as any[];

      if(this.required){
         validator.push(Validators.required)
         this.catalogo.setValidators(validator);
      };

      this.catalogo.markAsTouched();
   }

}
