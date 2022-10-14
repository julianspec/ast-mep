import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ParametroNDC } from '../_model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ParametroNDCService {
   private urlEndPoint:string = 'api/parametriandc'
   private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

   constructor(private http:HttpClient) { }


   getAll(): Observable<ParametroNDC[]>{
      return this.http.get(this.urlEndPoint).pipe(
         map(response => response as ParametroNDC[])

      )
   }

   Create(parametro: ParametroNDC): Observable<ParametroNDC[]>{
      return this.http.post<any>(this.urlEndPoint, parametro, {headers: this.httpHeaders})
         .pipe(map(param => {
            if (param) {
               return param;
            }
         }));
   }

   Modificar(parametro: ParametroNDC){
      return this.http.put<any>(this.urlEndPoint + '/' + parametro.id, parametro, {headers: this.httpHeaders});
   }

   Delete(parametro: ParametroNDC): Observable<any> {
      return this.http.delete<any>(this.urlEndPoint + '/' + parametro.id ,  {headers: this.httpHeaders});
   }

}
