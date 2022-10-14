import { Injectable } from '@angular/core';
import { AuthenticationService } from '../_servicios';
import { Login } from '../_model';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

   private usuario: Login;

   constructor(private authenticationService: AuthenticationService) {
      this.authenticationService.currentUser.subscribe(x => { this.usuario = x });
   }

   getUser(){
      return this.usuario;
   }

}
