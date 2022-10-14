import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_servicios';
import { Login } from 'src/app/_model';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

   currentUser: Login;

   constructor(private authenticationService: AuthenticationService) {
      this.authenticationService.currentUser.subscribe(x => {
         this.currentUser = x

      });
   }

   ngOnInit(): void {

   }

}
