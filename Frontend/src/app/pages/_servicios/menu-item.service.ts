import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { MenuItem } from '../_model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

// TRAE LOS ITEMS DE MENU AUTORIZADOS
export class MenuItemService {
   private urlEndPoint:string = 'api/menu'
   private menuItemsSubject: BehaviorSubject<MenuItem[]>;
   public menuItems: Observable<MenuItem[]>;


   constructor(private http:HttpClient) {
      this.menuItemsSubject = new BehaviorSubject<MenuItem[]>(JSON.parse(localStorage.getItem('currentMenu')));
      this.menuItems = this.menuItemsSubject.asObservable();
   }

   public get MenuItemsList(): MenuItem[] {
      return this.menuItemsSubject.value;
   }

   public limpiarMenu(){
      this.menuItemsSubject.next([]);
   }

   getAll(id:number): Observable<MenuItem[]>{
      return this.http.get<MenuItem[]>(this.urlEndPoint + '/' + id)
      .pipe(map(menu => {
         if (menu) {
            var m = [] as MenuItem[];
            menu.forEach(element => {

               if(element.idPadre > 0){
                  const index = m.findIndex(val => val.id === element.idPadre);
                  if(index >= 0  ){
                     var e = {} as MenuItem;
                     e.id = element.id;
                     e.nombre = element.nombre;
                     e.ruta = element.ruta;
                     e.icono = element.icono;
                     e.subMenu = [] as MenuItem[];
                     m[index].subMenu.push(e);
                  }
               }else{
                  var e = {} as MenuItem;
                  e.id = element.id;
                  e.nombre = element.nombre;
                  e.ruta = element.ruta;
                  e.icono = element.icono;
                  e.subMenu = [] as MenuItem[];
                  m.push(e);
               }
            });

            localStorage.setItem('currentMenu', JSON.stringify(m));
            this.menuItemsSubject.next(m);
         }
         return m;
      }));
   }
}
