import { Injectable } from '@angular/core';
import { Usuario } from '../_model/usuario';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map } from 'rxjs/operators';

@Injectable({
   providedIn: 'root'
})

//ABM DE USUARIOS
export class UsuarioService {
   private urlEndPoint:string = 'api/usuarios'
   private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

   constructor(private http:HttpClient) { }


   getAll(): Observable<Usuario[]>{
      //return this.http.get<Usuario[]>(this.urlEndPoint)
      return this.http.get(this.urlEndPoint).pipe(
         map(response => response as Usuario[])

      )
   }

   Create(usuario: Usuario): Observable<Usuario[]>{
      return this.http.post<any>(this.urlEndPoint, usuario, {headers: this.httpHeaders})
         .pipe(map(user => {
            if (user) {
               return user;
            }
         }));
   }

   Modificar(usuario: Usuario){
      return this.http.put<any>(this.urlEndPoint + '/' + usuario.login, usuario, {headers: this.httpHeaders});
   }

   Delete(id: String): Observable<Usuario[]>{
      //return this.http.get<Usuario[]>(this.urlEndPoint)
      //return this.http.get(this.urlEndPoint).pipe(
      //   map(response => response as Usuario[])
      //)
      return this.getAll();
   }

}
