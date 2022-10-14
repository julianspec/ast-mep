import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/_servicios';
import { Login } from 'src/app/_model';

@Component({
  selector: 'app-userinfosm',
  templateUrl: './userinfosm.component.html',
  styleUrls: ['./userinfosm.component.css']
})
export class UserinfosmComponent implements OnInit {

   currentUser: Login;
   color: any;

   @Input() set UserColor(value: string[]){
      this.color = value;
   }

   constructor(private authenticationService: AuthenticationService) {
      this.authenticationService.currentUser.subscribe(x => {
         this.currentUser = x

      });
   }

   ngOnInit(): void {

   }

}
