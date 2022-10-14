import { Rol } from './rol';

export interface Usuario {
   id: number;
   login: string;
   nombre: string;
   estado: string;
   fechaCreacion: Date;
   usuarioModificacion: string;
   rol: Rol;
}
