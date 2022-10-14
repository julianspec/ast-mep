import { InstruccionPago } from './instruccionPago';

export interface Transferencia{
   id: number;
   cuentaCobis: string;
   tipoCuentaCobis: string;
   cuitCliente: string;
   nombreCliente: string;
   moneda: string;
   origen: string;
   codigoOperatoria: string;
   codigoEntidadDeudora: string;
   codigoCuentaDeudora: string;
   codigoEntidadAcreedora: string;
   codigoCuentaAcreedora: string;
   importe: number;
   instruccionDePago: InstruccionPago[];
   numeroCobis: number;
   estadoCobis: string;
   mensajeCobis: string;
   numeroBcra: number;
   estadoBcra: string;
   mensajeBcra: string;
   fechaActualizacionBcra: string;
   usuarioAlta: string;
   fechaAlta: Date;
   usuarioEnvio: string;
   fechaEnvio: string;
   usuarioAprueba: string;
   fechaAprueba: Date;
   usuarioRechaza: string;
   fechaRechaza: Date;
   edit: boolean;
}