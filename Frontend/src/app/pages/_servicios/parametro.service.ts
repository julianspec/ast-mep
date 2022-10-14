import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Parametro } from '../_model';
import { map, catchError } from 'rxjs/operators';

const httpOptions = {
   headers: new HttpHeaders({
     'Content-Type':  'application/json'
   })
 };


@Injectable({
  providedIn: 'root'
})

export class ParametroService {
   private urlEndPoint:string = 'api/parametro'
   private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

   constructor(private http:HttpClient) { }


   getAll(): Observable<Parametro[]>{
      return this.http.get(this.urlEndPoint).pipe(
         map(response => response as Parametro[])

      )
   }

   Create(parametro: Parametro): Observable<Parametro[]>{
      return this.http.post<any>(this.urlEndPoint, parametro, {headers: this.httpHeaders})
         .pipe(map(param => {
            if (param) {
               return param;
            }
         }));
   }

   Modificar(parametro: Parametro){
      return this.http.put<any>(this.urlEndPoint + '/' + parametro.nemonico, parametro, {headers: this.httpHeaders});
   }

   Delete(parametro: Parametro): Observable<any> {
      return this.http.delete<any>(this.urlEndPoint + '/' + parametro.nemonico ,  {headers: this.httpHeaders});
   }

}
