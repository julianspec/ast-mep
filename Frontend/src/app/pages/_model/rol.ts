import { Permiso } from './permiso';

export class Rol {
   id: number;
   descripcion: string;
   permisos: Permiso[];
}