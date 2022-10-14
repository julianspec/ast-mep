import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Tabla } from '../_model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TablaService {

   private urlEndPoint:string = 'api/tabla'
   private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

   constructor(private http:HttpClient) { }


   getAll(): Observable<Tabla[]>{
      return this.http.get(this.urlEndPoint).pipe(
         map(response => response as Tabla[])
      )
   }

   getTabla(tabla: string): Observable<Tabla>{
      return this.http.get(this.urlEndPoint + '/' + tabla).pipe(
         map(response => response as Tabla)
      )
   }

}
