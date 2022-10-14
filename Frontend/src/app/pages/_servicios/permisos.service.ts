import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Permiso } from '../_model/permiso';
import { map } from 'rxjs/operators';
import { RolPermiso } from '../_model/rolPermiso';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

   private urlEndPoint:string = 'api/Permisos'
   private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

   constructor(private http:HttpClient) { }


   getAll(): Observable<Permiso[]>{
      return this.http.get(this.urlEndPoint).pipe(
         map(response => response as Permiso[])
      )
   }

   getHabilitado(id: number): Observable<RolPermiso[]>{
      return this.http.get(this.urlEndPoint + '/'+ id).pipe(
         map(response => response as RolPermiso[])
      )
   }

   Asociar(asociar: RolPermiso): Observable<RolPermiso[]>{
      return this.http.post<any>(this.urlEndPoint, asociar, {headers: this.httpHeaders})
         .pipe(map(param => {
            if (param) {
               return param;
            }
         }));
   }

   Desasociar(desasociar: RolPermiso): Observable<RolPermiso[]>{
      return this.http.put<any>(this.urlEndPoint, desasociar, {headers: this.httpHeaders})
         .pipe(map(param => {
            if (param) {
               return param;
            }
         }));
   }
}
