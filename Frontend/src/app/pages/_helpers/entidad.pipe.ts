import { Pipe, PipeTransform } from '@angular/core';
import { Catalogo } from '../_model';
import { CatalogoService } from '../_servicios';

@Pipe({
  name: 'entidad'
})

export class EntidadPipe implements PipeTransform {

   entidades = [] as Catalogo[];

   constructor(private catalogoService: CatalogoService) {
      this.entidades = JSON.parse(localStorage.getItem('catalogoEntidades'));
   }


   transform(value: any): any {

      if(this.entidades == null){
         return value;
      }

      const index = this.entidades.findIndex(val => val.codigo === value);
      if(index >= 0  ){
         return value + ' - ' + this.entidades[index].valor;
      }else{
         return value;
      }

   }
}
