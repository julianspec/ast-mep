import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rol } from '../_model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RolService {

   private urlEndPoint:string = 'api/rol'
   private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

   constructor(private http:HttpClient) { }


   getAll(): Observable<Rol[]>{
      return this.http.get(this.urlEndPoint).pipe(
         map(response => response as Rol[])

      )
   }

   get(id: number): Observable<Rol>{
      return this.http.get(this.urlEndPoint + '/'+ id).pipe(
         map(response => response as Rol)

      )
   }

   Create(rol: Rol): Observable<Rol[]>{
      return this.http.post<any>(this.urlEndPoint, rol, {headers: this.httpHeaders})
         .pipe(map(param => {
            if (param) {
               return param;
            }
         }));
   }

   Modificar(rol: Rol){
      return this.http.put<any>(this.urlEndPoint + '/' + rol.id, rol, {headers: this.httpHeaders});
   }


}
