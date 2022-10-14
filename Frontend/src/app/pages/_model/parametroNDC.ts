export interface ParametroNDC{
   id: number;
   codigoMEP: string;
   tipoCuenta: string;
   moneda: string;
   movimiento: string;
   mismoOrdenanteBeneficiario: boolean;
   causa: string;
   estado: string;
   usuarioAlta: string;
   fechaAlta: Date;
   usuarioModificacion: string;
   fechaModificacion: Date;
}
