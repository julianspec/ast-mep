import { InstruccionOperatoria, CuentaOperatoria } from '.';

export class Operatoria{
   codigo: string;
   descripcion: string;
   horaDesde: string;
   horaHasta: string;
   estado: string;
   cuentaContrapartida: string;
   entidadIgual: string;
   monedaIgual: string;
   instruccionDePago: InstruccionOperatoria[];
   cuentasAlDebito: CuentaOperatoria[];
   cuentasAlCredito: CuentaOperatoria[];
}