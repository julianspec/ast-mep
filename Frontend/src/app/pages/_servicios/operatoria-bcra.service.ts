import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CatalogoBcra, Operatoria } from '../_model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OperatoriaBcraService {
   private urlEndPoint:string = 'api/operatoria'
   private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

   constructor(private http:HttpClient) { }

   getCatalogo(codigo: string): Observable<CatalogoBcra[]>{
      return this.http.get(this.urlEndPoint + '/getTabla/' + codigo).pipe(
         map(response => response as CatalogoBcra[])
      )
   }

   getOperatoria(codigo: string): Observable<Operatoria>{
      return this.http.get(this.urlEndPoint + '/getOperatoria?codigo=' + codigo).pipe(
         map(response => response as Operatoria)
      )
   }

   getListOperatoria(): Observable<Operatoria[]>{
      return this.http.get(this.urlEndPoint + '/getOperatoria?reducido=si').pipe(
         map(response => response as Operatoria[])
      )
   }

}
