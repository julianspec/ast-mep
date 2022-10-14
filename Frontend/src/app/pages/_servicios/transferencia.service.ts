import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataChart, EnvioOperacion, Transferencia } from '../_model';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common'
import { CantidadOperaciones } from '../_model/cantidadOperaciones';

@Injectable({
  providedIn: 'root'
})
export class TransferenciaService {


   private urlEndPoint:string = 'api/transferencia'
   private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

   constructor(private http:HttpClient, public datepipe: DatePipe) { }


   toDate(fecha:Date): string{
      return this.datepipe.transform(fecha, 'dd/MM/yyyy');
   }

   enviarTransferencia(transferencia: EnvioOperacion): Observable<EnvioOperacion>{
      return this.http.post(this.urlEndPoint, transferencia).pipe(
         map(response => response as EnvioOperacion)
      )
   }

   actualizarTransferencia(transferencia: Transferencia): Observable<Transferencia>{
      return this.http.put(this.urlEndPoint + '/actualizartransferencia', transferencia).pipe(
         map(response => response as Transferencia)
      )
   }

   reversarCobis(transferencia: Transferencia): Observable<Transferencia>{
      return this.http.put(this.urlEndPoint + '/reversarCobis', transferencia.id).pipe(
         map(response => response as Transferencia)
      )
   }

   getPendientes(offset: number, limit: number, fecha:Date, operatoria: string, movimiento: string, moneda: string): Observable<Transferencia[]>{
      var url = this.urlEndPoint + '/pendientes?offset='+offset+'&limit='+limit+'&fecha='+this.toDate(fecha);
      if(operatoria){ url += '&operatoria='+operatoria; }
      if(movimiento){ url += '&tipo='+movimiento; }
      if(moneda){ url += '&moneda='+moneda; }

      return this.http.get(url).pipe(
         map(response => response as Transferencia[])
      )
   }

   getPendienteEnvio(offset: number, limit: number, fecha:Date, operatoria: string, movimiento: string, moneda: string): Observable<Transferencia[]>{
      var url = this.urlEndPoint + '/pendientesenvio?offset='+offset+'&limit='+limit+'&fecha='+this.toDate(fecha);
      if(operatoria){ url += '&operatoria='+operatoria; }
      if(movimiento){ url += '&tipo='+movimiento; }
      if(moneda){ url += '&moneda='+moneda; }

      return this.http.get(url).pipe(
         map(response => response as Transferencia[])
      )
   }

   getReparar(offset: number, limit: number, fecha:Date, operatoria: string, movimiento: string, moneda: string): Observable<Transferencia[]>{
      var url = this.urlEndPoint + '/reparar?offset='+offset+'&limit='+limit+'&fecha='+this.toDate(fecha);
      if(operatoria){ url += '&operatoria='+operatoria; }
      if(movimiento){ url += '&tipo='+movimiento; }
      if(moneda){ url += '&moneda='+moneda; }
      return this.http.get(url).pipe(
         map(response => response as Transferencia[])
      )
   }

   getAprobadas(offset: number, limit: number, fecha:Date, operatoria: string, movimiento: string, moneda: string): Observable<Transferencia[]>{
      var url = this.urlEndPoint + '/aprobadas?offset='+offset+'&limit='+limit+'&fecha='+this.toDate(fecha);
      if(operatoria){ url += '&operatoria='+operatoria; }
      if(movimiento){ url += '&tipo='+movimiento; }
      if(moneda){ url += '&moneda='+moneda; }
      return this.http.get(url).pipe(
         map(response => response as Transferencia[])
      )
   }

   getRechazadas(offset: number, limit: number, fecha:Date, operatoria: string, movimiento: string, moneda: string): Observable<Transferencia[]>{
      var url = this.urlEndPoint + '/rechazadas?offset='+offset+'&limit='+limit+'&fecha='+this.toDate(fecha);
      if(operatoria){ url += '&operatoria='+operatoria; }
      if(movimiento){ url += '&tipo='+movimiento; }
      if(moneda){ url += '&moneda='+moneda; }
      return this.http.get(url).pipe(
         map(response => response as Transferencia[])
      )
   }

   getErroneas(offset: number, limit: number, fecha:Date, operatoria: string, movimiento: string, moneda: string): Observable<Transferencia[]>{
      var url = this.urlEndPoint + '/erroneas?offset='+offset+'&limit='+limit+'&fecha='+this.toDate(fecha);
      if(operatoria){ url += '&operatoria='+operatoria; }
      if(movimiento){ url += '&tipo='+movimiento; }
      if(moneda){ url += '&moneda='+moneda; }
      return this.http.get(url).pipe(
         map(response => response as Transferencia[])
      )
   }

   reenvioBCRA(transferencia: number){
      return this.http.put(this.urlEndPoint + '/reenvioBCRA', transferencia, {headers: this.httpHeaders}).pipe(
         map(response => response as Transferencia)
      );
   }

   reenvioCobis(transferencia: number) {
      return this.http.put(this.urlEndPoint + '/reenvioCobis', transferencia, {headers: this.httpHeaders}).pipe(
         map(response => response as Transferencia)
      );
   }

   Autorizar(transferencia: number){
      return this.http.put<any>(this.urlEndPoint + '/autorizar', transferencia, {headers: this.httpHeaders});
   }

   Enviar(transferencia: number){
      return this.http.put<any>(this.urlEndPoint + '/enviar', transferencia, {headers: this.httpHeaders});
   }

   EnviarListado(transferencia: number[]){
      return this.http.put<any>(this.urlEndPoint + '/enviarlista', transferencia, {headers: this.httpHeaders});
   }

   Rechazar(transferencia: number){
      return this.http.put<any>(this.urlEndPoint + '/rechazar', transferencia, {headers: this.httpHeaders});
   }

   getTotales(): Observable<CantidadOperaciones>{
      var url = this.urlEndPoint + '/cantidad/total';
      return this.http.get(url).pipe(
         map(response => response as CantidadOperaciones)
      )
   }

   getCantidadPorTipo(tipo: string): Observable<DataChart[]>{
      var url = this.urlEndPoint + '/cantidad/tipo?tipo=' + tipo;
      return this.http.get(url).pipe(
         map(response => response as DataChart[])
      )
   }

}
