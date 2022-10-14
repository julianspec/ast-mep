import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ParametriaBCRA } from '../_model/parametroBCRA';

@Injectable({
  providedIn: 'root'
})
export class ParametroCobisService {
   private urlEndPoint:string = 'api/parametriacobis'
   private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

   constructor(private http:HttpClient) { }


   get(codigoMep): Observable<ParametriaBCRA>{
      return this.http.get(this.urlEndPoint + '/' + codigoMep).pipe(
         map(response => response as ParametriaBCRA)
      )
   }

   Create(parametro: ParametriaBCRA): Observable<ParametriaBCRA>{

      return this.http.post<any>(this.urlEndPoint, parametro, {headers: this.httpHeaders})
         .pipe(map(param => {
            if (param) {
               return param;
            }
         }));
   }

   Modificar(parametro: ParametriaBCRA){
      return this.http.put<any>(this.urlEndPoint + '/' + parametro.codigoMEP, parametro, {headers: this.httpHeaders});
   }

   Delete(parametro: ParametriaBCRA): Observable<any> {
      return this.http.delete<any>(this.urlEndPoint + '/' + parametro.codigoMEP ,  {headers: this.httpHeaders});
   }

}
