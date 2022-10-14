import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Login } from '../_model';
import { MenuItemService } from './menu-item.service';
import { CatalogoService } from './catalogo.service';
import { LogService } from '../_helpers';

// AUTENTICACION DEL USUARIO

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

   private urlEndPoint = 'api/login';
   private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

   private currentUserSubject: BehaviorSubject<Login>;
   public currentUser: Observable<Login>;

   constructor(private http: HttpClient,
               private menuService: MenuItemService,
               private catalogoService: CatalogoService,
               private logger: LogService) {
      this.currentUserSubject = new BehaviorSubject<Login>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserValue(): Login {
      return this.currentUserSubject.value;
   }

   login(login:Login) {
      this.logger.log('Invocando al método: ' + this.urlEndPoint);
      return this.http.post<Login>(this.urlEndPoint, login, {headers: this.httpHeaders})
         .pipe(map(user => {
            if (user && user.autenticado) {
               localStorage.setItem('currentUser', JSON.stringify(user));
               this.currentUserSubject.next(user);

               this.catalogoService.catalogoStorage();

            }
            return user;
         }));
   }

   logout(login:Login) {
      localStorage.removeItem('permisosHabilitados');
      localStorage.removeItem('currentMenu');
      localStorage.removeItem('currentUser');

      this.catalogoService.removeCatalogoStorage();

      this.currentUserSubject.next(null);
      this.menuService.limpiarMenu();
      if(login.id){
         return this.http.put<any>(this.urlEndPoint + '/' + login.id, login, {headers: this.httpHeaders});
      }
   }
}