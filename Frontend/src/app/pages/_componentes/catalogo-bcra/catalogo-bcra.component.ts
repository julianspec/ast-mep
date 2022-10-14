import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { FormControl, Validators, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CatalogoBcra } from 'src/app/_model';
import { OperatoriaBcraService } from 'src/app/_servicios';

@Component({
  selector: 'catalogo-bcra',
  templateUrl: './catalogo-bcra.component.html',
  styleUrls: ['./catalogo-bcra.component.css'],
  providers: [
   {
     provide: NG_VALUE_ACCESSOR,
     useExisting: forwardRef(() => CatalogoBcraComponent),
     multi: true
   }
 ]
})
export class CatalogoBcraComponent implements OnInit {

   _datos = [] as CatalogoBcra[];
   empty = {} as CatalogoBcra;
   vacio = false as boolean;
   label = "" as string;
   private _codigo: string;
   filteredList1 = this._datos.slice();
   value = {} as CatalogoBcra;
   isDisabled: boolean;
   onChange = (_:any) => { }
   onTouch = () => { }
   required = false;
   catalogo =new FormControl('', {validators: [], asyncValidators:[], updateOn:'change'} );
   loading = false as boolean;

   @Input() set permiteVacio(value: boolean){
      this.vacio = value;
   }

   @Input() set inputValue(value: string){
      this.value.codigo = value;
   }

   @Input() set requerido(value: boolean){
      this.required = value;
   }

   @Input() set codigoCatalogo(value: string){
      this._codigo = value;
   }

   @Input() set labelInput(value:string){
      this.label = value;
   }

   @Output() selectedValue = new EventEmitter<CatalogoBcra>();

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


   ItemElegido(registro: CatalogoBcra) {

      var salida = {} as CatalogoBcra;

      if(registro != undefined){
         salida.codigo = registro.codigo;
         salida.contenido = registro.contenido;

      }else{
         salida = registro;
      }

      //this.value = salida;
      this.onTouch();
      this.onChange(salida);
      this.catalogo.markAsTouched();
      this.selectedValue.emit(salida);

   }

   getCatalogoBCRA(codigo: string){
      this.loading = true;
      this.operatoriaService.getCatalogo(codigo).subscribe(
         (salida) => {
               this._datos = salida;
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

            }
      );
   }

   ngOnInit(): void {
      this.getCatalogoBCRA(this._codigo);

      var validator= [] as any[];

      if(this.required){
         validator.push(Validators.required)
         this.catalogo.setValidators(validator);
      };

      this.catalogo.markAsTouched();
   }


}
