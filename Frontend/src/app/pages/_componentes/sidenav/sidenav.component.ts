import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AuthenticationService, PermissionManagerService } from '../../_servicios';
import { Login, MenuItem } from '../../_model';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { MenuItemService } from 'src/app/_servicios/menu-item.service';
import { DialogoConfirmacionComponent } from '../../_componentes';
import { MatDialog } from '@angular/material/dialog';
import { Permiso } from 'src/app/_model/permiso';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements  OnInit {

   @ViewChild('sidenav') sidenav: MatSidenav;
   currentUser: Login;
   mobileQuery: MediaQueryList;
   public notMobileLayout = false;
   private _mobileQueryListener: () => void;
   menu = [] as MenuItem[];
   permisos = [] as Permiso[];
   status: boolean = false;

   constructor(
      changeDetectorRef: ChangeDetectorRef,
      media: MediaMatcher,
      private router: Router,
      private authenticationService: AuthenticationService,
      private menuService:MenuItemService,
      public dialog: MatDialog) {

         this.authenticationService.currentUser.subscribe(x => { this.currentUser = x });
         this.menuService.menuItems.subscribe(m => { this.menu = m });
         this.mobileQuery = media.matchMedia('(max-width: 600px)');
         this._mobileQueryListener = () => changeDetectorRef.detectChanges();
         this.mobileQuery.addListener(this._mobileQueryListener);


      }

   ngOnDestroy(): void {
      this.mobileQuery.removeListener(this._mobileQueryListener);
      this.logout();
   }

   ngOnInit(): void {
      window.onresize = () => this.notMobileLayout = window.innerWidth >= 991;
   }

   logout() {
      this.confirmar();
   }


   confirmar(): boolean {
      this.dialog
         .open(DialogoConfirmacionComponent, {
            data: `Saliendo del sistema. ¿Seguro desea cerrar sesion?`
         })
         .afterClosed()
         .subscribe((confirmado: Boolean) => {
         if (confirmado) {
            this.togglebar();
            this.authenticationService.logout(this.currentUser).subscribe(
               () => console.log("LogOut"));
            this.router.navigate(['/login']);
         } else {
            return false;
         }
      });
      return false;
   }

   togglebar(){
      this.sidenav.toggle();
   }
}