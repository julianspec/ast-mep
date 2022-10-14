export interface MenuItem {
   id: number;
   nombre: string;
   ruta: string;
   icono: string;
   idPadre: number;
   subMenu: MenuItem[];
}
