export interface Movimiento{
   operatoria: string ;
   trasaccion: string ;
   numeroInterno: string;
   entidadDeudora: string ;
   cuentaDeudora: string ;
   entidadAcreedora: string ;
   cuentaAcreedora: string;
   importe: string;
   instruccionDePago: string;
   fechaProcesado: Date;
}