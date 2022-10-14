import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Saldo } from '../_model/saldo';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

// CONSULTA EL SALDO DE LAS CUENTAS DEL BANCO
export class PosicionService {

   private urlEndPoint:string = 'api/saldobcra'
   constructor(private http:HttpClient) { }

   getPosicion(): Observable<Saldo[]>{
      return this.http.get(this.urlEndPoint).pipe(
         map(response => response as Saldo[])
      )
   }

   getSaldo(cuenta: string): Observable<Saldo>{
      return this.http.get(this.urlEndPoint + '/consultasaldo/' + cuenta).pipe(
         map(response => response as Saldo)
      )
   }
}
