import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente, Cuenta, ResponseDatosCuenta, ResponseCoelsa } from '../_model';
import { map } from 'rxjs/operators';
import { AlertService } from './alert.service';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CobisService {

   private urlEndPoint:string = ''
   private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

   constructor(private http:HttpClient,
               private alertService:AlertService) { }

   getCliente(cliente: Cliente): Observable<Cliente>{
      this.urlEndPoint = 'api/cliente';
      return this.http.post<any>(this.urlEndPoint, cliente.numeroDocTributario, {headers: this.httpHeaders})
         .pipe(map(cli => {
            if(cli){
               if (cli.statusCode == 200) {
                  cliente = JSON.parse(cli.obj);
               }else{
                  this.alertService.error(cli.mensajeError);
               }
            }
            return cliente;
         }));
   }

   getCuentas(ente: number): Observable<Cuenta[]>{
      var cuentas = [] as Cuenta[];
      this.urlEndPoint = 'api/cuenta';
      if(ente == null){return;}
      return this.http.post<any>(this.urlEndPoint, ente, {headers: this.httpHeaders})
         .pipe(map(cuenta => {
            if (cuenta) {
               if (cuenta.statusCode == 200) {
                  cuentas = JSON.parse(cuenta.obj);
                  //alert(JSON.stringify(cuentas))
               }else{
                  this.alertService.error(cuenta.mensajeError);
               }
            }
            return cuentas;
         }));
   }

   getDetalleCuenta(cuenta: string): Observable<ResponseDatosCuenta>{
      this.urlEndPoint = 'api/cuenta/detalle';
      return this.http.get(this.urlEndPoint + '/' + cuenta).pipe(
         map(response => response as ResponseDatosCuenta)
      )
   }

   validaCBU(cbu: string, moneda?: string): Observable<ResponseCoelsa>{
      var resultado: ResponseCoelsa;
      this.urlEndPoint = 'api/cuenta/validacbu';
      return this.http.get(this.urlEndPoint + '/' + cbu)
      .pipe(map(response => {

            resultado = response as ResponseCoelsa;
            if(moneda.length > 0){
               if(resultado != null){
                  if(resultado.datosCoelsa!=null){
                     if(resultado.datosCoelsa.moneda != moneda){
                        resultado.code = 999
                        resultado.message = 'La moneda del CBU difiere de la moneda de la operacion'
                     }
                  }
               }
            }

            return resultado
         }
      ));
   }

   CBUValidator(): AsyncValidatorFn {

      return (
            control: AbstractControl
      ): Observable<{ [key: string]: boolean } | null> => {

         this.urlEndPoint = 'api/cuenta/validacbu';
         return this.http.get(this.urlEndPoint + '/' + control.value)
         .pipe(map(cbu => {
            if(cbu){
               return {'cbuValidator': true }
            }else{
               return null
            }

         }));
      }
   }
}
