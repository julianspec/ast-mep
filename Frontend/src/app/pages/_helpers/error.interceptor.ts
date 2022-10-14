import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService, AlertService } from '../_servicios';
import { Login } from '../_model';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    currentUser: Login;

    constructor(private authenticationService: AuthenticationService,
                private alertService: AlertService) {
      this.authenticationService.currentUser.subscribe(x => { this.currentUser = x });
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {

            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout(this.currentUser);
                location.reload(true);
            }
            if (err.status === 400) {
               // Si envía un error 400 muestro el mensaje por pantalla
               this.alertService.error(err.error);
            }
            if (err.status === 403) {
               // Si envía un error 403 muestro el mensaje por pantalla
               this.alertService.error('El usuario no posee permisos para realizar la consulta');
            }
            if (err.status === 504) {
               // Si envía un error 403 muestro el mensaje por pantalla
               this.alertService.error('Sistema fuera de línea.');
            }
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}