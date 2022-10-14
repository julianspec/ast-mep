import { Injectable } from '@angular/core';
import { Catalogo } from '../_model/catalogo';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {
   private urlEndPoint:string = 'api/catalogo'
   private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

   constructor(private http:HttpClient) { }


   getAll(tabla: string): Observable<Catalogo[]>{
      return this.http.get(this.urlEndPoint + '/GetCatalogo/' + tabla).pipe(
         map(response => response as Catalogo[])
      )
   }

   getCatalogo(tabla: string): Observable<Catalogo[]>{
      return this.http.get(this.urlEndPoint + '/GetCatalogoByTabla/' + tabla).pipe(
         map(response => response as Catalogo[])
      )
   }

   //getCatalogoByTabla(tabla: string): Observable<Catalogo[]>{
   //   return this.http.get(this.urlEndPoint + '/GetCatalogoByTablaDef/' + tabla).pipe(
   //      map(response => response as Catalogo[])
   //   )
   //}

   Create(catalogo: Catalogo): Observable<Catalogo>{
      return this.http.post<any>(this.urlEndPoint, catalogo, {headers: this.httpHeaders})
         .pipe(map(catalogo => {
            if (catalogo) {
               return catalogo;
            }
         }));
   }

   Modificar(catalogo: Catalogo){
      return this.http.put<any>(this.urlEndPoint + '/' + catalogo.codigo, catalogo, {headers: this.httpHeaders});
   }

   catalogoStorage(){
      this.getCatalogo('codigo_banco').subscribe(result => {
         localStorage.setItem('catalogoEntidades', JSON.stringify(result));
      });

   }

   removeCatalogoStorage(){
      localStorage.removeItem('catalogoEntidades');
   }

}
