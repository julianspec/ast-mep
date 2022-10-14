import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { APIUrl } from 'src/environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      const baseUrl = document.getElementsByTagName('base')[0].href;

      if(environment.production){
         const apiReq = req.clone({ url: `${baseUrl.replace("mep-web", APIUrl)}${req.url}` });
         return next.handle(apiReq);
      }else{
         const apiReq = req.clone({ url: `${APIUrl}${req.url}` });
         return next.handle(apiReq);
      }

   }
}