import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReservaEfectivo } from '../_model/reservaEfectivo';

@Injectable({
  providedIn: 'root'
})
export class ReservaEfectivoService {

   private urlEndPoint:string = 'api/movimientosbcra/reserva';
   private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

   constructor(private http:HttpClient) { }

   getAll(): Observable<ReservaEfectivo[]>{
      //return this.http.get<Usuario[]>(this.urlEndPoint)
      return this.http.get(this.urlEndPoint).pipe(
         map(response => response as ReservaEfectivo[])
      )
   }

   getReservas(cuenta:string): Observable<ReservaEfectivo[]>{
      var url = this.urlEndPoint + '?cuenta='+ cuenta
      return this.http.get(url).pipe(
         map(response => response as ReservaEfectivo[])
      )
   }

   Create(reserva: ReservaEfectivo): Observable<string>{
      var url = this.urlEndPoint + '?cuenta='+ reserva.cuenta
      + '&monto=' + reserva.monto
      + '&usuario=' + reserva.usuario
      return this.http.post<any>(url,null, {headers: this.httpHeaders})
         .pipe(map(reserva => {
            if (reserva) {
               return reserva;
            }
         }));
   }

   Delete(id: string): Observable<any> {
      var url = this.urlEndPoint + '?id='+id;
      return this.http.delete<any>(url ,  {headers: this.httpHeaders});
   }

}
