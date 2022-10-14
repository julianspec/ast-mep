import { Catalogo } from './catalogo';

export interface Tabla {
   idTabla: string;
   descripcion: string;
   catalogos: Catalogo[];
}