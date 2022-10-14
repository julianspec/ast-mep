import { Cliente, Cuenta } from '.';
import { DatosCoelsa } from './datosCoelsa';
import { DatosCuenta } from './datosCuenta';

export class ResponseCliente{
   status: number;
   code: number;
   message: string;
   reference: number;
   cliente: Cliente[];
}

export class ResponseCuenta{
   status: number;
   code: number;
   message: string;
   reference: number;
   cuentas: Cuenta[];
}

export class ResponseDatosCuenta{
   status: number;
   code: number;
   message: string;
   reference: number;
   datosCuenta: DatosCuenta;
}

export class ResponseCoelsa{
   status: number;
   code: number;
   message: string;
   reference: number;
   datosCoelsa: DatosCoelsa;
}