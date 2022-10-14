import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_servicios';
import { Router } from '@angular/router';
import { Login } from 'src/app/_model';
import { DialogoConfirmacionComponent } from '../../_componentes';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css']
})
export class NotificacionComponent implements OnInit {

   currentUser: Login;
   color: any;

   constructor(private router: Router,
               private authenticationService: AuthenticationService,
               private dialog: MatDialog) {
      this.authenticationService.currentUser.subscribe(x => { this.currentUser = x });
      this.color = this.getRandomColor3()
   }

  ngOnInit(): void {
  }

   logout() {
      this.dialog
         .open(DialogoConfirmacionComponent, {
            data: `Saliendo del sistema. ¿Seguro desea cerrar sesion?`
         })
         .afterClosed()
         .subscribe((confirmado: Boolean) => {
         if (confirmado) {
            this.authenticationService.logout(this.currentUser).subscribe(
               () => console.log("LogOut"));
            this.router.navigate(['/login']);
         } else {
            return false;
         }
      });
      return false;
   }

   getRandomColor2() {
      var length = 6;
      var chars = '0123456789ABCDEF';
      var hex = '#';

      while(length--) hex += chars[(Math.random() * 16) | 0];
      return hex;
   }

    getRandomColor() {
      var color = Math.floor(0x1000000 * Math.random()).toString(16);
      return '#' + ('000000' + color).slice(-6);
    }

    getRandomColor3(){
      return "hsl(" + 360 * Math.random() + ',' + //COLOR BASE
             (10 + 30 * Math.random()) + '%,' + //SATURACION
             (65 + 10 * Math.random()) + '%)' //LUMINICENCIA
    }

}
