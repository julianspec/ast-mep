import { InstruccionPago } from './instruccionPago';
import { Cuenta } from './cuenta';

export class EnvioOperacion{
   //DATOS COBIS
   Cuenta: Cuenta;

   //DATOS BCRA
   Origen: string;
   TipoMovimiento: string;
   CodigoOperatoria: string;
   DescripcionOperatoria: string;
   CodigoEntidadDeudora: string;
   CodigoCuentaDeudora: string;
   DescCuentaDeudora: string;
   CodigoEntidadAcreedora: string;
   CodigoCuentaAcreedora: string;
   DescCuentaAcreedora: string;
   Importe: string;
   InstruccionDePago: InstruccionPago[];
   NumeroInterno: string;
}