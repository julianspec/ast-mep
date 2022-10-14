import { ParametriaBCRADetalle } from '.';
import { ParametriaBCRARecibida } from '.';

export interface ParametriaBCRA{
   codigoMEP: string;
   detalle: ParametriaBCRADetalle[];
   recibida: ParametriaBCRARecibida;
   usuarioAlta: string;
   fechaAlta: Date;
   usuarioModificacion: string;
   fechaModificacion: Date;
}