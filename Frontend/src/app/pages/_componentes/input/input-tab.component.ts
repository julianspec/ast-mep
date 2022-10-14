import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InstruccionOperatoria, CatalogoBcra, InstruccionPago } from 'src/app/_model';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { OperatoriaBcraService } from 'src/app/_servicios';

@Component({
  selector: 'input-tab',
  templateUrl: './input-tab.component.html'
})
export class InputTabComponent implements OnInit {

   instruccion: InstruccionOperatoria;
   tab = new FormControl('', []);
   _datos = [] as CatalogoBcra[];
   label = "" as string;
   requerido = false;

   @Output() selectedValue = new EventEmitter<InstruccionPago>();

   @Input() set formato(value: InstruccionOperatoria) {
      this.instruccion = value;
   }

   constructor(private fb: FormBuilder,
               private operatoriaService: OperatoriaBcraService) {
   }

   ItemElegido(registro: CatalogoBcra) {
      var salida = {} as InstruccionPago;

      salida.clave = this.instruccion.tag;
      salida.valor = registro.codigo;
      salida.nombre = this.instruccion.nombre;
      salida.error = ((registro.codigo == "" || registro.codigo == null) && this.instruccion.requerido == 1)?true:!this.tab.valid;

      this.selectedValue.emit(salida);
   }

   getCatalogoBCRA(codigo: string){
      this.operatoriaService.getCatalogo(codigo).subscribe(
         (salida) => {
               this._datos = salida;
            }
      );
   }

   ngOnInit(): void {
      this.getCatalogoBCRA(this.instruccion.parametro);

      var validator= [] as any[];
      if(this.instruccion.longitudMaxima != null){
         validator.push(Validators.maxLength(this.instruccion.longitudMaxima));
      }
      if(this.instruccion.longitudMinima != null){
         validator.push(Validators.minLength(this.instruccion.longitudMinima));
      }
      if(this.instruccion.requerido == 1){
         validator.push(Validators.required);
         this.requerido = true;
      }

      this.tab.setValidators(validator);

      if(this.instruccion.requerido == 1){this.ItemElegido({} as CatalogoBcra)}
   }

}
