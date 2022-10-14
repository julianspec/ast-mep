import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [{username:'fake', password:'fake'} ];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

         function handleRoute() {
            if(environment.fake){
               switch (true) {
                  case url.endsWith('/api/login') && method === 'POST':
                     return authenticate();
                  case url.endsWith('/api/catalogo/GetCatalogoByTabla/moneda_codigo') && method === 'GET':
                     return authenticate();
                  case url.endsWith('/api/menu/1') && method === 'GET':
                     return menu();
                  case url.endsWith('/api/saldobcra') && method === 'GET':
                     return saldo();
                  case url.endsWith('/api/Permisos/1') && method === 'GET':
                     return permisos();
                  case url.endsWith('/api/catalogo/GetCatalogoByTabla/codigo_banco') && method === 'GET':
                     return codigo_banco();
                  case url.endsWith('/api/transferencia/pendientes?offset=0&limit=100&fecha=25/04/2022') && method === 'GET':
                     return pendientes();
                  case url.endsWith('/api/transferencia/pendientesenvio?offset=0&limit=100&fecha=25/04/2022') && method === 'GET':
                     return pendientesEnvio();
                  case url.endsWith('/api/transferencia/aprobadas?offset=0&limit=100&fecha=25/04/2022') && method === 'GET':
                     return aprobadas();
                  case url.endsWith('/api/transferencia/reparar?offset=0&limit=100&fecha=25/04/2022') && method === 'GET':
                     return reparacion();
                  case url.endsWith('/api/transferencia/rechazadas?offset=0&limit=100&fecha=25/04/2022') && method === 'GET':
                     return rechazadas();
                  case url.endsWith('/api/transferencia/erroneas?offset=0&limit=100&fecha=25/04/2022') && method === 'GET':
                     return erroneas();
                  case url.endsWith('/api/parametro') && method === 'GET':
                     return parametro();
                  case url.endsWith('/api/usuarios') && method === 'GET':
                     return usuarios();
                  case url.endsWith('/api/rol') && method === 'GET':
                     return roles();
                  default:
                     // pass through any requests not handled above
                     return next.handle(request);
               }
            }else{
               return next.handle(request);
            }

         }

         // route functions
         function roles(){
            return ok(
               [{"id":1,"descripcion":"ADMINISTRADOR","permisos":null}]
            );
         }

         function parametro(){
            return ok([{"nemonico":"ENTAUT","descripcion":"PROCESAR AUTOMATICAMENTE TRANSFERENCIAS ENTRANTES","tipo":"C","valor":"S"},{"nemonico":"SALAUT","descripcion":"PROCESAR AUTOMATICAMENTE TRANSFERENCIAS SALIENTES","tipo":"C","valor":"S"}]);
         }

         function usuarios(){
            return ok([{"rol":{"id":1,"descripcion":"ADMINISTRADOR","permisos":null},"login":"mepworker","nombre":"aplicativo mep worker","fechaCreacion":"0001-01-01T00:00:00","usuarioModificacion":"portiz","estado":"V"},{"rol":{"id":1,"descripcion":"ADMINISTRADOR","permisos":null},"login":"jseverino","nombre":"JULIO SEVERINO","fechaCreacion":"0001-01-01T00:00:00","usuarioModificacion":null,"estado":"V"},{"rol":{"id":1,"descripcion":"ADMINISTRADOR","permisos":null},"login":"portiz","nombre":"PABLO FEDERICO ORTIZ","fechaCreacion":"0001-01-01T00:00:00","usuarioModificacion":null,"estado":"V"},{"rol":{"id":0,"descripcion":"SIN ROL ASIGNADO","permisos":null},"login":"sistema","nombre":"sistema","fechaCreacion":"0001-01-01T00:00:00","usuarioModificacion":null,"estado":"V"}]);
         }

         function pendientes(){
            return ok(
               [
                  {
                     "cuentaCobis":"900100000114987",
                     "tipoCuentaCobis":"AHO",
                     "tipoMovimiento":"D",
                     "cuitCliente":"30576124275",
                     "nombreCliente":"BVSA SD CONSULTATIO LI",
                     "moneda":"64",
                     "monedaDescripcion":"DOLAR BILLETE",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"DR2",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"198",
                     "codigoCuentaDeudora":"80198",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"285",
                     "codigoCuentaAcreedora":"80285",
                     "descCuentaAcreedora":null,
                     "importe":500,
                     "instruccionDePago":[
                        {
                           "nombre":"",
                           "clave":"CBA",
                           "valor":"2850761520094706639624",
                           "id":5075
                        },
                        {
                           "nombre":"",
                           "clave":"CUA",
                           "valor":"30707796223",
                           "id":5076
                        },
                        {
                           "nombre":"",
                           "clave":"CTR",
                           "valor":"VAR",
                           "id":5077
                        },
                        {
                           "nombre":"",
                           "clave":"CNC",
                           "valor":"Transferencia RAP",
                           "id":5078
                        },
                        {
                           "nombre":"",
                           "clave":"CBD",
                           "valor":"1980001790000001149871",
                           "id":5079
                        },
                        {
                           "nombre":"",
                           "clave":"CUD",
                           "valor":"30576124275",
                           "id":5080
                        },
                        {
                           "nombre":"",
                           "clave":"NOR",
                           "valor":"BVSA SD CONSULTATIO LI",
                           "id":5081
                        },
                        {
                           "nombre":"",
                           "clave":"T30",
                           "valor":"SI",
                           "id":5082
                        },
                        {
                           "nombre":"",
                           "clave":"T68",
                           "valor":"NO",
                           "id":5083
                        },
                        {
                           "nombre":"",
                           "clave":"IDB",
                           "valor":"LBO Granos   Valores",
                           "id":5084
                        }
                     ],
                     "numeroCobis":1975173,
                     "numeroCobisReverso":0,
                     "estadoCobis":"",
                     "mensajeCobis":null,
                     "numeroBcra":null,
                     "estadoBcra":"",
                     "mensajeBcra":"",
                     "fechaActualizacionBcra":null,
                     "usuarioAlta":"portiz",
                     "fechaAlta":"2021-04-30T20:32:02.1002781",
                     "usuarioAprueba":null,
                     "fechaAprueba":null,
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":727
                  },
                  {
                     "cuentaCobis":"300100000126564",
                     "tipoCuentaCobis":"CTE",
                     "tipoMovimiento":"D",
                     "cuitCliente":"30576124275",
                     "nombreCliente":"BVSA SD DELTA PESOS FC",
                     "moneda":"80",
                     "monedaDescripcion":"PESOS",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"DL0",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"198",
                     "codigoCuentaDeudora":"198",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"14",
                     "codigoCuentaAcreedora":"14",
                     "descCuentaAcreedora":null,
                     "importe":10,
                     "instruccionDePago":[
                        {
                           "nombre":"CBU Beneficiario",
                           "clave":"CBA",
                           "valor":"0140000703100097136974",
                           "id":5065
                        },
                        {
                           "nombre":"CUIT / CUIL Beneficiario",
                           "clave":"CUA",
                           "valor":"30576124275",
                           "id":5066
                        },
                        {
                           "nombre":"Codigo de transferencia",
                           "clave":"T92",
                           "valor":"VAR",
                           "id":5067
                        },
                        {
                           "nombre":"Concepto",
                           "clave":"CNC",
                           "valor":"Transferencia CHS",
                           "id":5068
                        },
                        {
                           "nombre":"CBU ordenante",
                           "clave":"CBD",
                           "valor":"1980001730000001265647",
                           "id":5069
                        },
                        {
                           "nombre":"CUIT / CUIL Ordenante",
                           "clave":"CUD",
                           "valor":"30576124275",
                           "id":5070
                        },
                        {
                           "nombre":"Nombre ordenante",
                           "clave":"NOR",
                           "valor":"BVSA SD DELTA PESOS FC",
                           "id":5071
                        },
                        {
                           "nombre":"Declaro conocer a mi cliente",
                           "clave":"C01",
                           "valor":"SI",
                           "id":5072
                        },
                        {
                           "nombre":"Ordenante PEP-Pers Exp Politc",
                           "clave":"T68",
                           "valor":"NO",
                           "id":5073
                        },
                        {
                           "nombre":"Tipo de Cuenta Ordenante",
                           "clave":"T01",
                           "valor":"13",
                           "id":5074
                        }
                     ],
                     "numeroCobis":1975172,
                     "numeroCobisReverso":0,
                     "estadoCobis":"OK",
                     "mensajeCobis":null,
                     "numeroBcra":25933839,
                     "estadoBcra":"OK",
                     "mensajeBcra":"8000-La transferencia fue aceptada",
                     "fechaActualizacionBcra":null,
                     "usuarioAlta":"portiz",
                     "fechaAlta":"2021-04-30T20:32:01.6368394",
                     "usuarioAprueba":null,
                     "fechaAprueba":null,
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":726
                  }
               ]
            );
         }

         function pendientesEnvio(){
            return ok(
               [
                  {
                     "cuentaCobis":"900100000114987",
                     "tipoCuentaCobis":"AHO",
                     "tipoMovimiento":"D",
                     "cuitCliente":"30576124275",
                     "nombreCliente":"BVSA SD CONSULTATIO LI",
                     "moneda":"64",
                     "monedaDescripcion":"DOLAR BILLETE",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"DR2",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"198",
                     "codigoCuentaDeudora":"80198",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"285",
                     "codigoCuentaAcreedora":"80285",
                     "descCuentaAcreedora":null,
                     "importe":500,
                     "instruccionDePago":[
                        {
                           "nombre":"",
                           "clave":"CBA",
                           "valor":"2850761520094706639624",
                           "id":5075
                        },
                        {
                           "nombre":"",
                           "clave":"CUA",
                           "valor":"30707796223",
                           "id":5076
                        },
                        {
                           "nombre":"",
                           "clave":"CTR",
                           "valor":"VAR",
                           "id":5077
                        },
                        {
                           "nombre":"",
                           "clave":"CNC",
                           "valor":"Transferencia RAP",
                           "id":5078
                        },
                        {
                           "nombre":"",
                           "clave":"CBD",
                           "valor":"1980001790000001149871",
                           "id":5079
                        },
                        {
                           "nombre":"",
                           "clave":"CUD",
                           "valor":"30576124275",
                           "id":5080
                        },
                        {
                           "nombre":"",
                           "clave":"NOR",
                           "valor":"BVSA SD CONSULTATIO LI",
                           "id":5081
                        },
                        {
                           "nombre":"",
                           "clave":"T30",
                           "valor":"SI",
                           "id":5082
                        },
                        {
                           "nombre":"",
                           "clave":"T68",
                           "valor":"NO",
                           "id":5083
                        },
                        {
                           "nombre":"",
                           "clave":"IDB",
                           "valor":"LBO Granos   Valores",
                           "id":5084
                        }
                     ],
                     "numeroCobis":1975173,
                     "numeroCobisReverso":0,
                     "estadoCobis":"",
                     "mensajeCobis":null,
                     "numeroBcra":null,
                     "estadoBcra":"",
                     "mensajeBcra":"",
                     "fechaActualizacionBcra":null,
                     "usuarioAlta":"portiz",
                     "fechaAlta":"2021-04-30T20:32:02.1002781",
                     "usuarioAprueba":"portiz",
                     "fechaAprueba":"2021-04-30T20:32:02.1002781",
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":727
                  },
                  {
                     "cuentaCobis":"300100000126564",
                     "tipoCuentaCobis":"CTE",
                     "tipoMovimiento":"D",
                     "cuitCliente":"30576124275",
                     "nombreCliente":"BVSA SD DELTA PESOS FC",
                     "moneda":"80",
                     "monedaDescripcion":"PESOS",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"DL0",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"198",
                     "codigoCuentaDeudora":"198",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"14",
                     "codigoCuentaAcreedora":"14",
                     "descCuentaAcreedora":null,
                     "importe":10,
                     "instruccionDePago":[
                        {
                           "nombre":"CBU Beneficiario",
                           "clave":"CBA",
                           "valor":"0140000703100097136974",
                           "id":5065
                        },
                        {
                           "nombre":"CUIT / CUIL Beneficiario",
                           "clave":"CUA",
                           "valor":"30576124275",
                           "id":5066
                        },
                        {
                           "nombre":"Codigo de transferencia",
                           "clave":"T92",
                           "valor":"VAR",
                           "id":5067
                        },
                        {
                           "nombre":"Concepto",
                           "clave":"CNC",
                           "valor":"Transferencia CHS",
                           "id":5068
                        },
                        {
                           "nombre":"CBU ordenante",
                           "clave":"CBD",
                           "valor":"1980001730000001265647",
                           "id":5069
                        },
                        {
                           "nombre":"CUIT / CUIL Ordenante",
                           "clave":"CUD",
                           "valor":"30576124275",
                           "id":5070
                        },
                        {
                           "nombre":"Nombre ordenante",
                           "clave":"NOR",
                           "valor":"BVSA SD DELTA PESOS FC",
                           "id":5071
                        },
                        {
                           "nombre":"Declaro conocer a mi cliente",
                           "clave":"C01",
                           "valor":"SI",
                           "id":5072
                        },
                        {
                           "nombre":"Ordenante PEP-Pers Exp Politc",
                           "clave":"T68",
                           "valor":"NO",
                           "id":5073
                        },
                        {
                           "nombre":"Tipo de Cuenta Ordenante",
                           "clave":"T01",
                           "valor":"13",
                           "id":5074
                        }
                     ],
                     "numeroCobis":1975172,
                     "numeroCobisReverso":0,
                     "estadoCobis":"OK",
                     "mensajeCobis":null,
                     "numeroBcra":25933839,
                     "estadoBcra":"OK",
                     "mensajeBcra":"8000-La transferencia fue aceptada",
                     "fechaActualizacionBcra":null,
                     "usuarioAlta":"portiz",
                     "fechaAlta":"2021-04-30T20:32:01.6368394",
                     "usuarioAprueba":"portiz",
                     "fechaAprueba":"2021-04-30T20:32:01.6368394",
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":726
                  }
               ]
            );
         }

         function erroneas(){
 
            return ok(
               [
                  {
                     "cuentaCobis":"900100000116969",
                     "tipoCuentaCobis":"AHO",
                     "tipoMovimiento":"D",
                     "cuitCliente":"30576124275",
                     "nombreCliente":"BALANZ CAPITAL RENTA F",
                     "moneda":"64",
                     "monedaDescripcion":"DOLAR BILLETE",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"GC2",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"198",
                     "codigoCuentaDeudora":"80198",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"7",
                     "codigoCuentaAcreedora":"80007",
                     "descCuentaAcreedora":null,
                     "importe":13769.61,
                     "instruccionDePago":[
                        {
                           "nombre":"Destino de fondos",
                           "clave":"FON",
                           "valor":"",
                           "id":5006
                        },
                        {
                           "nombre":"CUIT - Ordenante",
                           "clave":"CUO",
                           "valor":"30576124275",
                           "id":5007
                        },
                        {
                           "nombre":"CBU - Ordenante",
                           "clave":"CBO",
                           "valor":"1980001790000001169699",
                           "id":5008
                        },
                        {
                           "nombre":"CBU Destino final",
                           "clave":"CBD",
                           "valor":"0070068931004007545045",
                           "id":5009
                        },
                        {
                           "nombre":"CUIT Destinatario final",
                           "clave":"CUB",
                           "valor":"23944960244",
                           "id":5010
                        },
                        {
                           "nombre":"Concepto",
                           "clave":"TXT",
                           "valor":"Transferencia RES",
                           "id":5011
                        },
                        {
                           "nombre":"Tipo de inversion",
                           "clave":"T45",
                           "valor":"01",
                           "id":5012
                        },
                        {
                           "nombre":"Declaro conocer a mi cliente",
                           "clave":"T30",
                           "valor":"SI",
                           "id":5013
                        }
                     ],
                     "numeroCobis":1975165,
                     "numeroCobisReverso":0,
                     "estadoCobis":"OK",
                     "mensajeCobis":null,
                     "numeroBcra":0,
                     "estadoBcra":"ERROR",
                     "mensajeBcra":"830-Debe ingresar un valor para Destino de fondos",
                     "fechaActualizacionBcra":null,
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T20:31:58.2698838",
                     "usuarioAprueba":"mepworker",
                     "fechaAprueba":"2021-04-30T20:31:58.2923477",
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":719
                  },
                  {
                     "cuentaCobis":"300100000082769",
                     "tipoCuentaCobis":"CTE",
                     "tipoMovimiento":"D",
                     "cuitCliente":"30576124275",
                     "nombreCliente":"DELTA PESOS FCI",
                     "moneda":"80",
                     "monedaDescripcion":"PESOS",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"GC2",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"198",
                     "codigoCuentaDeudora":"198",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"72",
                     "codigoCuentaAcreedora":"72",
                     "descCuentaAcreedora":null,
                     "importe":3100000,
                     "instruccionDePago":[
                        {
                           "nombre":"Destino de fondos",
                           "clave":"FON",
                           "valor":"",
                           "id":4992
                        },
                        {
                           "nombre":"CUIT - Ordenante",
                           "clave":"CUO",
                           "valor":"30576124275",
                           "id":4993
                        },
                        {
                           "nombre":"CBU - Ordenante",
                           "clave":"CBO",
                           "valor":"1980001730000000827697",
                           "id":4994
                        },
                        {
                           "nombre":"CBU Destino final",
                           "clave":"CBD",
                           "valor":"0720000720000003535790",
                           "id":4995
                        },
                        {
                           "nombre":"CUIT Destinatario final",
                           "clave":"CUB",
                           "valor":"30576124275",
                           "id":4996
                        },
                        {
                           "nombre":"Concepto",
                           "clave":"TXT",
                           "valor":"Transferencia RES",
                           "id":4997
                        },
                        {
                           "nombre":"Tipo de inversion",
                           "clave":"T45",
                           "valor":"01",
                           "id":4998
                        },
                        {
                           "nombre":"Declaro conocer a mi cliente",
                           "clave":"T30",
                           "valor":"SI",
                           "id":4999
                        }
                     ],
                     "numeroCobis":1975163,
                     "numeroCobisReverso":0,
                     "estadoCobis":"OK",
                     "mensajeCobis":null,
                     "numeroBcra":0,
                     "estadoBcra":"ERROR",
                     "mensajeBcra":"830-Debe ingresar un valor para Destino de fondos",
                     "fechaActualizacionBcra":null,
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T20:31:57.3096392",
                     "usuarioAprueba":"mepworker",
                     "fechaAprueba":"2021-04-30T20:31:57.3307386",
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":717
                  },
                  {
                     "cuentaCobis":"300100000122302",
                     "tipoCuentaCobis":"CTE",
                     "tipoMovimiento":"D",
                     "cuitCliente":"30576124275",
                     "nombreCliente":"ALLARIA RENTA MIXTA II",
                     "moneda":"80",
                     "monedaDescripcion":"PESOS",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"GC2",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"198",
                     "codigoCuentaDeudora":"198",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"285",
                     "codigoCuentaAcreedora":"285",
                     "descCuentaAcreedora":null,
                     "importe":30,
                     "instruccionDePago":[
                        {
                           "nombre":"Destino de fondos",
                           "clave":"FON",
                           "valor":"",
                           "id":4926
                        },
                        {
                           "nombre":"CUIT - Ordenante",
                           "clave":"CUO",
                           "valor":"30576124275",
                           "id":4927
                        },
                        {
                           "nombre":"CBU - Ordenante",
                           "clave":"CBO",
                           "valor":"1980001730000001223029",
                           "id":4928
                        },
                        {
                           "nombre":"CBU Destino final",
                           "clave":"CBD",
                           "valor":"2850793630094163564061",
                           "id":4929
                        },
                        {
                           "nombre":"CUIT Destinatario final",
                           "clave":"CUB",
                           "valor":"30597901581",
                           "id":4930
                        },
                        {
                           "nombre":"Concepto",
                           "clave":"TXT",
                           "valor":"Transferencia RES",
                           "id":4931
                        },
                        {
                           "nombre":"Tipo de inversion",
                           "clave":"T45",
                           "valor":"01",
                           "id":4932
                        },
                        {
                           "nombre":"Declaro conocer a mi cliente",
                           "clave":"T30",
                           "valor":"SI",
                           "id":4933
                        }
                     ],
                     "numeroCobis":1975154,
                     "numeroCobisReverso":0,
                     "estadoCobis":"OK",
                     "mensajeCobis":null,
                     "numeroBcra":0,
                     "estadoBcra":"ERROR",
                     "mensajeBcra":"830-Debe ingresar un valor para Destino de fondos",
                     "fechaActualizacionBcra":null,
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T20:31:52.6785645",
                     "usuarioAprueba":"mepworker",
                     "fechaAprueba":"2021-04-30T20:31:52.7060684",
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":708
                  },
                  {
                     "cuentaCobis":"300100000122302",
                     "tipoCuentaCobis":"CTE",
                     "tipoMovimiento":"D",
                     "cuitCliente":"30576124275",
                     "nombreCliente":"ALLARIA RENTA MIXTA II",
                     "moneda":"80",
                     "monedaDescripcion":"PESOS",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"GC2",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"198",
                     "codigoCuentaDeudora":"198",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"285",
                     "codigoCuentaAcreedora":"285",
                     "descCuentaAcreedora":null,
                     "importe":20,
                     "instruccionDePago":[
                        {
                           "nombre":"Destino de fondos",
                           "clave":"FON",
                           "valor":"",
                           "id":4918
                        },
                        {
                           "nombre":"CUIT - Ordenante",
                           "clave":"CUO",
                           "valor":"30576124275",
                           "id":4919
                        },
                        {
                           "nombre":"CBU - Ordenante",
                           "clave":"CBO",
                           "valor":"1980001730000001223029",
                           "id":4920
                        },
                        {
                           "nombre":"CBU Destino final",
                           "clave":"CBD",
                           "valor":"2850793630094163564061",
                           "id":4921
                        },
                        {
                           "nombre":"CUIT Destinatario final",
                           "clave":"CUB",
                           "valor":"30597901581",
                           "id":4922
                        },
                        {
                           "nombre":"Concepto",
                           "clave":"TXT",
                           "valor":"Transferencia RES",
                           "id":4923
                        },
                        {
                           "nombre":"Tipo de inversion",
                           "clave":"T45",
                           "valor":"01",
                           "id":4924
                        },
                        {
                           "nombre":"Declaro conocer a mi cliente",
                           "clave":"T30",
                           "valor":"SI",
                           "id":4925
                        }
                     ],
                     "numeroCobis":1975153,
                     "numeroCobisReverso":0,
                     "estadoCobis":"OK",
                     "mensajeCobis":null,
                     "numeroBcra":0,
                     "estadoBcra":"ERROR",
                     "mensajeBcra":"830-Debe ingresar un valor para Destino de fondos",
                     "fechaActualizacionBcra":null,
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T20:31:52.3048733",
                     "usuarioAprueba":"mepworker",
                     "fechaAprueba":"2021-04-30T20:31:52.3242402",
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":707
                  }
               ]
            );
         }

         function reparacion(){

            return ok(
               [
                  {
                     "cuentaCobis":null,
                     "tipoCuentaCobis":null,
                     "tipoMovimiento":"C",
                     "cuitCliente":null,
                     "nombreCliente":null,
                     "moneda":"80",
                     "monedaDescripcion":"PESOS",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"DZ5",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"80008",
                     "codigoCuentaDeudora":"80008",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"198",
                     "codigoCuentaAcreedora":"198",
                     "descCuentaAcreedora":null,
                     "importe":1500,
                     "instruccionDePago":[
                        {
                           "nombre":"Motivo de la Devolucion",
                           "clave":"T59",
                           "valor":"1",
                           "id":4122
                        },
                        {
                           "nombre":"Red",
                           "clave":"T06",
                           "valor":"1",
                           "id":4123
                        },
                        {
                           "nombre":"Nro secuencia/referencia TR.I.",
                           "clave":"TRO",
                           "valor":"778",
                           "id":4124
                        },
                        {
                           "nombre":"Fecha original de la TR.I.",
                           "clave":"FEO",
                           "valor":"20210422",
                           "id":4125
                        },
                        {
                           "nombre":"Tipo de Cuenta Rechazada",
                           "clave":"T61",
                           "valor":"11",
                           "id":4126
                        },
                        {
                           "nombre":"Nro de Cuenta Rechazada",
                           "clave":"CTR",
                           "valor":"45787",
                           "id":4127
                        },
                        {
                           "nombre":"CUIT/CUIL/CDI/DNI Rechazado",
                           "clave":"DOR",
                           "valor":"20332068637",
                           "id":4128
                        },
                        {
                           "nombre":"Tipo de Cuenta de Origen",
                           "clave":"C61",
                           "valor":"11",
                           "id":4129
                        },
                        {
                           "nombre":"Nro de Cuenta de Origen",
                           "clave":"CTO",
                           "valor":"568787",
                           "id":4130
                        },
                        {
                           "nombre":"CUIT/CUIL/CDI/DNI de Origen",
                           "clave":"DOO",
                           "valor":"20332068637",
                           "id":4131
                        }
                     ],
                     "numeroCobis":0,
                     "numeroCobisReverso":0,
                     "estadoCobis":null,
                     "mensajeCobis":null,
                     "numeroBcra":25933354,
                     "estadoBcra":"OK",
                     "mensajeBcra":"",
                     "fechaActualizacionBcra":"26/04/2021 13:44:42",
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T14:49:10.295679",
                     "usuarioAprueba":null,
                     "fechaAprueba":null,
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":597
                  },
                  {
                     "cuentaCobis":null,
                     "tipoCuentaCobis":null,
                     "tipoMovimiento":"C",
                     "cuitCliente":null,
                     "nombreCliente":null,
                     "moneda":"80",
                     "monedaDescripcion":"PESOS",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"GC1",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"80008",
                     "codigoCuentaDeudora":"80008",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"198",
                     "codigoCuentaAcreedora":"198",
                     "descCuentaAcreedora":null,
                     "importe":8000,
                     "instruccionDePago":[
                        {
                           "nombre":"Origen de los fondos",
                           "clave":"FON",
                           "valor":"1",
                           "id":4180
                        },
                        {
                           "nombre":"CUIT/CUIL/CDI - Ordenante",
                           "clave":"CUO",
                           "valor":"30712399623",
                           "id":4181
                        },
                        {
                           "nombre":"CBU - Ordenante",
                           "clave":"CBO",
                           "valor":"2660018710000000111114",
                           "id":4182
                        },
                        {
                           "nombre":"CBU Destino final",
                           "clave":"CBD",
                           "valor":"1980001740000001311712",
                           "id":4183
                        },
                        {
                           "nombre":"CUIT Destinatario final",
                           "clave":"CUB",
                           "valor":"30576124275",
                           "id":4184
                        },
                        {
                           "nombre":"Concepto",
                           "clave":"TXT",
                           "valor":"Concepto",
                           "id":4185
                        },
                        {
                           "nombre":"Tipo de inversion",
                           "clave":"T45",
                           "valor":"01",
                           "id":4186
                        },
                        {
                           "nombre":"Declaro conocer a mi cliente",
                           "clave":"T30",
                           "valor":"SI",
                           "id":4187
                        },
                        {
                           "nombre":"Ordenante PEP-Pers Exp Politc",
                           "clave":"PEP",
                           "valor":"SI",
                           "id":4188
                        }
                     ],
                     "numeroCobis":0,
                     "numeroCobisReverso":0,
                     "estadoCobis":null,
                     "mensajeCobis":null,
                     "numeroBcra":25933368,
                     "estadoBcra":"OK",
                     "mensajeBcra":"",
                     "fechaActualizacionBcra":"26/04/2021 14:09:35",
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T14:49:14.2104622",
                     "usuarioAprueba":null,
                     "fechaAprueba":null,
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":603
                  },
                  {
                     "cuentaCobis":null,
                     "tipoCuentaCobis":null,
                     "tipoMovimiento":"C",
                     "cuitCliente":"30576124275",
                     "nombreCliente":null,
                     "moneda":"80",
                     "monedaDescripcion":"PESOS",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"GC0",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"80008",
                     "codigoCuentaDeudora":"80008",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"198",
                     "codigoCuentaAcreedora":"198",
                     "descCuentaAcreedora":null,
                     "importe":8000,
                     "instruccionDePago":[
                        {
                           "nombre":"CUIT Otorgante",
                           "clave":"CUD",
                           "valor":"30712399623",
                           "id":4209
                        },
                        {
                           "nombre":"CBU Otorgante",
                           "clave":"CBD",
                           "valor":"2660018710000000111114",
                           "id":4210
                        },
                        {
                           "nombre":"CUIT Beneficiario",
                           "clave":"CUA",
                           "valor":"30576124275",
                           "id":4211
                        },
                        {
                           "nombre":"Observaciones",
                           "clave":"TXT",
                           "valor":"Comentarios adicionales",
                           "id":4212
                        },
                        {
                           "nombre":"Declaro conocer a mi cliente",
                           "clave":"C01",
                           "valor":"SI",
                           "id":4213
                        },
                        {
                           "nombre":"Ordenante PEP-Pers Exp Politc",
                           "clave":"PEP",
                           "valor":"NO",
                           "id":4214
                        }
                     ],
                     "numeroCobis":0,
                     "numeroCobisReverso":0,
                     "estadoCobis":null,
                     "mensajeCobis":null,
                     "numeroBcra":25933374,
                     "estadoBcra":"OK",
                     "mensajeBcra":"",
                     "fechaActualizacionBcra":"26/04/2021 14:18:52",
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T14:49:15.3743976",
                     "usuarioAprueba":null,
                     "fechaAprueba":null,
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":606
                  },
                  {
                     "cuentaCobis":null,
                     "tipoCuentaCobis":null,
                     "tipoMovimiento":"C",
                     "cuitCliente":null,
                     "nombreCliente":null,
                     "moneda":"80",
                     "monedaDescripcion":"PESOS",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"PF1",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"80008",
                     "codigoCuentaDeudora":"80008",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"198",
                     "codigoCuentaAcreedora":"198",
                     "descCuentaAcreedora":null,
                     "importe":18000,
                     "instruccionDePago":[
                        {
                           "nombre":"Nro. de certificado o referenc",
                           "clave":"TXR",
                           "valor":"12354",
                           "id":4215
                        },
                        {
                           "nombre":"CBU Ordenante",
                           "clave":"CBD",
                           "valor":"2660018710000000111114",
                           "id":4216
                        },
                        {
                           "nombre":"CUIT/CUIL Ordenante",
                           "clave":"CUD",
                           "valor":"20332068637",
                           "id":4217
                        },
                        {
                           "nombre":"Titular",
                           "clave":"AYN",
                           "valor":"JUAN PEREZ",
                           "id":4218
                        },
                        {
                           "nombre":"Declaro concoer a mi cliente",
                           "clave":"T30",
                           "valor":"SI",
                           "id":4219
                        },
                        {
                           "nombre":"Observaciones",
                           "clave":"OBS",
                           "valor":"ConceptoS",
                           "id":4220
                        },
                        {
                           "nombre":"Ordenante PEP-Pers Exp Politc",
                           "clave":"PEP",
                           "valor":"SI",
                           "id":4221
                        }
                     ],
                     "numeroCobis":0,
                     "numeroCobisReverso":0,
                     "estadoCobis":null,
                     "mensajeCobis":null,
                     "numeroBcra":25933376,
                     "estadoBcra":"OK",
                     "mensajeBcra":"",
                     "fechaActualizacionBcra":"26/04/2021 14:24:59",
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T14:49:16.0487536",
                     "usuarioAprueba":null,
                     "fechaAprueba":null,
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":607
                  },
                  {
                     "cuentaCobis":null,
                     "tipoCuentaCobis":null,
                     "tipoMovimiento":"C",
                     "cuitCliente":null,
                     "nombreCliente":null,
                     "moneda":"80",
                     "monedaDescripcion":"PESOS",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"DK0",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"80009",
                     "codigoCuentaDeudora":"80009",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"198",
                     "codigoCuentaAcreedora":"198",
                     "descCuentaAcreedora":null,
                     "importe":100,
                     "instruccionDePago":[
                        {
                           "nombre":"Nro de Referencia",
                           "clave":"TXR",
                           "valor":"REF01",
                           "id":4222
                        },
                        {
                           "nombre":"CUIT del Ordenante",
                           "clave":"CUD",
                           "valor":"30500011382",
                           "id":4223
                        },
                        {
                           "nombre":"Plazo en dias",
                           "clave":"NUM",
                           "valor":"30",
                           "id":4224
                        },
                        {
                           "nombre":"Tasa de Interes",
                           "clave":"TAS",
                           "valor":"45000000",
                           "id":4225
                        },
                        {
                           "nombre":"Tipo de tasa",
                           "clave":"TTI",
                           "valor":"TV",
                           "id":4226
                        },
                        {
                           "nombre":"Observaciones",
                           "clave":"TXT",
                           "valor":"Observaciones...",
                           "id":4227
                        }
                     ],
                     "numeroCobis":0,
                     "numeroCobisReverso":0,
                     "estadoCobis":null,
                     "mensajeCobis":null,
                     "numeroBcra":25933378,
                     "estadoBcra":"OK",
                     "mensajeBcra":"",
                     "fechaActualizacionBcra":"26/04/2021 14:31:45",
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T14:49:16.3139637",
                     "usuarioAprueba":null,
                     "fechaAprueba":null,
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":608
                  }
               ]
            );
         }

         function aprobadas(){

            return ok(
               [
                  {
                     "cuentaCobis":"900100000114987",
                     "tipoCuentaCobis":"AHO",
                     "tipoMovimiento":"D",
                     "cuitCliente":"30576124275",
                     "nombreCliente":"BVSA SD CONSULTATIO LI",
                     "moneda":"64",
                     "monedaDescripcion":"DOLAR BILLETE",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"DR2",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"198",
                     "codigoCuentaDeudora":"80198",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"285",
                     "codigoCuentaAcreedora":"80285",
                     "descCuentaAcreedora":null,
                     "importe":500,
                     "instruccionDePago":[
                        {
                           "nombre":"",
                           "clave":"CBA",
                           "valor":"2850761520094706639624",
                           "id":5075
                        },
                        {
                           "nombre":"",
                           "clave":"CUA",
                           "valor":"30707796223",
                           "id":5076
                        },
                        {
                           "nombre":"",
                           "clave":"CTR",
                           "valor":"VAR",
                           "id":5077
                        },
                        {
                           "nombre":"",
                           "clave":"CNC",
                           "valor":"Transferencia RAP",
                           "id":5078
                        },
                        {
                           "nombre":"",
                           "clave":"CBD",
                           "valor":"1980001790000001149871",
                           "id":5079
                        },
                        {
                           "nombre":"",
                           "clave":"CUD",
                           "valor":"30576124275",
                           "id":5080
                        },
                        {
                           "nombre":"",
                           "clave":"NOR",
                           "valor":"BVSA SD CONSULTATIO LI",
                           "id":5081
                        },
                        {
                           "nombre":"",
                           "clave":"T30",
                           "valor":"SI",
                           "id":5082
                        },
                        {
                           "nombre":"",
                           "clave":"T68",
                           "valor":"NO",
                           "id":5083
                        },
                        {
                           "nombre":"",
                           "clave":"IDB",
                           "valor":"LBO Granos   Valores",
                           "id":5084
                        }
                     ],
                     "numeroCobis":1975173,
                     "numeroCobisReverso":0,
                     "estadoCobis":"OK",
                     "mensajeCobis":null,
                     "numeroBcra":25933840,
                     "estadoBcra":"OK",
                     "mensajeBcra":"8000-La transferencia fue aceptada",
                     "fechaActualizacionBcra":null,
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T20:32:02.1002781",
                     "usuarioAprueba":"mepworker",
                     "fechaAprueba":"2021-04-30T20:32:02.1262445",
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":727
                  },
                  {
                     "cuentaCobis":"300100000126564",
                     "tipoCuentaCobis":"CTE",
                     "tipoMovimiento":"D",
                     "cuitCliente":"30576124275",
                     "nombreCliente":"BVSA SD DELTA PESOS FC",
                     "moneda":"80",
                     "monedaDescripcion":"PESOS",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"DL0",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"198",
                     "codigoCuentaDeudora":"198",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"14",
                     "codigoCuentaAcreedora":"14",
                     "descCuentaAcreedora":null,
                     "importe":10,
                     "instruccionDePago":[
                        {
                           "nombre":"CBU Beneficiario",
                           "clave":"CBA",
                           "valor":"0140000703100097136974",
                           "id":5065
                        },
                        {
                           "nombre":"CUIT / CUIL Beneficiario",
                           "clave":"CUA",
                           "valor":"30576124275",
                           "id":5066
                        },
                        {
                           "nombre":"Codigo de transferencia",
                           "clave":"T92",
                           "valor":"VAR",
                           "id":5067
                        },
                        {
                           "nombre":"Concepto",
                           "clave":"CNC",
                           "valor":"Transferencia CHS",
                           "id":5068
                        },
                        {
                           "nombre":"CBU ordenante",
                           "clave":"CBD",
                           "valor":"1980001730000001265647",
                           "id":5069
                        },
                        {
                           "nombre":"CUIT / CUIL Ordenante",
                           "clave":"CUD",
                           "valor":"30576124275",
                           "id":5070
                        },
                        {
                           "nombre":"Nombre ordenante",
                           "clave":"NOR",
                           "valor":"BVSA SD DELTA PESOS FC",
                           "id":5071
                        },
                        {
                           "nombre":"Declaro conocer a mi cliente",
                           "clave":"C01",
                           "valor":"SI",
                           "id":5072
                        },
                        {
                           "nombre":"Ordenante PEP-Pers Exp Politc",
                           "clave":"T68",
                           "valor":"NO",
                           "id":5073
                        },
                        {
                           "nombre":"Tipo de Cuenta Ordenante",
                           "clave":"T01",
                           "valor":"13",
                           "id":5074
                        }
                     ],
                     "numeroCobis":1975172,
                     "numeroCobisReverso":0,
                     "estadoCobis":"OK",
                     "mensajeCobis":null,
                     "numeroBcra":25933839,
                     "estadoBcra":"OK",
                     "mensajeBcra":"8000-La transferencia fue aceptada",
                     "fechaActualizacionBcra":null,
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T20:32:01.6368394",
                     "usuarioAprueba":"mepworker",
                     "fechaAprueba":"2021-04-30T20:32:01.6553945",
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":726
                  },
                  {
                     "cuentaCobis":"900100000114987",
                     "tipoCuentaCobis":"AHO",
                     "tipoMovimiento":"D",
                     "cuitCliente":"30576124275",
                     "nombreCliente":"BVSA SD CONSULTATIO LI",
                     "moneda":"64",
                     "monedaDescripcion":"DOLAR BILLETE",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"DR0",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"198",
                     "codigoCuentaDeudora":"80198",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"27",
                     "codigoCuentaAcreedora":"80027",
                     "descCuentaAcreedora":null,
                     "importe":10,
                     "instruccionDePago":[
                        {
                           "nombre":"",
                           "clave":"CBA",
                           "valor":"0270100040035702210017",
                           "id":5056
                        },
                        {
                           "nombre":"",
                           "clave":"CUA",
                           "valor":"30576124275",
                           "id":5057
                        },
                        {
                           "nombre":"",
                           "clave":"CTR",
                           "valor":"VAR",
                           "id":5058
                        },
                        {
                           "nombre":"",
                           "clave":"CNC",
                           "valor":"Transferencia CHS",
                           "id":5059
                        },
                        {
                           "nombre":"",
                           "clave":"CBD",
                           "valor":"1980001790000001149871",
                           "id":5060
                        },
                        {
                           "nombre":"",
                           "clave":"CUD",
                           "valor":"30576124275",
                           "id":5061
                        },
                        {
                           "nombre":"",
                           "clave":"NOR",
                           "valor":"BVSA SD CONSULTATIO LI",
                           "id":5062
                        },
                        {
                           "nombre":"",
                           "clave":"T30",
                           "valor":"SI",
                           "id":5063
                        },
                        {
                           "nombre":"",
                           "clave":"T68",
                           "valor":"NO",
                           "id":5064
                        }
                     ],
                     "numeroCobis":1975171,
                     "numeroCobisReverso":0,
                     "estadoCobis":"OK",
                     "mensajeCobis":null,
                     "numeroBcra":25933838,
                     "estadoBcra":"OK",
                     "mensajeBcra":"8000-La transferencia fue aceptada",
                     "fechaActualizacionBcra":null,
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T20:32:01.1308648",
                     "usuarioAprueba":"mepworker",
                     "fechaAprueba":"2021-04-30T20:32:01.1486337",
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":725
                  },
                  {
                     "cuentaCobis":"300100000074290",
                     "tipoCuentaCobis":"CTE",
                     "tipoMovimiento":"D",
                     "cuitCliente":"30576124275",
                     "nombreCliente":"BANCO DE VALORES SOC.D",
                     "moneda":"80",
                     "monedaDescripcion":"PESOS",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"DL2",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"198",
                     "codigoCuentaDeudora":"198",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"17",
                     "codigoCuentaAcreedora":"17",
                     "descCuentaAcreedora":null,
                     "importe":10000,
                     "instruccionDePago":[
                        {
                           "nombre":"CBU Beneficiario",
                           "clave":"CBA",
                           "valor":"0170478920000000146249",
                           "id":5046
                        },
                        {
                           "nombre":"CUIT / CUIL Beneficiario",
                           "clave":"CUA",
                           "valor":"30707796223",
                           "id":5047
                        },
                        {
                           "nombre":"Codigo de transferencia",
                           "clave":"CTR",
                           "valor":"VAR",
                           "id":5048
                        },
                        {
                           "nombre":"Concepto",
                           "clave":"CNC",
                           "valor":"Transferencia RAP",
                           "id":5049
                        },
                        {
                           "nombre":"CBU ordenante",
                           "clave":"CBD",
                           "valor":"1980001730000000742901",
                           "id":5050
                        },
                        {
                           "nombre":"CUIT / CUIL Ordenante",
                           "clave":"CUD",
                           "valor":"30576124275",
                           "id":5051
                        },
                        {
                           "nombre":"Nombre ordenante",
                           "clave":"NOR",
                           "valor":"BANCO DE VALORES SOC.D",
                           "id":5052
                        },
                        {
                           "nombre":"Declaro conocer a mi cliente",
                           "clave":"C01",
                           "valor":"SI",
                           "id":5053
                        },
                        {
                           "nombre":"Ordenante PEP-Pers Exp Politc",
                           "clave":"T68",
                           "valor":"NO",
                           "id":5054
                        },
                        {
                           "nombre":"Nombre Beneficiario",
                           "clave":"IDB",
                           "valor":"LBO Granos   Valores",
                           "id":5055
                        }
                     ],
                     "numeroCobis":1975170,
                     "numeroCobisReverso":0,
                     "estadoCobis":"OK",
                     "mensajeCobis":null,
                     "numeroBcra":25933837,
                     "estadoBcra":"OK",
                     "mensajeBcra":"8000-La transferencia fue aceptada",
                     "fechaActualizacionBcra":null,
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T20:32:00.6467617",
                     "usuarioAprueba":"mepworker",
                     "fechaAprueba":"2021-04-30T20:32:00.6660411",
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":724
                  },
                  {
                     "cuentaCobis":"300100000080589",
                     "tipoCuentaCobis":"CTE",
                     "tipoMovimiento":"D",
                     "cuitCliente":"30576124275",
                     "nombreCliente":"DELTA AHORRO FCI",
                     "moneda":"80",
                     "monedaDescripcion":"PESOS",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"DL0",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"198",
                     "codigoCuentaDeudora":"198",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"72",
                     "codigoCuentaAcreedora":"72",
                     "descCuentaAcreedora":null,
                     "importe":56000,
                     "instruccionDePago":[
                        {
                           "nombre":"CBU Beneficiario",
                           "clave":"CBA",
                           "valor":"0720000720000003534018",
                           "id":5036
                        },
                        {
                           "nombre":"CUIT / CUIL Beneficiario",
                           "clave":"CUA",
                           "valor":"30576124275",
                           "id":5037
                        },
                        {
                           "nombre":"Codigo de transferencia",
                           "clave":"T92",
                           "valor":"VAR",
                           "id":5038
                        },
                        {
                           "nombre":"Concepto",
                           "clave":"CNC",
                           "valor":"Transferencia RIO",
                           "id":5039
                        },
                        {
                           "nombre":"CBU ordenante",
                           "clave":"CBD",
                           "valor":"1980001730000000805897",
                           "id":5040
                        },
                        {
                           "nombre":"CUIT / CUIL Ordenante",
                           "clave":"CUD",
                           "valor":"30576124275",
                           "id":5041
                        },
                        {
                           "nombre":"Nombre ordenante",
                           "clave":"NOR",
                           "valor":"DELTA AHORRO FCI",
                           "id":5042
                        },
                        {
                           "nombre":"Declaro conocer a mi cliente",
                           "clave":"C01",
                           "valor":"SI",
                           "id":5043
                        },
                        {
                           "nombre":"Ordenante PEP-Pers Exp Politc",
                           "clave":"T68",
                           "valor":"NO",
                           "id":5044
                        },
                        {
                           "nombre":"Tipo de Cuenta Ordenante",
                           "clave":"T01",
                           "valor":"01",
                           "id":5045
                        }
                     ],
                     "numeroCobis":1975169,
                     "numeroCobisReverso":0,
                     "estadoCobis":"OK",
                     "mensajeCobis":null,
                     "numeroBcra":25933836,
                     "estadoBcra":"OK",
                     "mensajeBcra":"8000-La transferencia fue aceptada",
                     "fechaActualizacionBcra":null,
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T20:32:00.1452224",
                     "usuarioAprueba":"mepworker",
                     "fechaAprueba":"2021-04-30T20:32:00.173635",
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":723
                  },
                  {
                     "cuentaCobis":"300100000074290",
                     "tipoCuentaCobis":"CTE",
                     "tipoMovimiento":"D",
                     "cuitCliente":"30576124275",
                     "nombreCliente":"BANCO DE VALORES SOC.D",
                     "moneda":"80",
                     "monedaDescripcion":"PESOS",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"GC1",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"198",
                     "codigoCuentaDeudora":"198",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"7",
                     "codigoCuentaAcreedora":"7",
                     "descCuentaAcreedora":null,
                     "importe":200,
                     "instruccionDePago":[
                        {
                           "nombre":"Origen de los fondos",
                           "clave":"FON",
                           "valor":"2",
                           "id":5027
                        },
                        {
                           "nombre":"CUIT/CUIL/CDI - Ordenante",
                           "clave":"CUO",
                           "valor":"30576124275",
                           "id":5028
                        },
                        {
                           "nombre":"CBU - Ordenante",
                           "clave":"CBO",
                           "valor":"1980001730000000742901",
                           "id":5029
                        },
                        {
                           "nombre":"CBU Destino final",
                           "clave":"CBD",
                           "valor":"0070282130009750413691",
                           "id":5030
                        },
                        {
                           "nombre":"CUIT Destinatario final",
                           "clave":"CUB",
                           "valor":"30500001735",
                           "id":5031
                        },
                        {
                           "nombre":"Concepto",
                           "clave":"TXT",
                           "valor":"Transferencia MMKS",
                           "id":5032
                        },
                        {
                           "nombre":"Tipo de inversion",
                           "clave":"T45",
                           "valor":"01",
                           "id":5033
                        },
                        {
                           "nombre":"Declaro conocer a mi cliente",
                           "clave":"T30",
                           "valor":"SI",
                           "id":5034
                        },
                        {
                           "nombre":"Ordenante PEP-Pers Exp Politc",
                           "clave":"PEP",
                           "valor":"NO",
                           "id":5035
                        }
                     ],
                     "numeroCobis":1975168,
                     "numeroCobisReverso":0,
                     "estadoCobis":"OK",
                     "mensajeCobis":null,
                     "numeroBcra":25933835,
                     "estadoBcra":"OK",
                     "mensajeBcra":"8000-La transferencia fue aceptada",
                     "fechaActualizacionBcra":null,
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T20:31:59.5646076",
                     "usuarioAprueba":"mepworker",
                     "fechaAprueba":"2021-04-30T20:31:59.5867872",
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":722
                  },
                  {
                     "cuentaCobis":"300100000074290",
                     "tipoCuentaCobis":"CTE",
                     "tipoMovimiento":"D",
                     "cuitCliente":"30576124275",
                     "nombreCliente":"BANCO DE VALORES SOC.D",
                     "moneda":"80",
                     "monedaDescripcion":"PESOS",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"GC0",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"198",
                     "codigoCuentaDeudora":"198",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"72",
                     "codigoCuentaAcreedora":"72",
                     "descCuentaAcreedora":null,
                     "importe":1000000,
                     "instruccionDePago":[
                        {
                           "nombre":"CUIT Otorgante",
                           "clave":"CUD",
                           "valor":"30576124275",
                           "id":5021
                        },
                        {
                           "nombre":"CBU Otorgante",
                           "clave":"CBD",
                           "valor":"1980001730000000742901",
                           "id":5022
                        },
                        {
                           "nombre":"CUIT Beneficiario",
                           "clave":"CUA",
                           "valor":"30500008454",
                           "id":5023
                        },
                        {
                           "nombre":"Observaciones",
                           "clave":"TXT",
                           "valor":"Transferencia FX",
                           "id":5024
                        },
                        {
                           "nombre":"Declaro conocer a mi cliente",
                           "clave":"C01",
                           "valor":"SI",
                           "id":5025
                        },
                        {
                           "nombre":"Ordenante PEP-Pers Exp Politc",
                           "clave":"PEP",
                           "valor":"NO",
                           "id":5026
                        }
                     ],
                     "numeroCobis":1975167,
                     "numeroCobisReverso":0,
                     "estadoCobis":"OK",
                     "mensajeCobis":null,
                     "numeroBcra":25933834,
                     "estadoBcra":"OK",
                     "mensajeBcra":"8000-La transferencia fue aceptada",
                     "fechaActualizacionBcra":null,
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T20:31:59.0991037",
                     "usuarioAprueba":"mepworker",
                     "fechaAprueba":"2021-04-30T20:31:59.1186928",
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":721
                  },
                  {
                     "cuentaCobis":"300100000074290",
                     "tipoCuentaCobis":"CTE",
                     "tipoMovimiento":"D",
                     "cuitCliente":"30576124275",
                     "nombreCliente":"BANCO DE VALORES SOC.D",
                     "moneda":"80",
                     "monedaDescripcion":"PESOS",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"PF1",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"198",
                     "codigoCuentaDeudora":"198",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"7",
                     "codigoCuentaAcreedora":"7",
                     "descCuentaAcreedora":null,
                     "importe":1000,
                     "instruccionDePago":[
                        {
                           "nombre":"",
                           "clave":"TXR",
                           "valor":"1",
                           "id":5014
                        },
                        {
                           "nombre":"",
                           "clave":"CBD",
                           "valor":"1980001730000000742901",
                           "id":5015
                        },
                        {
                           "nombre":"",
                           "clave":"CUD",
                           "valor":"30576124275",
                           "id":5016
                        },
                        {
                           "nombre":"",
                           "clave":"AYN",
                           "valor":"Banco de Galicia",
                           "id":5017
                        },
                        {
                           "nombre":"",
                           "clave":"T30",
                           "valor":"SI",
                           "id":5018
                        },
                        {
                           "nombre":"",
                           "clave":"OBS",
                           "valor":"Transferencia CPF",
                           "id":5019
                        },
                        {
                           "nombre":"",
                           "clave":"PEP",
                           "valor":"NO",
                           "id":5020
                        }
                     ],
                     "numeroCobis":1975166,
                     "numeroCobisReverso":0,
                     "estadoCobis":"OK",
                     "mensajeCobis":null,
                     "numeroBcra":25933833,
                     "estadoBcra":"OK",
                     "mensajeBcra":"8000-La transferencia fue aceptada",
                     "fechaActualizacionBcra":null,
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T20:31:58.635461",
                     "usuarioAprueba":"mepworker",
                     "fechaAprueba":"2021-04-30T20:31:58.6547486",
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":720
                  },
                  {
                     "cuentaCobis":"300100000095080",
                     "tipoCuentaCobis":"CTE",
                     "tipoMovimiento":"D",
                     "cuitCliente":"30576124275",
                     "nombreCliente":"DELTA MULTIMERCADO I F",
                     "moneda":"80",
                     "monedaDescripcion":"PESOS",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"GC0",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"198",
                     "codigoCuentaDeudora":"198",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"901",
                     "codigoCuentaAcreedora":"901",
                     "descCuentaAcreedora":null,
                     "importe":200000,
                     "instruccionDePago":[
                        {
                           "nombre":"CUIT Otorgante",
                           "clave":"CUD",
                           "valor":"30576124275",
                           "id":5000
                        },
                        {
                           "nombre":"CBU Otorgante",
                           "clave":"CBD",
                           "valor":"1980001730000000950801",
                           "id":5001
                        },
                        {
                           "nombre":"CUIT Beneficiario",
                           "clave":"CUA",
                           "valor":"30554475910",
                           "id":5002
                        },
                        {
                           "nombre":"Observaciones",
                           "clave":"TXT",
                           "valor":"Transferencia RES",
                           "id":5003
                        },
                        {
                           "nombre":"Declaro conocer a mi cliente",
                           "clave":"C01",
                           "valor":"SI",
                           "id":5004
                        },
                        {
                           "nombre":"Ordenante PEP-Pers Exp Politc",
                           "clave":"PEP",
                           "valor":"NO",
                           "id":5005
                        }
                     ],
                     "numeroCobis":1975164,
                     "numeroCobisReverso":0,
                     "estadoCobis":"OK",
                     "mensajeCobis":null,
                     "numeroBcra":25933832,
                     "estadoBcra":"OK",
                     "mensajeBcra":"8000-La transferencia fue aceptada",
                     "fechaActualizacionBcra":null,
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T20:31:57.787972",
                     "usuarioAprueba":"mepworker",
                     "fechaAprueba":"2021-04-30T20:31:57.8068604",
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":718
                  },
                  {
                     "cuentaCobis":"900100000115140",
                     "tipoCuentaCobis":"AHO",
                     "tipoMovimiento":"D",
                     "cuitCliente":"30576124275",
                     "nombreCliente":"BALANZ AHORRO EN DOLAR",
                     "moneda":"64",
                     "monedaDescripcion":"DOLAR BILLETE",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"GC0",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"198",
                     "codigoCuentaDeudora":"80198",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"901",
                     "codigoCuentaAcreedora":"80901",
                     "descCuentaAcreedora":null,
                     "importe":500.45,
                     "instruccionDePago":[
                        {
                           "nombre":"CUIT Otorgante",
                           "clave":"CUD",
                           "valor":"30576124275",
                           "id":4986
                        },
                        {
                           "nombre":"CBU Otorgante",
                           "clave":"CBD",
                           "valor":"1980001790000001151403",
                           "id":4987
                        },
                        {
                           "nombre":"CUIT Beneficiario",
                           "clave":"CUA",
                           "valor":"30576124275",
                           "id":4988
                        },
                        {
                           "nombre":"Observaciones",
                           "clave":"TXT",
                           "valor":"Transferencia RES",
                           "id":4989
                        },
                        {
                           "nombre":"Declaro conocer a mi cliente",
                           "clave":"C01",
                           "valor":"SI",
                           "id":4990
                        },
                        {
                           "nombre":"Ordenante PEP-Pers Exp Politc",
                           "clave":"PEP",
                           "valor":"NO",
                           "id":4991
                        }
                     ],
                     "numeroCobis":1975162,
                     "numeroCobisReverso":0,
                     "estadoCobis":"OK",
                     "mensajeCobis":null,
                     "numeroBcra":25933831,
                     "estadoBcra":"OK",
                     "mensajeBcra":"8000-La transferencia fue aceptada",
                     "fechaActualizacionBcra":null,
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T20:31:56.8057763",
                     "usuarioAprueba":"mepworker",
                     "fechaAprueba":"2021-04-30T20:31:56.824819",
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":716
                  },
                  {
                     "cuentaCobis":"300100000113861",
                     "tipoCuentaCobis":"CTE",
                     "tipoMovimiento":"D",
                     "cuitCliente":"30576124275",
                     "nombreCliente":"BVSA SD ST GLOBAL FCI",
                     "moneda":"80",
                     "monedaDescripcion":"PESOS",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"PF1",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"198",
                     "codigoCuentaDeudora":"198",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"7",
                     "codigoCuentaAcreedora":"7",
                     "descCuentaAcreedora":null,
                     "importe":3000,
                     "instruccionDePago":[
                        {
                           "nombre":"",
                           "clave":"TXR",
                           "valor":"1",
                           "id":4979
                        },
                        {
                           "nombre":"",
                           "clave":"CBD",
                           "valor":"1980001730000001138615",
                           "id":4980
                        },
                        {
                           "nombre":"",
                           "clave":"CUD",
                           "valor":"30576124275",
                           "id":4981
                        },
                        {
                           "nombre":"",
                           "clave":"AYN",
                           "valor":"Banco de Galicia",
                           "id":4982
                        },
                        {
                           "nombre":"",
                           "clave":"T30",
                           "valor":"SI",
                           "id":4983
                        },
                        {
                           "nombre":"",
                           "clave":"OBS",
                           "valor":"Transferencia CPF",
                           "id":4984
                        },
                        {
                           "nombre":"",
                           "clave":"PEP",
                           "valor":"NO",
                           "id":4985
                        }
                     ],
                     "numeroCobis":1975161,
                     "numeroCobisReverso":0,
                     "estadoCobis":"OK",
                     "mensajeCobis":null,
                     "numeroBcra":25933830,
                     "estadoBcra":"OK",
                     "mensajeBcra":"8000-La transferencia fue aceptada",
                     "fechaActualizacionBcra":null,
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T20:31:56.2972952",
                     "usuarioAprueba":"mepworker",
                     "fechaAprueba":"2021-04-30T20:31:56.317169",
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":715
                  },
                  {
                     "cuentaCobis":"300100000122302",
                     "tipoCuentaCobis":"CTE",
                     "tipoMovimiento":"D",
                     "cuitCliente":"30576124275",
                     "nombreCliente":"ALLARIA RENTA MIXTA II",
                     "moneda":"80",
                     "monedaDescripcion":"PESOS",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"PF1",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"198",
                     "codigoCuentaDeudora":"198",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"7",
                     "codigoCuentaAcreedora":"7",
                     "descCuentaAcreedora":null,
                     "importe":1000,
                     "instruccionDePago":[
                        {
                           "nombre":"",
                           "clave":"TXR",
                           "valor":"1",
                           "id":4972
                        },
                        {
                           "nombre":"",
                           "clave":"CBD",
                           "valor":"1980001730000001223029",
                           "id":4973
                        },
                        {
                           "nombre":"",
                           "clave":"CUD",
                           "valor":"30576124275",
                           "id":4974
                        },
                        {
                           "nombre":"",
                           "clave":"AYN",
                           "valor":"Banco de Galicia",
                           "id":4975
                        },
                        {
                           "nombre":"",
                           "clave":"T30",
                           "valor":"SI",
                           "id":4976
                        },
                        {
                           "nombre":"",
                           "clave":"OBS",
                           "valor":"Transferencia CPF",
                           "id":4977
                        },
                        {
                           "nombre":"",
                           "clave":"PEP",
                           "valor":"NO",
                           "id":4978
                        }
                     ],
                     "numeroCobis":1975160,
                     "numeroCobisReverso":0,
                     "estadoCobis":"OK",
                     "mensajeCobis":null,
                     "numeroBcra":25933829,
                     "estadoBcra":"OK",
                     "mensajeBcra":"8000-La transferencia fue aceptada",
                     "fechaActualizacionBcra":null,
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T20:31:55.8298187",
                     "usuarioAprueba":"mepworker",
                     "fechaAprueba":"2021-04-30T20:31:55.8460687",
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":714
                  },
                  {
                     "cuentaCobis":"300100000122302",
                     "tipoCuentaCobis":"CTE",
                     "tipoMovimiento":"D",
                     "cuitCliente":"30576124275",
                     "nombreCliente":"ALLARIA RENTA MIXTA II",
                     "moneda":"80",
                     "monedaDescripcion":"PESOS",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"PF1",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"198",
                     "codigoCuentaDeudora":"198",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"7",
                     "codigoCuentaAcreedora":"7",
                     "descCuentaAcreedora":null,
                     "importe":1100,
                     "instruccionDePago":[
                        {
                           "nombre":"",
                           "clave":"TXR",
                           "valor":"1",
                           "id":4965
                        },
                        {
                           "nombre":"",
                           "clave":"CBD",
                           "valor":"1980001730000001223029",
                           "id":4966
                        },
                        {
                           "nombre":"",
                           "clave":"CUD",
                           "valor":"30576124275",
                           "id":4967
                        },
                        {
                           "nombre":"",
                           "clave":"AYN",
                           "valor":"Banco de Galicia",
                           "id":4968
                        },
                        {
                           "nombre":"",
                           "clave":"T30",
                           "valor":"SI",
                           "id":4969
                        },
                        {
                           "nombre":"",
                           "clave":"OBS",
                           "valor":"Transferencia CPF",
                           "id":4970
                        },
                        {
                           "nombre":"",
                           "clave":"PEP",
                           "valor":"NO",
                           "id":4971
                        }
                     ],
                     "numeroCobis":1975159,
                     "numeroCobisReverso":0,
                     "estadoCobis":"OK",
                     "mensajeCobis":null,
                     "numeroBcra":25933828,
                     "estadoBcra":"OK",
                     "mensajeBcra":"8000-La transferencia fue aceptada",
                     "fechaActualizacionBcra":null,
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T20:31:55.2843658",
                     "usuarioAprueba":"mepworker",
                     "fechaAprueba":"2021-04-30T20:31:55.3073203",
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":713
                  },
                  {
                     "cuentaCobis":"300100000122302",
                     "tipoCuentaCobis":"CTE",
                     "tipoMovimiento":"D",
                     "cuitCliente":"30576124275",
                     "nombreCliente":"ALLARIA RENTA MIXTA II",
                     "moneda":"80",
                     "monedaDescripcion":"PESOS",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"DL2",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"198",
                     "codigoCuentaDeudora":"198",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"72",
                     "codigoCuentaAcreedora":"72",
                     "descCuentaAcreedora":null,
                     "importe":1500,
                     "instruccionDePago":[
                        {
                           "nombre":"CBU Beneficiario",
                           "clave":"CBA",
                           "valor":"0720000720000001922240",
                           "id":4955
                        },
                        {
                           "nombre":"CUIT / CUIL Beneficiario",
                           "clave":"CUA",
                           "valor":"33645951269",
                           "id":4956
                        },
                        {
                           "nombre":"Codigo de transferencia",
                           "clave":"CTR",
                           "valor":"VAR",
                           "id":4957
                        },
                        {
                           "nombre":"Concepto",
                           "clave":"CNC",
                           "valor":"Transferencia CKA",
                           "id":4958
                        },
                        {
                           "nombre":"CBU ordenante",
                           "clave":"CBD",
                           "valor":"1980001730000001223029",
                           "id":4959
                        },
                        {
                           "nombre":"CUIT / CUIL Ordenante",
                           "clave":"CUD",
                           "valor":"30576124275",
                           "id":4960
                        },
                        {
                           "nombre":"Nombre ordenante",
                           "clave":"NOR",
                           "valor":"ALLARIA RENTA MIXTA II",
                           "id":4961
                        },
                        {
                           "nombre":"Declaro conocer a mi cliente",
                           "clave":"C01",
                           "valor":"SI",
                           "id":4962
                        },
                        {
                           "nombre":"Ordenante PEP-Pers Exp Politc",
                           "clave":"T68",
                           "valor":"NO",
                           "id":4963
                        },
                        {
                           "nombre":"Nombre Beneficiario",
                           "clave":"IDB",
                           "valor":"Banco Santander Rio SA",
                           "id":4964
                        }
                     ],
                     "numeroCobis":1975158,
                     "numeroCobisReverso":0,
                     "estadoCobis":"OK",
                     "mensajeCobis":null,
                     "numeroBcra":25933827,
                     "estadoBcra":"OK",
                     "mensajeBcra":"8000-La transferencia fue aceptada",
                     "fechaActualizacionBcra":null,
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T20:31:54.774999",
                     "usuarioAprueba":"mepworker",
                     "fechaAprueba":"2021-04-30T20:31:54.7969698",
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":712
                  },
                  {
                     "cuentaCobis":"300100000122302",
                     "tipoCuentaCobis":"CTE",
                     "tipoMovimiento":"D",
                     "cuitCliente":"30576124275",
                     "nombreCliente":"ALLARIA RENTA MIXTA II",
                     "moneda":"80",
                     "monedaDescripcion":"PESOS",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"GC0",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"198",
                     "codigoCuentaDeudora":"198",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"285",
                     "codigoCuentaAcreedora":"285",
                     "descCuentaAcreedora":null,
                     "importe":150,
                     "instruccionDePago":[
                        {
                           "nombre":"CUIT Otorgante",
                           "clave":"CUD",
                           "valor":"30576124275",
                           "id":4949
                        },
                        {
                           "nombre":"CBU Otorgante",
                           "clave":"CBD",
                           "valor":"1980001730000001223029",
                           "id":4950
                        },
                        {
                           "nombre":"CUIT Beneficiario",
                           "clave":"CUA",
                           "valor":"30500010084",
                           "id":4951
                        },
                        {
                           "nombre":"Observaciones",
                           "clave":"TXT",
                           "valor":"Transferencia PIN",
                           "id":4952
                        },
                        {
                           "nombre":"Declaro conocer a mi cliente",
                           "clave":"C01",
                           "valor":"SI",
                           "id":4953
                        },
                        {
                           "nombre":"Ordenante PEP-Pers Exp Politc",
                           "clave":"PEP",
                           "valor":"NO",
                           "id":4954
                        }
                     ],
                     "numeroCobis":1975157,
                     "numeroCobisReverso":0,
                     "estadoCobis":"OK",
                     "mensajeCobis":null,
                     "numeroBcra":25933826,
                     "estadoBcra":"OK",
                     "mensajeBcra":"8000-La transferencia fue aceptada",
                     "fechaActualizacionBcra":null,
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T20:31:54.2933528",
                     "usuarioAprueba":"mepworker",
                     "fechaAprueba":"2021-04-30T20:31:54.314818",
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":711
                  },
                  {
                     "cuentaCobis":"300100000110022",
                     "tipoCuentaCobis":"CTE",
                     "tipoMovimiento":"D",
                     "cuitCliente":"30576124275",
                     "nombreCliente":"DELTA GESTION 3 FCI",
                     "moneda":"80",
                     "monedaDescripcion":"PESOS",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"GC0",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"198",
                     "codigoCuentaDeudora":"198",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"285",
                     "codigoCuentaAcreedora":"285",
                     "descCuentaAcreedora":null,
                     "importe":154,
                     "instruccionDePago":[
                        {
                           "nombre":"CUIT Otorgante",
                           "clave":"CUD",
                           "valor":"30576124275",
                           "id":4943
                        },
                        {
                           "nombre":"CBU Otorgante",
                           "clave":"CBD",
                           "valor":"1980001730000001100229",
                           "id":4944
                        },
                        {
                           "nombre":"CUIT Beneficiario",
                           "clave":"CUA",
                           "valor":"30500010084",
                           "id":4945
                        },
                        {
                           "nombre":"Observaciones",
                           "clave":"TXT",
                           "valor":"Transferencia PIN",
                           "id":4946
                        },
                        {
                           "nombre":"Declaro conocer a mi cliente",
                           "clave":"C01",
                           "valor":"SI",
                           "id":4947
                        },
                        {
                           "nombre":"Ordenante PEP-Pers Exp Politc",
                           "clave":"PEP",
                           "valor":"NO",
                           "id":4948
                        }
                     ],
                     "numeroCobis":1975156,
                     "numeroCobisReverso":0,
                     "estadoCobis":"OK",
                     "mensajeCobis":null,
                     "numeroBcra":25933825,
                     "estadoBcra":"OK",
                     "mensajeBcra":"8000-La transferencia fue aceptada",
                     "fechaActualizacionBcra":null,
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T20:31:53.7739913",
                     "usuarioAprueba":"mepworker",
                     "fechaAprueba":"2021-04-30T20:31:53.7910948",
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":710
                  },
                  {
                     "cuentaCobis":"300100000122302",
                     "tipoCuentaCobis":"CTE",
                     "tipoMovimiento":"D",
                     "cuitCliente":"30576124275",
                     "nombreCliente":"ALLARIA RENTA MIXTA II",
                     "moneda":"80",
                     "monedaDescripcion":"PESOS",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"GC1",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"198",
                     "codigoCuentaDeudora":"198",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"299",
                     "codigoCuentaAcreedora":"299",
                     "descCuentaAcreedora":null,
                     "importe":45,
                     "instruccionDePago":[
                        {
                           "nombre":"Origen de los fondos",
                           "clave":"FON",
                           "valor":"2",
                           "id":4934
                        },
                        {
                           "nombre":"CUIT/CUIL/CDI - Ordenante",
                           "clave":"CUO",
                           "valor":"30576124275",
                           "id":4935
                        },
                        {
                           "nombre":"CBU - Ordenante",
                           "clave":"CBO",
                           "valor":"1980001730000001223029",
                           "id":4936
                        },
                        {
                           "nombre":"CBU Destino final",
                           "clave":"CBD",
                           "valor":"2990000000002382850000",
                           "id":4937
                        },
                        {
                           "nombre":"CUIT Destinatario final",
                           "clave":"CUB",
                           "valor":"30604731018",
                           "id":4938
                        },
                        {
                           "nombre":"Concepto",
                           "clave":"TXT",
                           "valor":"Transferencia MMKS",
                           "id":4939
                        },
                        {
                           "nombre":"Tipo de inversion",
                           "clave":"T45",
                           "valor":"01",
                           "id":4940
                        },
                        {
                           "nombre":"Declaro conocer a mi cliente",
                           "clave":"T30",
                           "valor":"SI",
                           "id":4941
                        },
                        {
                           "nombre":"Ordenante PEP-Pers Exp Politc",
                           "clave":"PEP",
                           "valor":"NO",
                           "id":4942
                        }
                     ],
                     "numeroCobis":1975155,
                     "numeroCobisReverso":0,
                     "estadoCobis":"OK",
                     "mensajeCobis":null,
                     "numeroBcra":25933824,
                     "estadoBcra":"OK",
                     "mensajeBcra":"8000-La transferencia fue aceptada",
                     "fechaActualizacionBcra":null,
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T20:31:53.1834351",
                     "usuarioAprueba":"mepworker",
                     "fechaAprueba":"2021-04-30T20:31:53.2047664",
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":709
                  },
                  {
                     "cuentaCobis":"900100000114987",
                     "tipoCuentaCobis":"AHO",
                     "tipoMovimiento":"D",
                     "cuitCliente":"30576124275",
                     "nombreCliente":"BVSA SD CONSULTATIO LI",
                     "moneda":"64",
                     "monedaDescripcion":"DOLAR BILLETE",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"DR2",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"198",
                     "codigoCuentaDeudora":"80198",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"285",
                     "codigoCuentaAcreedora":"80285",
                     "descCuentaAcreedora":null,
                     "importe":500,
                     "instruccionDePago":[
                        {
                           "nombre":"",
                           "clave":"CBA",
                           "valor":"2850761520094706639624",
                           "id":4846
                        },
                        {
                           "nombre":"",
                           "clave":"CUA",
                           "valor":"30707796223",
                           "id":4847
                        },
                        {
                           "nombre":"",
                           "clave":"CTR",
                           "valor":"VAR",
                           "id":4848
                        },
                        {
                           "nombre":"",
                           "clave":"CNC",
                           "valor":"Transferencia RAP",
                           "id":4849
                        },
                        {
                           "nombre":"",
                           "clave":"CBD",
                           "valor":"1980001790000001149871",
                           "id":4850
                        },
                        {
                           "nombre":"",
                           "clave":"CUD",
                           "valor":"30576124275",
                           "id":4851
                        },
                        {
                           "nombre":"",
                           "clave":"NOR",
                           "valor":"BVSA SD CONSULTATIO LI",
                           "id":4852
                        },
                        {
                           "nombre":"",
                           "clave":"T30",
                           "valor":"SI",
                           "id":4853
                        },
                        {
                           "nombre":"",
                           "clave":"T68",
                           "valor":"NO",
                           "id":4854
                        },
                        {
                           "nombre":"",
                           "clave":"IDB",
                           "valor":"LBO Granos   Valores",
                           "id":4855
                        }
                     ],
                     "numeroCobis":1975173,
                     "numeroCobisReverso":0,
                     "estadoCobis":"OK",
                     "mensajeCobis":null,
                     "numeroBcra":25933819,
                     "estadoBcra":"OK",
                     "mensajeBcra":"8000-La transferencia fue aceptada",
                     "fechaActualizacionBcra":null,
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T15:06:28.9708856",
                     "usuarioAprueba":"mepworker",
                     "fechaAprueba":"2021-04-30T15:06:28.9998307",
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":698
                  },
                  {
                     "cuentaCobis":"300100000126564",
                     "tipoCuentaCobis":"CTE",
                     "tipoMovimiento":"D",
                     "cuitCliente":"30576124275",
                     "nombreCliente":"BVSA SD DELTA PESOS FC",
                     "moneda":"80",
                     "monedaDescripcion":"PESOS",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"DL0",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"198",
                     "codigoCuentaDeudora":"198",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"14",
                     "codigoCuentaAcreedora":"14",
                     "descCuentaAcreedora":null,
                     "importe":10,
                     "instruccionDePago":[
                        {
                           "nombre":"CBU Beneficiario",
                           "clave":"CBA",
                           "valor":"0140000703100097136974",
                           "id":4836
                        },
                        {
                           "nombre":"CUIT / CUIL Beneficiario",
                           "clave":"CUA",
                           "valor":"30576124275",
                           "id":4837
                        },
                        {
                           "nombre":"Codigo de transferencia",
                           "clave":"T92",
                           "valor":"VAR",
                           "id":4838
                        },
                        {
                           "nombre":"Concepto",
                           "clave":"CNC",
                           "valor":"Transferencia CHS",
                           "id":4839
                        },
                        {
                           "nombre":"CBU ordenante",
                           "clave":"CBD",
                           "valor":"1980001730000001265647",
                           "id":4840
                        },
                        {
                           "nombre":"CUIT / CUIL Ordenante",
                           "clave":"CUD",
                           "valor":"30576124275",
                           "id":4841
                        },
                        {
                           "nombre":"Nombre ordenante",
                           "clave":"NOR",
                           "valor":"BVSA SD DELTA PESOS FC",
                           "id":4842
                        },
                        {
                           "nombre":"Declaro conocer a mi cliente",
                           "clave":"C01",
                           "valor":"SI",
                           "id":4843
                        },
                        {
                           "nombre":"Ordenante PEP-Pers Exp Politc",
                           "clave":"T68",
                           "valor":"NO",
                           "id":4844
                        },
                        {
                           "nombre":"Tipo de Cuenta Ordenante",
                           "clave":"T01",
                           "valor":"13",
                           "id":4845
                        }
                     ],
                     "numeroCobis":1975172,
                     "numeroCobisReverso":0,
                     "estadoCobis":"OK",
                     "mensajeCobis":null,
                     "numeroBcra":25933818,
                     "estadoBcra":"OK",
                     "mensajeBcra":"8000-La transferencia fue aceptada",
                     "fechaActualizacionBcra":null,
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T15:06:28.4316296",
                     "usuarioAprueba":"mepworker",
                     "fechaAprueba":"2021-04-30T15:06:28.4591605",
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":697
                  },
                  {
                     "cuentaCobis":"900100000114987",
                     "tipoCuentaCobis":"AHO",
                     "tipoMovimiento":"D",
                     "cuitCliente":"30576124275",
                     "nombreCliente":"BVSA SD CONSULTATIO LI",
                     "moneda":"64",
                     "monedaDescripcion":"DOLAR BILLETE",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"DR0",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"198",
                     "codigoCuentaDeudora":"80198",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"27",
                     "codigoCuentaAcreedora":"80027",
                     "descCuentaAcreedora":null,
                     "importe":10,
                     "instruccionDePago":[
                        {
                           "nombre":"",
                           "clave":"CBA",
                           "valor":"0270100040035702210017",
                           "id":4827
                        },
                        {
                           "nombre":"",
                           "clave":"CUA",
                           "valor":"30576124275",
                           "id":4828
                        },
                        {
                           "nombre":"",
                           "clave":"CTR",
                           "valor":"VAR",
                           "id":4829
                        },
                        {
                           "nombre":"",
                           "clave":"CNC",
                           "valor":"Transferencia CHS",
                           "id":4830
                        },
                        {
                           "nombre":"",
                           "clave":"CBD",
                           "valor":"1980001790000001149871",
                           "id":4831
                        },
                        {
                           "nombre":"",
                           "clave":"CUD",
                           "valor":"30576124275",
                           "id":4832
                        },
                        {
                           "nombre":"",
                           "clave":"NOR",
                           "valor":"BVSA SD CONSULTATIO LI",
                           "id":4833
                        },
                        {
                           "nombre":"",
                           "clave":"T30",
                           "valor":"SI",
                           "id":4834
                        },
                        {
                           "nombre":"",
                           "clave":"T68",
                           "valor":"NO",
                           "id":4835
                        }
                     ],
                     "numeroCobis":1975171,
                     "numeroCobisReverso":0,
                     "estadoCobis":"OK",
                     "mensajeCobis":null,
                     "numeroBcra":25933817,
                     "estadoBcra":"OK",
                     "mensajeBcra":"8000-La transferencia fue aceptada",
                     "fechaActualizacionBcra":null,
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T15:06:27.9111817",
                     "usuarioAprueba":"mepworker",
                     "fechaAprueba":"2021-04-30T15:06:27.932099",
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":696
                  },
                  {
                     "cuentaCobis":"300100000074290",
                     "tipoCuentaCobis":"CTE",
                     "tipoMovimiento":"D",
                     "cuitCliente":"30576124275",
                     "nombreCliente":"BANCO DE VALORES SOC.D",
                     "moneda":"80",
                     "monedaDescripcion":"PESOS",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"DL2",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"198",
                     "codigoCuentaDeudora":"198",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"17",
                     "codigoCuentaAcreedora":"17",
                     "descCuentaAcreedora":null,
                     "importe":10000,
                     "instruccionDePago":[
                        {
                           "nombre":"CBU Beneficiario",
                           "clave":"CBA",
                           "valor":"0170478920000000146249",
                           "id":4817
                        },
                        {
                           "nombre":"CUIT / CUIL Beneficiario",
                           "clave":"CUA",
                           "valor":"30707796223",
                           "id":4818
                        },
                        {
                           "nombre":"Codigo de transferencia",
                           "clave":"CTR",
                           "valor":"VAR",
                           "id":4819
                        },
                        {
                           "nombre":"Concepto",
                           "clave":"CNC",
                           "valor":"Transferencia RAP",
                           "id":4820
                        },
                        {
                           "nombre":"CBU ordenante",
                           "clave":"CBD",
                           "valor":"1980001730000000742901",
                           "id":4821
                        },
                        {
                           "nombre":"CUIT / CUIL Ordenante",
                           "clave":"CUD",
                           "valor":"30576124275",
                           "id":4822
                        },
                        {
                           "nombre":"Nombre ordenante",
                           "clave":"NOR",
                           "valor":"BANCO DE VALORES SOC.D",
                           "id":4823
                        },
                        {
                           "nombre":"Declaro conocer a mi cliente",
                           "clave":"C01",
                           "valor":"SI",
                           "id":4824
                        },
                        {
                           "nombre":"Ordenante PEP-Pers Exp Politc",
                           "clave":"T68",
                           "valor":"NO",
                           "id":4825
                        },
                        {
                           "nombre":"Nombre Beneficiario",
                           "clave":"IDB",
                           "valor":"LBO Granos   Valores",
                           "id":4826
                        }
                     ],
                     "numeroCobis":1975170,
                     "numeroCobisReverso":0,
                     "estadoCobis":"OK",
                     "mensajeCobis":null,
                     "numeroBcra":25933816,
                     "estadoBcra":"OK",
                     "mensajeBcra":"8000-La transferencia fue aceptada",
                     "fechaActualizacionBcra":null,
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T15:06:27.4435633",
                     "usuarioAprueba":"mepworker",
                     "fechaAprueba":"2021-04-30T15:06:27.4683142",
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":695
                  },
                  {
                     "cuentaCobis":"300100000080589",
                     "tipoCuentaCobis":"CTE",
                     "tipoMovimiento":"D",
                     "cuitCliente":"30576124275",
                     "nombreCliente":"DELTA AHORRO FCI",
                     "moneda":"80",
                     "monedaDescripcion":"PESOS",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"DL0",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"198",
                     "codigoCuentaDeudora":"198",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"72",
                     "codigoCuentaAcreedora":"72",
                     "descCuentaAcreedora":null,
                     "importe":56000,
                     "instruccionDePago":[
                        {
                           "nombre":"CBU Beneficiario",
                           "clave":"CBA",
                           "valor":"0720000720000003534018",
                           "id":4807
                        },
                        {
                           "nombre":"CUIT / CUIL Beneficiario",
                           "clave":"CUA",
                           "valor":"30576124275",
                           "id":4808
                        },
                        {
                           "nombre":"Codigo de transferencia",
                           "clave":"T92",
                           "valor":"VAR",
                           "id":4809
                        },
                        {
                           "nombre":"Concepto",
                           "clave":"CNC",
                           "valor":"Transferencia RIO",
                           "id":4810
                        },
                        {
                           "nombre":"CBU ordenante",
                           "clave":"CBD",
                           "valor":"1980001730000000805897",
                           "id":4811
                        },
                        {
                           "nombre":"CUIT / CUIL Ordenante",
                           "clave":"CUD",
                           "valor":"30576124275",
                           "id":4812
                        },
                        {
                           "nombre":"Nombre ordenante",
                           "clave":"NOR",
                           "valor":"DELTA AHORRO FCI",
                           "id":4813
                        },
                        {
                           "nombre":"Declaro conocer a mi cliente",
                           "clave":"C01",
                           "valor":"SI",
                           "id":4814
                        },
                        {
                           "nombre":"Ordenante PEP-Pers Exp Politc",
                           "clave":"T68",
                           "valor":"NO",
                           "id":4815
                        },
                        {
                           "nombre":"Tipo de Cuenta Ordenante",
                           "clave":"T01",
                           "valor":"01",
                           "id":4816
                        }
                     ],
                     "numeroCobis":1975169,
                     "numeroCobisReverso":0,
                     "estadoCobis":"OK",
                     "mensajeCobis":null,
                     "numeroBcra":25933815,
                     "estadoBcra":"OK",
                     "mensajeBcra":"8000-La transferencia fue aceptada",
                     "fechaActualizacionBcra":null,
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T15:06:26.9188451",
                     "usuarioAprueba":"mepworker",
                     "fechaAprueba":"2021-04-30T15:06:26.9541122",
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":694
                  },
                  {
                     "cuentaCobis":"300100000074290",
                     "tipoCuentaCobis":"CTE",
                     "tipoMovimiento":"D",
                     "cuitCliente":"30576124275",
                     "nombreCliente":"BANCO DE VALORES SOC.D",
                     "moneda":"80",
                     "monedaDescripcion":"PESOS",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"GC1",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"198",
                     "codigoCuentaDeudora":"198",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"7",
                     "codigoCuentaAcreedora":"7",
                     "descCuentaAcreedora":null,
                     "importe":200,
                     "instruccionDePago":[
                        {
                           "nombre":"Origen de los fondos",
                           "clave":"FON",
                           "valor":"2",
                           "id":4798
                        },
                        {
                           "nombre":"CUIT/CUIL/CDI - Ordenante",
                           "clave":"CUO",
                           "valor":"30576124275",
                           "id":4799
                        },
                        {
                           "nombre":"CBU - Ordenante",
                           "clave":"CBO",
                           "valor":"1980001730000000742901",
                           "id":4800
                        },
                        {
                           "nombre":"CBU Destino final",
                           "clave":"CBD",
                           "valor":"0070282130009750413691",
                           "id":4801
                        },
                        {
                           "nombre":"CUIT Destinatario final",
                           "clave":"CUB",
                           "valor":"30500001735",
                           "id":4802
                        },
                        {
                           "nombre":"Concepto",
                           "clave":"TXT",
                           "valor":"Transferencia MMKS",
                           "id":4803
                        },
                        {
                           "nombre":"Tipo de inversion",
                           "clave":"T45",
                           "valor":"01",
                           "id":4804
                        },
                        {
                           "nombre":"Declaro conocer a mi cliente",
                           "clave":"T30",
                           "valor":"SI",
                           "id":4805
                        },
                        {
                           "nombre":"Ordenante PEP-Pers Exp Politc",
                           "clave":"PEP",
                           "valor":"NO",
                           "id":4806
                        }
                     ],
                     "numeroCobis":1975168,
                     "numeroCobisReverso":0,
                     "estadoCobis":"OK",
                     "mensajeCobis":null,
                     "numeroBcra":25933814,
                     "estadoBcra":"OK",
                     "mensajeBcra":"8000-La transferencia fue aceptada",
                     "fechaActualizacionBcra":null,
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T15:06:26.1798628",
                     "usuarioAprueba":"mepworker",
                     "fechaAprueba":"2021-04-30T15:06:26.2113415",
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":693
                  },
                  {
                     "cuentaCobis":"300100000074290",
                     "tipoCuentaCobis":"CTE",
                     "tipoMovimiento":"D",
                     "cuitCliente":"30576124275",
                     "nombreCliente":"BANCO DE VALORES SOC.D",
                     "moneda":"80",
                     "monedaDescripcion":"PESOS",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"GC0",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"198",
                     "codigoCuentaDeudora":"198",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"72",
                     "codigoCuentaAcreedora":"72",
                     "descCuentaAcreedora":null,
                     "importe":1000000,
                     "instruccionDePago":[
                        {
                           "nombre":"CUIT Otorgante",
                           "clave":"CUD",
                           "valor":"30576124275",
                           "id":4792
                        },
                        {
                           "nombre":"CBU Otorgante",
                           "clave":"CBD",
                           "valor":"1980001730000000742901",
                           "id":4793
                        },
                        {
                           "nombre":"CUIT Beneficiario",
                           "clave":"CUA",
                           "valor":"30500008454",
                           "id":4794
                        },
                        {
                           "nombre":"Observaciones",
                           "clave":"TXT",
                           "valor":"Transferencia FX",
                           "id":4795
                        },
                        {
                           "nombre":"Declaro conocer a mi cliente",
                           "clave":"C01",
                           "valor":"SI",
                           "id":4796
                        },
                        {
                           "nombre":"Ordenante PEP-Pers Exp Politc",
                           "clave":"PEP",
                           "valor":"NO",
                           "id":4797
                        }
                     ],
                     "numeroCobis":1975167,
                     "numeroCobisReverso":0,
                     "estadoCobis":"OK",
                     "mensajeCobis":null,
                     "numeroBcra":25933813,
                     "estadoBcra":"OK",
                     "mensajeBcra":"8000-La transferencia fue aceptada",
                     "fechaActualizacionBcra":null,
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T15:06:25.6786692",
                     "usuarioAprueba":"mepworker",
                     "fechaAprueba":"2021-04-30T15:06:25.7187249",
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":692
                  },
                  {
                     "cuentaCobis":"300100000074290",
                     "tipoCuentaCobis":"CTE",
                     "tipoMovimiento":"D",
                     "cuitCliente":"30576124275",
                     "nombreCliente":"BANCO DE VALORES SOC.D",
                     "moneda":"80",
                     "monedaDescripcion":"PESOS",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"PF1",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"198",
                     "codigoCuentaDeudora":"198",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"7",
                     "codigoCuentaAcreedora":"7",
                     "descCuentaAcreedora":null,
                     "importe":1000,
                     "instruccionDePago":[
                        {
                           "nombre":"",
                           "clave":"TXR",
                           "valor":"1",
                           "id":4785
                        },
                        {
                           "nombre":"",
                           "clave":"CBD",
                           "valor":"1980001730000000742901",
                           "id":4786
                        },
                        {
                           "nombre":"",
                           "clave":"CUD",
                           "valor":"30576124275",
                           "id":4787
                        },
                        {
                           "nombre":"",
                           "clave":"AYN",
                           "valor":"Banco de Galicia",
                           "id":4788
                        },
                        {
                           "nombre":"",
                           "clave":"T30",
                           "valor":"SI",
                           "id":4789
                        },
                        {
                           "nombre":"",
                           "clave":"OBS",
                           "valor":"Transferencia CPF",
                           "id":4790
                        },
                        {
                           "nombre":"",
                           "clave":"PEP",
                           "valor":"NO",
                           "id":4791
                        }
                     ],
                     "numeroCobis":1975166,
                     "numeroCobisReverso":0,
                     "estadoCobis":"OK",
                     "mensajeCobis":null,
                     "numeroBcra":25933812,
                     "estadoBcra":"OK",
                     "mensajeBcra":"8000-La transferencia fue aceptada",
                     "fechaActualizacionBcra":null,
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T15:06:25.2494028",
                     "usuarioAprueba":"mepworker",
                     "fechaAprueba":"2021-04-30T15:06:25.2691256",
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":691
                  },
                  {
                     "cuentaCobis":"300100000095080",
                     "tipoCuentaCobis":"CTE",
                     "tipoMovimiento":"D",
                     "cuitCliente":"30576124275",
                     "nombreCliente":"DELTA MULTIMERCADO I F",
                     "moneda":"80",
                     "monedaDescripcion":"PESOS",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"GC0",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"198",
                     "codigoCuentaDeudora":"198",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"901",
                     "codigoCuentaAcreedora":"901",
                     "descCuentaAcreedora":null,
                     "importe":200000,
                     "instruccionDePago":[
                        {
                           "nombre":"CUIT Otorgante",
                           "clave":"CUD",
                           "valor":"30576124275",
                           "id":4771
                        },
                        {
                           "nombre":"CBU Otorgante",
                           "clave":"CBD",
                           "valor":"1980001730000000950801",
                           "id":4772
                        },
                        {
                           "nombre":"CUIT Beneficiario",
                           "clave":"CUA",
                           "valor":"30554475910",
                           "id":4773
                        },
                        {
                           "nombre":"Observaciones",
                           "clave":"TXT",
                           "valor":"Transferencia RES",
                           "id":4774
                        },
                        {
                           "nombre":"Declaro conocer a mi cliente",
                           "clave":"C01",
                           "valor":"SI",
                           "id":4775
                        },
                        {
                           "nombre":"Ordenante PEP-Pers Exp Politc",
                           "clave":"PEP",
                           "valor":"NO",
                           "id":4776
                        }
                     ],
                     "numeroCobis":1975164,
                     "numeroCobisReverso":0,
                     "estadoCobis":"OK",
                     "mensajeCobis":null,
                     "numeroBcra":25933811,
                     "estadoBcra":"OK",
                     "mensajeBcra":"8000-La transferencia fue aceptada",
                     "fechaActualizacionBcra":null,
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T15:06:24.3705237",
                     "usuarioAprueba":"mepworker",
                     "fechaAprueba":"2021-04-30T15:06:24.4104438",
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":689
                  },
                  {
                     "cuentaCobis":"900100000115140",
                     "tipoCuentaCobis":"AHO",
                     "tipoMovimiento":"D",
                     "cuitCliente":"30576124275",
                     "nombreCliente":"BALANZ AHORRO EN DOLAR",
                     "moneda":"64",
                     "monedaDescripcion":"DOLAR BILLETE",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"GC0",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"198",
                     "codigoCuentaDeudora":"80198",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"901",
                     "codigoCuentaAcreedora":"80901",
                     "descCuentaAcreedora":null,
                     "importe":500.45,
                     "instruccionDePago":[
                        {
                           "nombre":"CUIT Otorgante",
                           "clave":"CUD",
                           "valor":"30576124275",
                           "id":4757
                        },
                        {
                           "nombre":"CBU Otorgante",
                           "clave":"CBD",
                           "valor":"1980001790000001151403",
                           "id":4758
                        },
                        {
                           "nombre":"CUIT Beneficiario",
                           "clave":"CUA",
                           "valor":"30576124275",
                           "id":4759
                        },
                        {
                           "nombre":"Observaciones",
                           "clave":"TXT",
                           "valor":"Transferencia RES",
                           "id":4760
                        },
                        {
                           "nombre":"Declaro conocer a mi cliente",
                           "clave":"C01",
                           "valor":"SI",
                           "id":4761
                        },
                        {
                           "nombre":"Ordenante PEP-Pers Exp Politc",
                           "clave":"PEP",
                           "valor":"NO",
                           "id":4762
                        }
                     ],
                     "numeroCobis":1975162,
                     "numeroCobisReverso":0,
                     "estadoCobis":"OK",
                     "mensajeCobis":null,
                     "numeroBcra":25933810,
                     "estadoBcra":"OK",
                     "mensajeBcra":"8000-La transferencia fue aceptada",
                     "fechaActualizacionBcra":null,
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T15:06:23.4066918",
                     "usuarioAprueba":"mepworker",
                     "fechaAprueba":"2021-04-30T15:06:23.4713252",
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":687
                  },
                  {
                     "cuentaCobis":"300100000113861",
                     "tipoCuentaCobis":"CTE",
                     "tipoMovimiento":"D",
                     "cuitCliente":"30576124275",
                     "nombreCliente":"BVSA SD ST GLOBAL FCI",
                     "moneda":"80",
                     "monedaDescripcion":"PESOS",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"PF1",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"198",
                     "codigoCuentaDeudora":"198",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"7",
                     "codigoCuentaAcreedora":"7",
                     "descCuentaAcreedora":null,
                     "importe":3000,
                     "instruccionDePago":[
                        {
                           "nombre":"",
                           "clave":"TXR",
                           "valor":"1",
                           "id":4750
                        },
                        {
                           "nombre":"",
                           "clave":"CBD",
                           "valor":"1980001730000001138615",
                           "id":4751
                        },
                        {
                           "nombre":"",
                           "clave":"CUD",
                           "valor":"30576124275",
                           "id":4752
                        },
                        {
                           "nombre":"",
                           "clave":"AYN",
                           "valor":"Banco de Galicia",
                           "id":4753
                        },
                        {
                           "nombre":"",
                           "clave":"T30",
                           "valor":"SI",
                           "id":4754
                        },
                        {
                           "nombre":"",
                           "clave":"OBS",
                           "valor":"Transferencia CPF",
                           "id":4755
                        },
                        {
                           "nombre":"",
                           "clave":"PEP",
                           "valor":"NO",
                           "id":4756
                        }
                     ],
                     "numeroCobis":1975161,
                     "numeroCobisReverso":0,
                     "estadoCobis":"OK",
                     "mensajeCobis":null,
                     "numeroBcra":25933809,
                     "estadoBcra":"OK",
                     "mensajeBcra":"8000-La transferencia fue aceptada",
                     "fechaActualizacionBcra":null,
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T15:06:22.8144166",
                     "usuarioAprueba":"mepworker",
                     "fechaAprueba":"2021-04-30T15:06:22.8452361",
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":686
                  },
                  {
                     "cuentaCobis":"300100000122302",
                     "tipoCuentaCobis":"CTE",
                     "tipoMovimiento":"D",
                     "cuitCliente":"30576124275",
                     "nombreCliente":"ALLARIA RENTA MIXTA II",
                     "moneda":"80",
                     "monedaDescripcion":"PESOS",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"PF1",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"198",
                     "codigoCuentaDeudora":"198",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"7",
                     "codigoCuentaAcreedora":"7",
                     "descCuentaAcreedora":null,
                     "importe":1000,
                     "instruccionDePago":[
                        {
                           "nombre":"",
                           "clave":"TXR",
                           "valor":"1",
                           "id":4743
                        },
                        {
                           "nombre":"",
                           "clave":"CBD",
                           "valor":"1980001730000001223029",
                           "id":4744
                        },
                        {
                           "nombre":"",
                           "clave":"CUD",
                           "valor":"30576124275",
                           "id":4745
                        },
                        {
                           "nombre":"",
                           "clave":"AYN",
                           "valor":"Banco de Galicia",
                           "id":4746
                        },
                        {
                           "nombre":"",
                           "clave":"T30",
                           "valor":"SI",
                           "id":4747
                        },
                        {
                           "nombre":"",
                           "clave":"OBS",
                           "valor":"Transferencia CPF",
                           "id":4748
                        },
                        {
                           "nombre":"",
                           "clave":"PEP",
                           "valor":"NO",
                           "id":4749
                        }
                     ],
                     "numeroCobis":1975160,
                     "numeroCobisReverso":0,
                     "estadoCobis":"OK",
                     "mensajeCobis":null,
                     "numeroBcra":25933808,
                     "estadoBcra":"OK",
                     "mensajeBcra":"8000-La transferencia fue aceptada",
                     "fechaActualizacionBcra":null,
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T15:06:22.2870948",
                     "usuarioAprueba":"mepworker",
                     "fechaAprueba":"2021-04-30T15:06:22.3140917",
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":685
                  },
                  {
                     "cuentaCobis":"300100000122302",
                     "tipoCuentaCobis":"CTE",
                     "tipoMovimiento":"D",
                     "cuitCliente":"30576124275",
                     "nombreCliente":"ALLARIA RENTA MIXTA II",
                     "moneda":"80",
                     "monedaDescripcion":"PESOS",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"PF1",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"198",
                     "codigoCuentaDeudora":"198",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"7",
                     "codigoCuentaAcreedora":"7",
                     "descCuentaAcreedora":null,
                     "importe":1100,
                     "instruccionDePago":[
                        {
                           "nombre":"",
                           "clave":"TXR",
                           "valor":"1",
                           "id":4736
                        },
                        {
                           "nombre":"",
                           "clave":"CBD",
                           "valor":"1980001730000001223029",
                           "id":4737
                        },
                        {
                           "nombre":"",
                           "clave":"CUD",
                           "valor":"30576124275",
                           "id":4738
                        },
                        {
                           "nombre":"",
                           "clave":"AYN",
                           "valor":"Banco de Galicia",
                           "id":4739
                        },
                        {
                           "nombre":"",
                           "clave":"T30",
                           "valor":"SI",
                           "id":4740
                        },
                        {
                           "nombre":"",
                           "clave":"OBS",
                           "valor":"Transferencia CPF",
                           "id":4741
                        },
                        {
                           "nombre":"",
                           "clave":"PEP",
                           "valor":"NO",
                           "id":4742
                        }
                     ],
                     "numeroCobis":1975159,
                     "numeroCobisReverso":0,
                     "estadoCobis":"OK",
                     "mensajeCobis":null,
                     "numeroBcra":25933807,
                     "estadoBcra":"OK",
                     "mensajeBcra":"8000-La transferencia fue aceptada",
                     "fechaActualizacionBcra":null,
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T15:06:21.6996439",
                     "usuarioAprueba":"mepworker",
                     "fechaAprueba":"2021-04-30T15:06:21.731706",
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":684
                  },
                  {
                     "cuentaCobis":"300100000122302",
                     "tipoCuentaCobis":"CTE",
                     "tipoMovimiento":"D",
                     "cuitCliente":"30576124275",
                     "nombreCliente":"ALLARIA RENTA MIXTA II",
                     "moneda":"80",
                     "monedaDescripcion":"PESOS",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"DL2",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"198",
                     "codigoCuentaDeudora":"198",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"72",
                     "codigoCuentaAcreedora":"72",
                     "descCuentaAcreedora":null,
                     "importe":1500,
                     "instruccionDePago":[
                        {
                           "nombre":"CBU Beneficiario",
                           "clave":"CBA",
                           "valor":"0720000720000001922240",
                           "id":4726
                        },
                        {
                           "nombre":"CUIT / CUIL Beneficiario",
                           "clave":"CUA",
                           "valor":"33645951269",
                           "id":4727
                        },
                        {
                           "nombre":"Codigo de transferencia",
                           "clave":"CTR",
                           "valor":"VAR",
                           "id":4728
                        },
                        {
                           "nombre":"Concepto",
                           "clave":"CNC",
                           "valor":"Transferencia CKA",
                           "id":4729
                        },
                        {
                           "nombre":"CBU ordenante",
                           "clave":"CBD",
                           "valor":"1980001730000001223029",
                           "id":4730
                        },
                        {
                           "nombre":"CUIT / CUIL Ordenante",
                           "clave":"CUD",
                           "valor":"30576124275",
                           "id":4731
                        },
                        {
                           "nombre":"Nombre ordenante",
                           "clave":"NOR",
                           "valor":"ALLARIA RENTA MIXTA II",
                           "id":4732
                        },
                        {
                           "nombre":"Declaro conocer a mi cliente",
                           "clave":"C01",
                           "valor":"SI",
                           "id":4733
                        },
                        {
                           "nombre":"Ordenante PEP-Pers Exp Politc",
                           "clave":"T68",
                           "valor":"NO",
                           "id":4734
                        },
                        {
                           "nombre":"Nombre Beneficiario",
                           "clave":"IDB",
                           "valor":"Banco Santander Rio SA",
                           "id":4735
                        }
                     ],
                     "numeroCobis":1975158,
                     "numeroCobisReverso":0,
                     "estadoCobis":"OK",
                     "mensajeCobis":null,
                     "numeroBcra":25933806,
                     "estadoBcra":"OK",
                     "mensajeBcra":"8000-La transferencia fue aceptada",
                     "fechaActualizacionBcra":null,
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T15:06:21.2883601",
                     "usuarioAprueba":"mepworker",
                     "fechaAprueba":"2021-04-30T15:06:21.3103424",
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":683
                  },
                  {
                     "cuentaCobis":"300100000122302",
                     "tipoCuentaCobis":"CTE",
                     "tipoMovimiento":"D",
                     "cuitCliente":"30576124275",
                     "nombreCliente":"ALLARIA RENTA MIXTA II",
                     "moneda":"80",
                     "monedaDescripcion":"PESOS",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"GC0",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"198",
                     "codigoCuentaDeudora":"198",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"285",
                     "codigoCuentaAcreedora":"285",
                     "descCuentaAcreedora":null,
                     "importe":150,
                     "instruccionDePago":[
                        {
                           "nombre":"CUIT Otorgante",
                           "clave":"CUD",
                           "valor":"30576124275",
                           "id":4720
                        },
                        {
                           "nombre":"CBU Otorgante",
                           "clave":"CBD",
                           "valor":"1980001730000001223029",
                           "id":4721
                        },
                        {
                           "nombre":"CUIT Beneficiario",
                           "clave":"CUA",
                           "valor":"30500010084",
                           "id":4722
                        },
                        {
                           "nombre":"Observaciones",
                           "clave":"TXT",
                           "valor":"Transferencia PIN",
                           "id":4723
                        },
                        {
                           "nombre":"Declaro conocer a mi cliente",
                           "clave":"C01",
                           "valor":"SI",
                           "id":4724
                        },
                        {
                           "nombre":"Ordenante PEP-Pers Exp Politc",
                           "clave":"PEP",
                           "valor":"NO",
                           "id":4725
                        }
                     ],
                     "numeroCobis":1975157,
                     "numeroCobisReverso":0,
                     "estadoCobis":"OK",
                     "mensajeCobis":null,
                     "numeroBcra":25933805,
                     "estadoBcra":"OK",
                     "mensajeBcra":"8000-La transferencia fue aceptada",
                     "fechaActualizacionBcra":null,
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T15:06:20.8566547",
                     "usuarioAprueba":"mepworker",
                     "fechaAprueba":"2021-04-30T15:06:20.8872118",
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":682
                  },
                  {
                     "cuentaCobis":"300100000110022",
                     "tipoCuentaCobis":"CTE",
                     "tipoMovimiento":"D",
                     "cuitCliente":"30576124275",
                     "nombreCliente":"DELTA GESTION 3 FCI",
                     "moneda":"80",
                     "monedaDescripcion":"PESOS",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"GC0",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"198",
                     "codigoCuentaDeudora":"198",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"285",
                     "codigoCuentaAcreedora":"285",
                     "descCuentaAcreedora":null,
                     "importe":154,
                     "instruccionDePago":[
                        {
                           "nombre":"CUIT Otorgante",
                           "clave":"CUD",
                           "valor":"30576124275",
                           "id":4714
                        },
                        {
                           "nombre":"CBU Otorgante",
                           "clave":"CBD",
                           "valor":"1980001730000001100229",
                           "id":4715
                        },
                        {
                           "nombre":"CUIT Beneficiario",
                           "clave":"CUA",
                           "valor":"30500010084",
                           "id":4716
                        },
                        {
                           "nombre":"Observaciones",
                           "clave":"TXT",
                           "valor":"Transferencia PIN",
                           "id":4717
                        },
                        {
                           "nombre":"Declaro conocer a mi cliente",
                           "clave":"C01",
                           "valor":"SI",
                           "id":4718
                        },
                        {
                           "nombre":"Ordenante PEP-Pers Exp Politc",
                           "clave":"PEP",
                           "valor":"NO",
                           "id":4719
                        }
                     ],
                     "numeroCobis":1975156,
                     "numeroCobisReverso":0,
                     "estadoCobis":"OK",
                     "mensajeCobis":null,
                     "numeroBcra":25933804,
                     "estadoBcra":"OK",
                     "mensajeBcra":"8000-La transferencia fue aceptada",
                     "fechaActualizacionBcra":null,
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T15:06:20.4034457",
                     "usuarioAprueba":"mepworker",
                     "fechaAprueba":"2021-04-30T15:06:20.4482245",
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":681
                  },
                  {
                     "cuentaCobis":"300100000122302",
                     "tipoCuentaCobis":"CTE",
                     "tipoMovimiento":"D",
                     "cuitCliente":"30576124275",
                     "nombreCliente":"ALLARIA RENTA MIXTA II",
                     "moneda":"80",
                     "monedaDescripcion":"PESOS",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"GC1",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"198",
                     "codigoCuentaDeudora":"198",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"299",
                     "codigoCuentaAcreedora":"299",
                     "descCuentaAcreedora":null,
                     "importe":45,
                     "instruccionDePago":[
                        {
                           "nombre":"Origen de los fondos",
                           "clave":"FON",
                           "valor":"2",
                           "id":4705
                        },
                        {
                           "nombre":"CUIT/CUIL/CDI - Ordenante",
                           "clave":"CUO",
                           "valor":"30576124275",
                           "id":4706
                        },
                        {
                           "nombre":"CBU - Ordenante",
                           "clave":"CBO",
                           "valor":"1980001730000001223029",
                           "id":4707
                        },
                        {
                           "nombre":"CBU Destino final",
                           "clave":"CBD",
                           "valor":"2990000000002382850000",
                           "id":4708
                        },
                        {
                           "nombre":"CUIT Destinatario final",
                           "clave":"CUB",
                           "valor":"30604731018",
                           "id":4709
                        },
                        {
                           "nombre":"Concepto",
                           "clave":"TXT",
                           "valor":"Transferencia MMKS",
                           "id":4710
                        },
                        {
                           "nombre":"Tipo de inversion",
                           "clave":"T45",
                           "valor":"01",
                           "id":4711
                        },
                        {
                           "nombre":"Declaro conocer a mi cliente",
                           "clave":"T30",
                           "valor":"SI",
                           "id":4712
                        },
                        {
                           "nombre":"Ordenante PEP-Pers Exp Politc",
                           "clave":"PEP",
                           "valor":"NO",
                           "id":4713
                        }
                     ],
                     "numeroCobis":1975155,
                     "numeroCobisReverso":0,
                     "estadoCobis":"OK",
                     "mensajeCobis":null,
                     "numeroBcra":25933803,
                     "estadoBcra":"OK",
                     "mensajeBcra":"8000-La transferencia fue aceptada",
                     "fechaActualizacionBcra":null,
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T15:06:19.9260553",
                     "usuarioAprueba":"mepworker",
                     "fechaAprueba":"2021-04-30T15:06:19.9554822",
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":680
                  },
                  {
                     "cuentaCobis":"300100000113618",
                     "tipoCuentaCobis":"CTE",
                     "tipoMovimiento":"D",
                     "cuitCliente":"33711585619",
                     "nombreCliente":"GMA CAPITAL S.A.",
                     "moneda":"80",
                     "monedaDescripcion":"PESOS",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"DL2",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"198",
                     "codigoCuentaDeudora":"198",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"254",
                     "codigoCuentaAcreedora":"254",
                     "descCuentaAcreedora":null,
                     "importe":0.05,
                     "instruccionDePago":[
                        {
                           "nombre":"CBU Beneficiario",
                           "clave":"CBA",
                           "valor":"2540000911000001034088",
                           "id":4617
                        },
                        {
                           "nombre":"CUIT / CUIL Beneficiario",
                           "clave":"CUA",
                           "valor":"20050649505",
                           "id":4618
                        },
                        {
                           "nombre":"Codigo de transferencia",
                           "clave":"CTR",
                           "valor":"HAB",
                           "id":4619
                        },
                        {
                           "nombre":"Concepto",
                           "clave":"CNC",
                           "valor":"PRUEBA1",
                           "id":4620
                        },
                        {
                           "nombre":"CBU ordenante",
                           "clave":"CBD",
                           "valor":"1980001730000001136183",
                           "id":4621
                        },
                        {
                           "nombre":"CUIT / CUIL Ordenante",
                           "clave":"CUD",
                           "valor":"33711585619",
                           "id":4622
                        },
                        {
                           "nombre":"Nombre ordenante",
                           "clave":"NOR",
                           "valor":"GMA CAPITAL S.A.",
                           "id":4623
                        },
                        {
                           "nombre":"Declaro conocer a mi cliente",
                           "clave":"C01",
                           "valor":"SI",
                           "id":4624
                        },
                        {
                           "nombre":"Ordenante PEP-Pers Exp Politc",
                           "clave":"T68",
                           "valor":"NO",
                           "id":4625
                        },
                        {
                           "nombre":"Nombre Beneficiario",
                           "clave":"IDB",
                           "valor":"TRAPES JULIO CESAR",
                           "id":4626
                        }
                     ],
                     "numeroCobis":1975179,
                     "numeroCobisReverso":0,
                     "estadoCobis":"OK",
                     "mensajeCobis":null,
                     "numeroBcra":25933802,
                     "estadoBcra":"OK",
                     "mensajeBcra":"8000-La transferencia fue aceptada",
                     "fechaActualizacionBcra":null,
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T15:03:13.5533453",
                     "usuarioAprueba":"mepworker",
                     "fechaAprueba":"2021-04-30T15:03:13.5986495",
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":669
                  },
                  {
                     "cuentaCobis":"800100000131164 ",
                     "tipoCuentaCobis":"AHO",
                     "tipoMovimiento":"C",
                     "cuitCliente":"20332068637",
                     "nombreCliente":"ORTIZ PABLO FEDERICO                                            ",
                     "moneda":"2",
                     "monedaDescripcion":"DOLAR",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"GC2",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"80008",
                     "codigoCuentaDeudora":"80088",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"198",
                     "codigoCuentaAcreedora":"80198",
                     "descCuentaAcreedora":null,
                     "importe":7700,
                     "instruccionDePago":[
                        {
                           "nombre":"Destino de fondos",
                           "clave":"FON",
                           "valor":"1",
                           "id":4587
                        },
                        {
                           "nombre":"CUIT - Ordenante",
                           "clave":"CUO",
                           "valor":"30712399623",
                           "id":4588
                        },
                        {
                           "nombre":"CBU - Ordenante",
                           "clave":"CBO",
                           "valor":"2660018710000000111114",
                           "id":4589
                        },
                        {
                           "nombre":"CBU Destino final",
                           "clave":"CBD",
                           "valor":"1980001780000001311642",
                           "id":4590
                        },
                        {
                           "nombre":"CUIT Destinatario final",
                           "clave":"CUB",
                           "valor":"20332068637",
                           "id":4591
                        },
                        {
                           "nombre":"Concepto",
                           "clave":"TXT",
                           "valor":"Concepto",
                           "id":4592
                        },
                        {
                           "nombre":"Tipo de inversion",
                           "clave":"T45",
                           "valor":"01",
                           "id":4593
                        },
                        {
                           "nombre":"Declaro conocer a mi cliente",
                           "clave":"T30",
                           "valor":"SI",
                           "id":4594
                        }
                     ],
                     "numeroCobis":4535941,
                     "numeroCobisReverso":0,
                     "estadoCobis":"OK",
                     "mensajeCobis":null,
                     "numeroBcra":25933370,
                     "estadoBcra":"OK",
                     "mensajeBcra":"",
                     "fechaActualizacionBcra":"26/04/2021 14:14:22",
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T14:49:38.5931016",
                     "usuarioAprueba":"mepworker",
                     "fechaAprueba":"2021-04-30T14:49:38.6167815",
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":665
                  },
                  {
                     "cuentaCobis":"400100000131171 ",
                     "tipoCuentaCobis":"AHO",
                     "tipoMovimiento":"C",
                     "cuitCliente":"20332068637",
                     "nombreCliente":"ORTIZ PABLO FEDERICO                                            ",
                     "moneda":"80",
                     "monedaDescripcion":"PESOS",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"DL2",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"80008",
                     "codigoCuentaDeudora":"80008",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"198",
                     "codigoCuentaAcreedora":"198",
                     "descCuentaAcreedora":null,
                     "importe":3300,
                     "instruccionDePago":[
                        {
                           "nombre":"CBU Beneficiario",
                           "clave":"CBA",
                           "valor":"1980001740000001311712",
                           "id":4199
                        },
                        {
                           "nombre":"CUIT / CUIL Beneficiario",
                           "clave":"CUA",
                           "valor":"20332068637",
                           "id":4200
                        },
                        {
                           "nombre":"Codigo de transferencia",
                           "clave":"CTR",
                           "valor":"EXP",
                           "id":4201
                        },
                        {
                           "nombre":"Concepto",
                           "clave":"CNC",
                           "valor":"prueba dl2 mpc",
                           "id":4202
                        },
                        {
                           "nombre":"CBU ordenante",
                           "clave":"CBD",
                           "valor":"2660018710000000111114",
                           "id":4203
                        },
                        {
                           "nombre":"CUIT / CUIL Ordenante",
                           "clave":"CUD",
                           "valor":"27187514598",
                           "id":4204
                        },
                        {
                           "nombre":"Nombre ordenante",
                           "clave":"NOR",
                           "valor":"Juan Ferrara",
                           "id":4205
                        },
                        {
                           "nombre":"Declaro conocer a mi cliente",
                           "clave":"C01",
                           "valor":"SI",
                           "id":4206
                        },
                        {
                           "nombre":"Ordenante PEP-Pers Exp Politc",
                           "clave":"T68",
                           "valor":"SI",
                           "id":4207
                        },
                        {
                           "nombre":"Nombre Beneficiario",
                           "clave":"IDB",
                           "valor":"Diego Gonzalez",
                           "id":4208
                        }
                     ],
                     "numeroCobis":4535934,
                     "numeroCobisReverso":0,
                     "estadoCobis":"OK",
                     "mensajeCobis":null,
                     "numeroBcra":25933373,
                     "estadoBcra":"OK",
                     "mensajeBcra":"",
                     "fechaActualizacionBcra":"26/04/2021 14:17:23",
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T14:49:14.8483513",
                     "usuarioAprueba":"mepworker",
                     "fechaAprueba":"2021-04-30T14:49:14.8733883",
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":605
                  },
                  {
                     "cuentaCobis":"400100000131171 ",
                     "tipoCuentaCobis":"AHO",
                     "tipoMovimiento":"C",
                     "cuitCliente":"20332068637",
                     "nombreCliente":"ORTIZ PABLO FEDERICO                                            ",
                     "moneda":"80",
                     "monedaDescripcion":"PESOS",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"DL2",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"80008",
                     "codigoCuentaDeudora":"80008",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"198",
                     "codigoCuentaAcreedora":"198",
                     "descCuentaAcreedora":null,
                     "importe":3000,
                     "instruccionDePago":[
                        {
                           "nombre":"CBU Beneficiario",
                           "clave":"CBA",
                           "valor":"1980001740000001311712",
                           "id":4189
                        },
                        {
                           "nombre":"CUIT / CUIL Beneficiario",
                           "clave":"CUA",
                           "valor":"20332068637",
                           "id":4190
                        },
                        {
                           "nombre":"Codigo de transferencia",
                           "clave":"CTR",
                           "valor":"EXP",
                           "id":4191
                        },
                        {
                           "nombre":"Concepto",
                           "clave":"CNC",
                           "valor":"prueba dl2 mpc",
                           "id":4192
                        },
                        {
                           "nombre":"CBU ordenante",
                           "clave":"CBD",
                           "valor":"2660018710000000111114",
                           "id":4193
                        },
                        {
                           "nombre":"CUIT / CUIL Ordenante",
                           "clave":"CUD",
                           "valor":"27187514598",
                           "id":4194
                        },
                        {
                           "nombre":"Nombre ordenante",
                           "clave":"NOR",
                           "valor":"Juan Ferrara",
                           "id":4195
                        },
                        {
                           "nombre":"Declaro conocer a mi cliente",
                           "clave":"C01",
                           "valor":"SI",
                           "id":4196
                        },
                        {
                           "nombre":"Ordenante PEP-Pers Exp Politc",
                           "clave":"T68",
                           "valor":"SI",
                           "id":4197
                        },
                        {
                           "nombre":"Nombre Beneficiario",
                           "clave":"IDB",
                           "valor":"Diego Gonzalez",
                           "id":4198
                        }
                     ],
                     "numeroCobis":4535929,
                     "numeroCobisReverso":0,
                     "estadoCobis":"OK",
                     "mensajeCobis":null,
                     "numeroBcra":25933372,
                     "estadoBcra":"OK",
                     "mensajeBcra":"",
                     "fechaActualizacionBcra":"26/04/2021 14:17:01",
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T14:49:14.5468749",
                     "usuarioAprueba":"mepworker",
                     "fechaAprueba":"2021-04-30T14:49:14.5961888",
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":604
                  },
                  {
                     "cuentaCobis":"400100000131171 ",
                     "tipoCuentaCobis":"AHO",
                     "tipoMovimiento":"C",
                     "cuitCliente":"20332068637",
                     "nombreCliente":"ORTIZ PABLO FEDERICO                                            ",
                     "moneda":"80",
                     "monedaDescripcion":"PESOS",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"GC2",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"80008",
                     "codigoCuentaDeudora":"80008",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"198",
                     "codigoCuentaAcreedora":"198",
                     "descCuentaAcreedora":null,
                     "importe":78000,
                     "instruccionDePago":[
                        {
                           "nombre":"Destino de fondos",
                           "clave":"FON",
                           "valor":"1",
                           "id":4172
                        },
                        {
                           "nombre":"CUIT - Ordenante",
                           "clave":"CUO",
                           "valor":"30712399623",
                           "id":4173
                        },
                        {
                           "nombre":"CBU - Ordenante",
                           "clave":"CBO",
                           "valor":"2660018710000000111114",
                           "id":4174
                        },
                        {
                           "nombre":"CBU Destino final",
                           "clave":"CBD",
                           "valor":"1980001740000001311712",
                           "id":4175
                        },
                        {
                           "nombre":"CUIT Destinatario final",
                           "clave":"CUB",
                           "valor":"20332068637",
                           "id":4176
                        },
                        {
                           "nombre":"Concepto",
                           "clave":"TXT",
                           "valor":"Concepto",
                           "id":4177
                        },
                        {
                           "nombre":"Tipo de inversion",
                           "clave":"T45",
                           "valor":"01",
                           "id":4178
                        },
                        {
                           "nombre":"Declaro conocer a mi cliente",
                           "clave":"T30",
                           "valor":"SI",
                           "id":4179
                        }
                     ],
                     "numeroCobis":4535924,
                     "numeroCobisReverso":0,
                     "estadoCobis":"OK",
                     "mensajeCobis":null,
                     "numeroBcra":25933366,
                     "estadoBcra":"OK",
                     "mensajeBcra":"",
                     "fechaActualizacionBcra":"26/04/2021 14:02:10",
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T14:49:13.9364014",
                     "usuarioAprueba":"mepworker",
                     "fechaAprueba":"2021-04-30T14:49:13.9812359",
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":602
                  },
                  {
                     "cuentaCobis":"400100000131171 ",
                     "tipoCuentaCobis":"AHO",
                     "tipoMovimiento":"C",
                     "cuitCliente":"20332068637",
                     "nombreCliente":"ORTIZ PABLO FEDERICO                                            ",
                     "moneda":"80",
                     "monedaDescripcion":"PESOS",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"DL0",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"80008",
                     "codigoCuentaDeudora":"80008",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"198",
                     "codigoCuentaAcreedora":"198",
                     "descCuentaAcreedora":null,
                     "importe":3000,
                     "instruccionDePago":[
                        {
                           "nombre":"CBU Beneficiario",
                           "clave":"CBA",
                           "valor":"1980001740000001311712",
                           "id":4162
                        },
                        {
                           "nombre":"CUIT / CUIL Beneficiario",
                           "clave":"CUA",
                           "valor":"20332068637",
                           "id":4163
                        },
                        {
                           "nombre":"Codigo de transferencia",
                           "clave":"T92",
                           "valor":"ALQ",
                           "id":4164
                        },
                        {
                           "nombre":"Concepto",
                           "clave":"CNC",
                           "valor":"Concepto de prueba 1",
                           "id":4165
                        },
                        {
                           "nombre":"CBU ordenante",
                           "clave":"CBD",
                           "valor":"2660018710000000111114",
                           "id":4166
                        },
                        {
                           "nombre":"CUIT / CUIL Ordenante",
                           "clave":"CUD",
                           "valor":"20332068637",
                           "id":4167
                        },
                        {
                           "nombre":"Nombre ordenante",
                           "clave":"NOR",
                           "valor":"Juan Ferrara",
                           "id":4168
                        },
                        {
                           "nombre":"Declaro conocer a mi cliente",
                           "clave":"C01",
                           "valor":"SI",
                           "id":4169
                        },
                        {
                           "nombre":"Ordenante PEP-Pers Exp Politc",
                           "clave":"T68",
                           "valor":"SI",
                           "id":4170
                        },
                        {
                           "nombre":"Tipo de Cuenta Ordenante",
                           "clave":"T01",
                           "valor":"01",
                           "id":4171
                        }
                     ],
                     "numeroCobis":4535993,
                     "numeroCobisReverso":0,
                     "estadoCobis":"OK",
                     "mensajeCobis":null,
                     "numeroBcra":25933362,
                     "estadoBcra":"OK",
                     "mensajeBcra":"",
                     "fechaActualizacionBcra":"26/04/2021 13:58:32",
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T14:49:13.5979958",
                     "usuarioAprueba":"mepworker",
                     "fechaAprueba":"2021-04-30T14:49:13.6317265",
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":601
                  },
                  {
                     "cuentaCobis":"400100000131171 ",
                     "tipoCuentaCobis":"AHO",
                     "tipoMovimiento":"C",
                     "cuitCliente":"20332068637",
                     "nombreCliente":"ORTIZ PABLO FEDERICO                                            ",
                     "moneda":"80",
                     "monedaDescripcion":"PESOS",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"DL0",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"80008",
                     "codigoCuentaDeudora":"80008",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"198",
                     "codigoCuentaAcreedora":"198",
                     "descCuentaAcreedora":null,
                     "importe":30000,
                     "instruccionDePago":[
                        {
                           "nombre":"CBU Beneficiario",
                           "clave":"CBA",
                           "valor":"1980001740000001311712",
                           "id":4152
                        },
                        {
                           "nombre":"CUIT / CUIL Beneficiario",
                           "clave":"CUA",
                           "valor":"20332068637",
                           "id":4153
                        },
                        {
                           "nombre":"Codigo de transferencia",
                           "clave":"T92",
                           "valor":"ALQ",
                           "id":4154
                        },
                        {
                           "nombre":"Concepto",
                           "clave":"CNC",
                           "valor":"Concepto de prueba 1",
                           "id":4155
                        },
                        {
                           "nombre":"CBU ordenante",
                           "clave":"CBD",
                           "valor":"2660018710000000111114",
                           "id":4156
                        },
                        {
                           "nombre":"CUIT / CUIL Ordenante",
                           "clave":"CUD",
                           "valor":"20332068637",
                           "id":4157
                        },
                        {
                           "nombre":"Nombre ordenante",
                           "clave":"NOR",
                           "valor":"Juan Ferrara",
                           "id":4158
                        },
                        {
                           "nombre":"Declaro conocer a mi cliente",
                           "clave":"C01",
                           "valor":"SI",
                           "id":4159
                        },
                        {
                           "nombre":"Ordenante PEP-Pers Exp Politc",
                           "clave":"T68",
                           "valor":"SI",
                           "id":4160
                        },
                        {
                           "nombre":"Tipo de Cuenta Ordenante",
                           "clave":"T01",
                           "valor":"01",
                           "id":4161
                        }
                     ],
                     "numeroCobis":4535998,
                     "numeroCobisReverso":0,
                     "estadoCobis":"OK",
                     "mensajeCobis":null,
                     "numeroBcra":25933361,
                     "estadoBcra":"OK",
                     "mensajeBcra":"",
                     "fechaActualizacionBcra":"26/04/2021 13:58:14",
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T14:49:13.2767205",
                     "usuarioAprueba":"mepworker",
                     "fechaAprueba":"2021-04-30T14:49:13.3186839",
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":600
                  },
                  {
                     "cuentaCobis":"400100000131171 ",
                     "tipoCuentaCobis":"AHO",
                     "tipoMovimiento":"C",
                     "cuitCliente":"20332068637",
                     "nombreCliente":"ORTIZ PABLO FEDERICO                                            ",
                     "moneda":"80",
                     "monedaDescripcion":"PESOS",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"DL1",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"80008",
                     "codigoCuentaDeudora":"80008",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"198",
                     "codigoCuentaAcreedora":"198",
                     "descCuentaAcreedora":null,
                     "importe":4000.5,
                     "instruccionDePago":[
                        {
                           "nombre":"CBU Beneficiario",
                           "clave":"CBA",
                           "valor":"1980001740000001311712",
                           "id":4142
                        },
                        {
                           "nombre":"CUIT / CUIL Beneficiario",
                           "clave":"CUA",
                           "valor":"20332068637",
                           "id":4143
                        },
                        {
                           "nombre":"Codigo de transferencia",
                           "clave":"CTR",
                           "valor":"EXP",
                           "id":4144
                        },
                        {
                           "nombre":"Concepto",
                           "clave":"CNC",
                           "valor":"prueba 198 dl1",
                           "id":4145
                        },
                        {
                           "nombre":"CBU ordenante",
                           "clave":"CBD",
                           "valor":"2660018710000000111114",
                           "id":4146
                        },
                        {
                           "nombre":"CUIT / CUIL Ordenante",
                           "clave":"CUD",
                           "valor":"27187514598",
                           "id":4147
                        },
                        {
                           "nombre":"Nombre ordenante",
                           "clave":"NOR",
                           "valor":"Juan Ferrara",
                           "id":4148
                        },
                        {
                           "nombre":"Declaro conocer a mi cliente",
                           "clave":"C01",
                           "valor":"SI",
                           "id":4149
                        },
                        {
                           "nombre":"Ordenante PEP-Pers Exp Politc",
                           "clave":"T68",
                           "valor":"SI",
                           "id":4150
                        },
                        {
                           "nombre":"Nombre beneficiario",
                           "clave":"IDB",
                           "valor":"Diego Gonzalez",
                           "id":4151
                        }
                     ],
                     "numeroCobis":4535915,
                     "numeroCobisReverso":0,
                     "estadoCobis":"OK",
                     "mensajeCobis":null,
                     "numeroBcra":25933359,
                     "estadoBcra":"OK",
                     "mensajeBcra":"",
                     "fechaActualizacionBcra":"26/04/2021 13:52:47",
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T14:49:12.8716498",
                     "usuarioAprueba":"mepworker",
                     "fechaAprueba":"2021-04-30T14:49:12.9651195",
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":599
                  },
                  {
                     "cuentaCobis":"400100000131171 ",
                     "tipoCuentaCobis":"AHO",
                     "tipoMovimiento":"C",
                     "cuitCliente":"20332068637",
                     "nombreCliente":"ORTIZ PABLO FEDERICO                                            ",
                     "moneda":"80",
                     "monedaDescripcion":"PESOS",
                     "origen":"AUTOMATICO",
                     "codigoOperatoria":"DL1",
                     "descripcionOperatoria":null,
                     "codigoEntidadDeudora":"80008",
                     "codigoCuentaDeudora":"80008",
                     "descCuentaDeudora":null,
                     "codigoEntidadAcreedora":"198",
                     "codigoCuentaAcreedora":"198",
                     "descCuentaAcreedora":null,
                     "importe":4400.5,
                     "instruccionDePago":[
                        {
                           "nombre":"CBU Beneficiario",
                           "clave":"CBA",
                           "valor":"1980001740000001311712",
                           "id":4132
                        },
                        {
                           "nombre":"CUIT / CUIL Beneficiario",
                           "clave":"CUA",
                           "valor":"20332068637",
                           "id":4133
                        },
                        {
                           "nombre":"Codigo de transferencia",
                           "clave":"CTR",
                           "valor":"EXP",
                           "id":4134
                        },
                        {
                           "nombre":"Concepto",
                           "clave":"CNC",
                           "valor":"prueba 198 dl1",
                           "id":4135
                        },
                        {
                           "nombre":"CBU ordenante",
                           "clave":"CBD",
                           "valor":"2660018710000000111114",
                           "id":4136
                        },
                        {
                           "nombre":"CUIT / CUIL Ordenante",
                           "clave":"CUD",
                           "valor":"27187514598",
                           "id":4137
                        },
                        {
                           "nombre":"Nombre ordenante",
                           "clave":"NOR",
                           "valor":"Juan Ferrara",
                           "id":4138
                        },
                        {
                           "nombre":"Declaro conocer a mi cliente",
                           "clave":"C01",
                           "valor":"SI",
                           "id":4139
                        },
                        {
                           "nombre":"Ordenante PEP-Pers Exp Politc",
                           "clave":"T68",
                           "valor":"SI",
                           "id":4140
                        },
                        {
                           "nombre":"Nombre beneficiario",
                           "clave":"IDB",
                           "valor":"Diego Gonzalez",
                           "id":4141
                        }
                     ],
                     "numeroCobis":4535910,
                     "numeroCobisReverso":0,
                     "estadoCobis":"OK",
                     "mensajeCobis":null,
                     "numeroBcra":25933358,
                     "estadoBcra":"OK",
                     "mensajeBcra":"",
                     "fechaActualizacionBcra":"26/04/2021 13:52:25",
                     "usuarioAlta":"mepworker",
                     "fechaAlta":"2021-04-30T14:49:12.4242813",
                     "usuarioAprueba":"mepworker",
                     "fechaAprueba":"2021-04-30T14:49:12.5092989",
                     "usuarioRechaza":null,
                     "fechaRechaza":null,
                     "usuarioReparacion":null,
                     "fechaReparacion":null,
                     "usuarioReverso":null,
                     "fechaReverso":null,
                     "cuenta":null,
                     "id":598
                  }
               ]
            );
         }

         function rechazadas(){

            return ok (
               [{"cuentaCobis":"string","tipoCuentaCobis":"CTE","tipoMovimiento":"string","cuitCliente":"string","nombreCliente":"string","moneda":"string","monedaDescripcion":"string","origen":"string","codigoOperatoria":"string","descripcionOperatoria":"string","codigoEntidadDeudora":"string","codigoCuentaDeudora":"string","descCuentaDeudora":"string","codigoEntidadAcreedora":"string","codigoCuentaAcreedora":"string","descCuentaAcreedora":"string","importe":0,"instruccionDePago":[{"nombre":"string","clave":"string","valor":"string","id":430}],"numeroCobis":0,"numeroCobisReverso":0,"estadoCobis":"string","mensajeCobis":"string","numeroBcra":0,"estadoBcra":"string","mensajeBcra":"string","fechaActualizacionBcra":"string","usuarioAlta":null,"fechaAlta":"2021-04-26T23:59:58.1896665","usuarioAprueba":"string","fechaAprueba":"2021-04-26T23:57:40.348","usuarioRechaza":"string","fechaRechaza":"2021-04-26T23:57:40.348","usuarioReparacion":"string","fechaReparacion":"2021-04-26T23:57:40.348","usuarioReverso":"string","fechaReverso":"2021-04-26T23:57:40.348","cuenta":null,"id":62},{"cuentaCobis":"string","tipoCuentaCobis":"CTE","tipoMovimiento":"string","cuitCliente":"string","nombreCliente":"string","moneda":"string","monedaDescripcion":"string","origen":"string","codigoOperatoria":"string","descripcionOperatoria":"string","codigoEntidadDeudora":"string","codigoCuentaDeudora":"string","descCuentaDeudora":"string","codigoEntidadAcreedora":"string","codigoCuentaAcreedora":"string","descCuentaAcreedora":"string","importe":0,"instruccionDePago":[{"nombre":"string","clave":"string","valor":"string","id":431}],"numeroCobis":0,"numeroCobisReverso":0,"estadoCobis":"string","mensajeCobis":"string","numeroBcra":0,"estadoBcra":"string","mensajeBcra":"string","fechaActualizacionBcra":"string","usuarioAlta":null,"fechaAlta":"2021-04-27T00:00:15.6747921","usuarioAprueba":"string","fechaAprueba":"2021-04-26T23:57:40.348","usuarioRechaza":"string","fechaRechaza":"2021-04-26T23:57:40.348","usuarioReparacion":"string","fechaReparacion":"2021-04-26T23:57:40.348","usuarioReverso":"string","fechaReverso":"2021-04-26T23:57:40.348","cuenta":null,"id":63},{"cuentaCobis":"string","tipoCuentaCobis":"CTE","tipoMovimiento":"string","cuitCliente":"string","nombreCliente":"string","moneda":"string","monedaDescripcion":"string","origen":"string","codigoOperatoria":"string","descripcionOperatoria":"string","codigoEntidadDeudora":"string","codigoCuentaDeudora":"string","descCuentaDeudora":"string","codigoEntidadAcreedora":"string","codigoCuentaAcreedora":"string","descCuentaAcreedora":"string","importe":0,"instruccionDePago":[{"nombre":"string","clave":"string","valor":"string","id":432}],"numeroCobis":0,"numeroCobisReverso":0,"estadoCobis":"string","mensajeCobis":"string","numeroBcra":0,"estadoBcra":"string","mensajeBcra":"string","fechaActualizacionBcra":"string","usuarioAlta":null,"fechaAlta":"2021-04-27T00:01:40.2015777","usuarioAprueba":"string","fechaAprueba":"2021-04-26T23:57:40.348","usuarioRechaza":"string","fechaRechaza":"2021-04-26T23:57:40.348","usuarioReparacion":"string","fechaReparacion":"2021-04-26T23:57:40.348","usuarioReverso":"string","fechaReverso":"2021-04-26T23:57:40.348","cuenta":null,"id":64}]
            );
         }

         function codigo_banco(){
            return ok([{"tabla":"codigo_banco","codigo":"340","valor":"BACS BANCO DE CREDITO Y SECURITIZACION S","estado":"V"},{"tabla":"codigo_banco","codigo":"17","valor":"BANCO BBVA ARGENTINA S.A.","estado":"V"},{"tabla":"codigo_banco","codigo":"426","valor":"BANCO BICA S.A.","estado":"V"},{"tabla":"codigo_banco","codigo":"336","valor":"BANCO BRADESCO ARGENTINA S.A.U.","estado":"V"},{"tabla":"codigo_banco","codigo":"331","valor":"BANCO CETELEM ARGENTINA S.A.","estado":"V"},{"tabla":"codigo_banco","codigo":"319","valor":"BANCO CMF S.A.","estado":"V"},{"tabla":"codigo_banco","codigo":"431","valor":"BANCO COINAG S.A.","estado":"V"},{"tabla":"codigo_banco","codigo":"389","valor":"BANCO COLUMBIA S.A.","estado":"V"},{"tabla":"codigo_banco","codigo":"299","valor":"BANCO COMAFI SOCIEDAD ANONIMA","estado":"V"},{"tabla":"codigo_banco","codigo":"191","valor":"BANCO CREDICOOP COOPERATIVO LIMITADO","estado":"V"},{"tabla":"codigo_banco","codigo":"432","valor":"BANCO DE COMERCIO S.A.","estado":"V"},{"tabla":"codigo_banco","codigo":"94","valor":"BANCO DE CORRIENTES S.A.","estado":"V"},{"tabla":"codigo_banco","codigo":"315","valor":"BANCO DE FORMOSA S.A.","estado":"V"},{"tabla":"codigo_banco","codigo":"7","valor":"BANCO DE GALICIA Y BUENOS AIRES S.A.U.","estado":"V"},{"tabla":"codigo_banco","codigo":"300","valor":"BANCO DE INVERSION Y COMERCIO EXTERIOR S","estado":"V"},{"tabla":"codigo_banco","codigo":"29","valor":"BANCO DE LA CIUDAD DE BUENOS AIRES","estado":"V"},{"tabla":"codigo_banco","codigo":"11","valor":"BANCO DE LA NACION ARGENTINA","estado":"V"},{"tabla":"codigo_banco","codigo":"93","valor":"BANCO DE LA PAMPA SOCIEDAD DE ECONOMÍA M","estado":"V"},{"tabla":"codigo_banco","codigo":"14","valor":"BANCO DE LA PROVINCIA DE BUENOS AIRES","estado":"V"},{"tabla":"codigo_banco","codigo":"20","valor":"BANCO DE LA PROVINCIA DE CORDOBA S.A.","estado":"V"},{"tabla":"codigo_banco","codigo":"269","valor":"BANCO DE LA REPUBLICA ORIENTAL DEL URUGU","estado":"V"},{"tabla":"codigo_banco","codigo":"45","valor":"BANCO DE SAN JUAN S.A.","estado":"V"},{"tabla":"codigo_banco","codigo":"86","valor":"BANCO DE SANTA CRUZ S.A.","estado":"V"},{"tabla":"codigo_banco","codigo":"321","valor":"BANCO DE SANTIAGO DEL ESTERO S.A.","estado":"V"},{"tabla":"codigo_banco","codigo":"332","valor":"BANCO DE SERVICIOS FINANCIEROS S.A.","estado":"V"},{"tabla":"codigo_banco","codigo":"338","valor":"BANCO DE SERVICIOS Y TRANSACCIONES S.A.","estado":"V"},{"tabla":"codigo_banco","codigo":"198","valor":"BANCO DE VALORES S.A.","estado":"V"},{"tabla":"codigo_banco","codigo":"83","valor":"BANCO DEL CHUBUT S.A.","estado":"V"},{"tabla":"codigo_banco","codigo":"310","valor":"BANCO DEL SOL S.A.","estado":"V"},{"tabla":"codigo_banco","codigo":"44","valor":"BANCO HIPOTECARIO S.A.","estado":"V"},{"tabla":"codigo_banco","codigo":"322","valor":"BANCO INDUSTRIAL S.A.","estado":"V"},{"tabla":"codigo_banco","codigo":"147","valor":"BANCO INTERFINANZAS S.A.","estado":"V"},{"tabla":"codigo_banco","codigo":"259","valor":"BANCO ITAU ARGENTINA S.A.","estado":"V"},{"tabla":"codigo_banco","codigo":"305","valor":"BANCO JULIO SOCIEDAD ANONIMA","estado":"V"},{"tabla":"codigo_banco","codigo":"285","valor":"BANCO MACRO S.A.","estado":"V"},{"tabla":"codigo_banco","codigo":"254","valor":"BANCO MARIVA S.A.","estado":"V"},{"tabla":"codigo_banco","codigo":"341","valor":"BANCO MASVENTAS S.A.","estado":"V"},{"tabla":"codigo_banco","codigo":"281","valor":"BANCO MERIDIAN S.A.","estado":"V"},{"tabla":"codigo_banco","codigo":"65","valor":"BANCO MUNICIPAL DE ROSARIO","estado":"V"},{"tabla":"codigo_banco","codigo":"34","valor":"BANCO PATAGONIA S.A.","estado":"V"},{"tabla":"codigo_banco","codigo":"301","valor":"BANCO PIANO S.A.","estado":"V"},{"tabla":"codigo_banco","codigo":"268","valor":"BANCO PROVINCIA DE TIERRA DEL FUEGO","estado":"V"},{"tabla":"codigo_banco","codigo":"97","valor":"BANCO PROVINCIA DEL NEUQUÉN SOCIEDAD ANÓ","estado":"V"},{"tabla":"codigo_banco","codigo":"309","valor":"BANCO RIOJA SOCIEDAD ANONIMA UNIPERSONAL","estado":"V"},{"tabla":"codigo_banco","codigo":"247","valor":"BANCO ROELA S.A.","estado":"V"},{"tabla":"codigo_banco","codigo":"277","valor":"BANCO SAENZ S.A.","estado":"V"},{"tabla":"codigo_banco","codigo":"72","valor":"BANCO SANTANDER RIO S.A.","estado":"V"},{"tabla":"codigo_banco","codigo":"435","valor":"BANCO SUCREDITO REGIONAL S.A.U.","estado":"V"},{"tabla":"codigo_banco","codigo":"27","valor":"BANCO SUPERVIELLE S.A.","estado":"V"},{"tabla":"codigo_banco","codigo":"312","valor":"BANCO VOII S.A.","estado":"V"},{"tabla":"codigo_banco","codigo":"262","valor":"BANK OF AMERICA, NATIONAL ASSOCIATION","estado":"V"},{"tabla":"codigo_banco","codigo":"515","valor":"BANK OF CHINA LIMITED SUCURSAL BUENOS AI","estado":"V"},{"tabla":"codigo_banco","codigo":"266","valor":"BNP PARIBAS","estado":"V"},{"tabla":"codigo_banco","codigo":"143","valor":"BRUBANK S.A.U.","estado":"V"},{"tabla":"codigo_banco","codigo":"16","valor":"CITIBANK N.A.","estado":"V"},{"tabla":"codigo_banco","codigo":"44077","valor":"COMPAÑIA FINANCIERA ARGENTINA S.A.","estado":"V"},{"tabla":"codigo_banco","codigo":"44090","valor":"CORDIAL COMPAÑÍA FINANCIERA S.A.","estado":"V"},{"tabla":"codigo_banco","codigo":"65203","valor":"CREDITO REGIONAL COMPAÑIA FINANCIERA S.A","estado":"V"},{"tabla":"codigo_banco","codigo":"44092","valor":"FCA COMPAÑIA FINANCIERA S.A.","estado":"V"},{"tabla":"codigo_banco","codigo":"44100","valor":"FINANDINO COMPAÑIA FINANCIERA S.A.","estado":"V"},{"tabla":"codigo_banco","codigo":"44059","valor":"FORD CREDIT COMPAÑIA FINANCIERA S.A.","estado":"V"},{"tabla":"codigo_banco","codigo":"44093","valor":"GPAT COMPAÑIA FINANCIERA S.A.U.","estado":"V"},{"tabla":"codigo_banco","codigo":"150","valor":"HSBC BANK ARGENTINA S.A.","estado":"V"},{"tabla":"codigo_banco","codigo":"15","valor":"INDUSTRIAL AND COMMERCIAL BANK OF CHINA","estado":"V"},{"tabla":"codigo_banco","codigo":"44096","valor":"JOHN DEERE CREDIT COMPAÑÍA FINANCIERA S.","estado":"V"},{"tabla":"codigo_banco","codigo":"165","valor":"JPMORGAN CHASE BANK, NATIONAL ASSOCIATIO","estado":"V"},{"tabla":"codigo_banco","codigo":"44094","valor":"MERCEDES-BENZ COMPAÑÍA FINANCIERA ARGENT","estado":"V"},{"tabla":"codigo_banco","codigo":"45056","valor":"MONTEMAR COMPAÑIA FINANCIERA S.A.","estado":"V"},{"tabla":"codigo_banco","codigo":"386","valor":"NUEVO BANCO DE ENTRE RÍOS S.A.","estado":"V"},{"tabla":"codigo_banco","codigo":"330","valor":"NUEVO BANCO DE SANTA FE SOCIEDAD ANONIMA","estado":"V"},{"tabla":"codigo_banco","codigo":"311","valor":"NUEVO BANCO DEL CHACO S. A.","estado":"V"},{"tabla":"codigo_banco","codigo":"44098","valor":"PSA FINANCE ARGENTINA COMPAÑÍA FINANCIER","estado":"V"},{"tabla":"codigo_banco","codigo":"339","valor":"RCI BANQUE S.A.","estado":"V"},{"tabla":"codigo_banco","codigo":"44095","valor":"ROMBO COMPAÑÍA FINANCIERA S.A.","estado":"V"},{"tabla":"codigo_banco","codigo":"44099","valor":"TOYOTA COMPAÑÍA FINANCIERA DE ARGENTINA","estado":"V"},{"tabla":"codigo_banco","codigo":"45072","valor":"TRANSATLANTICA COMPAÑIA FINANCIERA S.A.","estado":"V"},{"tabla":"codigo_banco","codigo":"44088","valor":"VOLKSWAGEN FINANCIAL SERVICES COMPAÑIA F","estado":"V"},{"tabla":"codigo_banco","codigo":"384","valor":"WILOBANK S.A.","estado":"V"}]);
         }

         function permisos(){
            return ok([{"idRol":1,"permiso":{"descripcion":"MENU POSICION CONSOLIDADA","categoria":"MENU","permisosPorRol":null,"id":1,"usuarioAlta":"sistema","fechaAlta":"2021-05-01T15:42:01.929","usuarioModificacion":null,"fechaModificacion":null},"habilitado":true},{"idRol":1,"permiso":{"descripcion":"MENU TRANSFERENCIAS","categoria":"MENU","permisosPorRol":null,"id":2,"usuarioAlta":"sistema","fechaAlta":"2021-05-01T15:42:01.929","usuarioModificacion":null,"fechaModificacion":null},"habilitado":true},{"idRol":1,"permiso":{"descripcion":"MENU PARAMETRÍA","categoria":"MENU","permisosPorRol":null,"id":3,"usuarioAlta":"sistema","fechaAlta":"2021-05-01T15:42:01.929","usuarioModificacion":null,"fechaModificacion":null},"habilitado":true},{"idRol":1,"permiso":{"descripcion":"MENU CATÁLOGOS","categoria":"MENU","permisosPorRol":null,"id":4,"usuarioAlta":"sistema","fechaAlta":"2021-05-01T15:42:01.929","usuarioModificacion":null,"fechaModificacion":null},"habilitado":true},{"idRol":1,"permiso":{"descripcion":"MENU CONFIGURACIÓN","categoria":"MENU","permisosPorRol":null,"id":5,"usuarioAlta":"sistema","fechaAlta":"2021-05-01T15:42:01.929","usuarioModificacion":null,"fechaModificacion":null},"habilitado":true},{"idRol":1,"permiso":{"descripcion":"MENU USUARIOS","categoria":"MENU","permisosPorRol":null,"id":6,"usuarioAlta":"sistema","fechaAlta":"2021-05-01T15:42:01.929","usuarioModificacion":null,"fechaModificacion":null},"habilitado":true},{"idRol":1,"permiso":{"descripcion":"MENU ROLES","categoria":"MENU","permisosPorRol":null,"id":7,"usuarioAlta":"sistema","fechaAlta":"2021-05-01T15:42:01.929","usuarioModificacion":null,"fechaModificacion":null},"habilitado":true},{"idRol":1,"permiso":{"descripcion":"MENU TRANSFERENCIA MANUAL","categoria":"MENU","permisosPorRol":null,"id":8,"usuarioAlta":"sistema","fechaAlta":"2021-05-01T15:42:01.929","usuarioModificacion":null,"fechaModificacion":null},"habilitado":true},{"idRol":1,"permiso":{"descripcion":"MENU BANDEJA","categoria":"MENU","permisosPorRol":null,"id":9,"usuarioAlta":"sistema","fechaAlta":"2021-05-01T15:42:01.929","usuarioModificacion":null,"fechaModificacion":null},"habilitado":true},{"idRol":1,"permiso":{"descripcion":"MENU PARAMETRIA NDC","categoria":"MENU","permisosPorRol":null,"id":10,"usuarioAlta":"sistema","fechaAlta":"2021-05-01T15:42:01.929","usuarioModificacion":null,"fechaModificacion":null},"habilitado":true},{"idRol":1,"permiso":{"descripcion":"MENU PARAMETRIA COBIS-BCRA","categoria":"MENU","permisosPorRol":null,"id":11,"usuarioAlta":"sistema","fechaAlta":"2021-05-01T15:42:01.929","usuarioModificacion":null,"fechaModificacion":null},"habilitado":true},{"idRol":1,"permiso":{"descripcion":"MENU SEGURIDAD","categoria":"MENU","permisosPorRol":null,"id":12,"usuarioAlta":"sistema","fechaAlta":"2021-05-01T15:42:01.929","usuarioModificacion":null,"fechaModificacion":null},"habilitado":true},{"idRol":1,"permiso":{"descripcion":"ALTA ROLES","categoria":"ACCION","permisosPorRol":null,"id":1001,"usuarioAlta":"sistema","fechaAlta":"2021-05-01T15:42:01.929","usuarioModificacion":null,"fechaModificacion":null},"habilitado":true},{"idRol":1,"permiso":{"descripcion":"MODIFICAR ROLES","categoria":"ACCION","permisosPorRol":null,"id":1002,"usuarioAlta":"sistema","fechaAlta":"2021-05-01T15:42:01.929","usuarioModificacion":null,"fechaModificacion":null},"habilitado":true},{"idRol":1,"permiso":{"descripcion":"ALTA USUARIOS","categoria":"ACCION","permisosPorRol":null,"id":1003,"usuarioAlta":"sistema","fechaAlta":"2021-05-01T15:42:01.929","usuarioModificacion":null,"fechaModificacion":null},"habilitado":true},{"idRol":1,"permiso":{"descripcion":"MODIFICAR USUARIOS","categoria":"ACCION","permisosPorRol":null,"id":1004,"usuarioAlta":"sistema","fechaAlta":"2021-05-01T15:42:01.929","usuarioModificacion":null,"fechaModificacion":null},"habilitado":true},{"idRol":1,"permiso":{"descripcion":"ALTA PARAMETROS","categoria":"ACCION","permisosPorRol":null,"id":1005,"usuarioAlta":"sistema","fechaAlta":"2021-05-01T15:42:01.93","usuarioModificacion":null,"fechaModificacion":null},"habilitado":true},{"idRol":1,"permiso":{"descripcion":"MODIFICAR PARAMETROS","categoria":"ACCION","permisosPorRol":null,"id":1006,"usuarioAlta":"sistema","fechaAlta":"2021-05-01T15:42:01.93","usuarioModificacion":null,"fechaModificacion":null},"habilitado":true},{"idRol":1,"permiso":{"descripcion":"ELIMINAR PARAMETROS","categoria":"ACCION","permisosPorRol":null,"id":1007,"usuarioAlta":"sistema","fechaAlta":"2021-05-01T15:42:01.93","usuarioModificacion":null,"fechaModificacion":null},"habilitado":true},{"idRol":1,"permiso":{"descripcion":"ALTA CATALOGO","categoria":"ACCION","permisosPorRol":null,"id":1008,"usuarioAlta":"sistema","fechaAlta":"2021-05-01T15:42:01.93","usuarioModificacion":null,"fechaModificacion":null},"habilitado":true},{"idRol":1,"permiso":{"descripcion":"MODIFICAR CATALOGO","categoria":"ACCION","permisosPorRol":null,"id":1009,"usuarioAlta":"sistema","fechaAlta":"2021-05-01T15:42:01.93","usuarioModificacion":null,"fechaModificacion":null},"habilitado":true},{"idRol":1,"permiso":{"descripcion":"MODIFICAR PERMISOS","categoria":"ACCION","permisosPorRol":null,"id":1010,"usuarioAlta":"sistema","fechaAlta":"2021-05-01T15:42:01.93","usuarioModificacion":null,"fechaModificacion":null},"habilitado":true},{"idRol":1,"permiso":{"descripcion":"APROBAR TRANSFERENCIA","categoria":"ACCION","permisosPorRol":null,"id":1011,"usuarioAlta":"sistema","fechaAlta":"2021-05-01T15:42:01.93","usuarioModificacion":null,"fechaModificacion":null},"habilitado":true},{"idRol":1,"permiso":{"descripcion":"RECHAZAR TRANSFERENCIA","categoria":"ACCION","permisosPorRol":null,"id":1012,"usuarioAlta":"sistema","fechaAlta":"2021-05-01T15:42:01.93","usuarioModificacion":null,"fechaModificacion":null},"habilitado":true},{"idRol":1,"permiso":{"descripcion":"CONSULTA MOVIMIENTOS","categoria":"CONSULTA","permisosPorRol":null,"id":100001,"usuarioAlta":"sistema","fechaAlta":"2021-05-01T15:42:01.93","usuarioModificacion":null,"fechaModificacion":null},"habilitado":true},{"idRol":1,"permiso":{"descripcion":"CONSULTA STATUS TRANSFERENCIAS","categoria":"CONSULTA","permisosPorRol":null,"id":100002,"usuarioAlta":"sistema","fechaAlta":"2021-05-01T15:42:01.93","usuarioModificacion":null,"fechaModificacion":null},"habilitado":true}]);
         }

         function saldo(){
            return ok([{"cuenta":"198","entidad":"198","saldo":"5088956451,86","saldoReservado":"1000000", "saldoDisponibleReal": "5089956451,86","horaConsulta":"3/5/21 18:00:23","moneda":"PESOS","simbolo":"$","mensajeError":null},{"cuenta":"80198","entidad":"198","saldo":"5088956451,86","saldoReservado":"1000000", "saldoDisponibleReal": "5089956451,86","horaConsulta":"3/5/21 18:00:23","moneda":"DOLARES","simbolo":"u$s","mensajeError":null}]);
         }

         function menu(){
            return ok(
               [{"id":2,"nombre":"Posicion Consolidada","ruta":"posicion","icono":"dollar-sign","idPadre":0},{"id":90,"nombre":"Reserva de Efectivo","ruta":"reserva","icono":"piggy-bank","idPadre":0},{"id":3,"nombre":"Transferencias","ruta":null,"icono":"random","idPadre":0},{"id":6,"nombre":"Configuración","ruta":"configuracion","icono":"cogs","idPadre":0},{"id":13,"nombre":"Seguridad","ruta":null,"icono":"key","idPadre":0},{"id":9,"nombre":"Transferencias Manuales","ruta":"transferencia","icono":"pencil-alt","idPadre":3},{"id":10,"nombre":"Bandeja de Control","ruta":"aprobacion","icono":"paste","idPadre":3},{"id":4,"nombre":"Parametría","ruta":"parametria","icono":"tasks","idPadre":6},{"id":5,"nombre":"Catálogos","ruta":"catalogo","icono":"book","idPadre":6},{"id":11,"nombre":"Parametría Nota Débito-Crédito","ruta":"parametriandc","icono":"balance-scale","idPadre":6},{"id":12,"nombre":"Parametría Cobis BCRA","ruta":"parametriacobis","icono":"cubes","idPadre":6},{"id":7,"nombre":"Usuarios","ruta":"usuarios","icono":"users","idPadre":13},{"id":8,"nombre":"Roles","ruta":"roles","icono":"tags","idPadre":13}]
            );
         }

         function authenticate() {
            return ok({
               "id":10667,
               "nombre":"Fake, Backend",
               "sector":"Gcia. de Tecnologia Informatica",
               "usuario":"fake",
               "pwd":null,
               "horaLogin":"2021-05-03T19:41:31.3997127+00:00",
               "horaLogout":null,
               "autenticado":true,
               "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoicG9ydGl6IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiJPcnRpeiwgUGFibG8gRmVkZXJpY28iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBRE1JTklTVFJBRE9SIiwibmJmIjoxNjIwMDcwODkyLCJleHAiOjE2MjAwNzI2OTIsImlzcyI6Imh0dHA6Ly9tZXAtYmU6ODA4MC8iLCJhdWQiOiJodHRwOi8vbWVwLWZlOjgwODAvIn0.ZOp_wUYt5BN2MT1iGoecte-3GTdirqxQDeCe0HTXP5s",
               "mensaje":"",
               "rol":1,
               "rolDescripcion":"ADMINISTRADOR",
               "fechaExpiracion":"05/03/2021 20:11:32"})
        }


        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({status: 400,  error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};