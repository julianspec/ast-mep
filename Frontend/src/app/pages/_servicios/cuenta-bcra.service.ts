import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CuentaBcra } from '../_model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CuentaBcraService {

   private urlEndPoint:string = 'api/cuentabanco'
   private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

   constructor(private http:HttpClient) { }

   getCuentaEntidad(entidad: string): Observable<CuentaBcra[]>{
      return this.http.get(this.urlEndPoint + '/' + entidad).pipe(
         map(response => response as CuentaBcra[])
   )}

}
