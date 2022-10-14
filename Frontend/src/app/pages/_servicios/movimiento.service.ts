import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movimiento } from '../_model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MovimientoService {

   private urlEndPoint:string = 'api/movimientosbcra'
   constructor(private http:HttpClient) { }

   getAll(filtros): Observable<Movimiento[]>{
      return this.http.post(this.urlEndPoint, filtros).pipe(
         map(response => response as Movimiento[])
      )
   }

   getMovimiento(codigo: string): Observable<Movimiento>{
      var url = this.urlEndPoint + '/' + codigo
      return this.http.get(url).pipe(
         map(response => response as Movimiento)
      )
   }
}
