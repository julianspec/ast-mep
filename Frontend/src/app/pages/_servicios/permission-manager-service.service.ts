import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Login } from '../_model';
import { BehaviorSubject, Observable } from 'rxjs';
import { PermisosService } from './permisos.service';
import { RolPermiso } from '../_model/rolPermiso';

@Injectable()
export class PermissionManagerService {

   private permisosHabilitadosSubject: BehaviorSubject<RolPermiso[]>;
   public permisosHabilitados: Observable<RolPermiso[]>;
   currentUser: Login;

   constructor(private authenticationService: AuthenticationService,
               private permisosService: PermisosService) {
      this.authenticationService.currentUser.subscribe(x => {
         this.currentUser = x
      });

      this.permisosHabilitadosSubject = new BehaviorSubject<RolPermiso[]>(JSON.parse(localStorage.getItem('permisosHabilitados')));
      this.permisosHabilitados = this.permisosHabilitadosSubject.asObservable();
   }

   public buscarPermisos(rol: number){
      this.permisosService.getHabilitado(rol).subscribe(
         (permisos) => {
         if (permisos) {
            localStorage.setItem('permisosHabilitados', JSON.stringify(permisos));
            this.permisosHabilitadosSubject.next(permisos);
         }
         return permisos;
      });
      return null;
   }

   public get permisosHabilitadosList(): RolPermiso[] {
      if(this.permisosHabilitadosSubject.value){
         return this.permisosHabilitadosSubject.value;
      }else{
         return this.buscarPermisos(this.currentUser.rol)
      }
   }

   isGranted(permiso: number) {
      const permissions = this.permisosHabilitadosList;
      for (let perm of permissions) {
         if (perm.permiso.id === permiso){
            return perm.habilitado;
         }
      }
      return false;
   }

}