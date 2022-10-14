import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../../_servicios/alert.service';

@Component({ selector: 'alert', templateUrl: 'alert.component.html' })
export class AlertComponent implements OnInit, OnDestroy {
   private subscription: Subscription;
   message: any;
   error: boolean;
   contador = 15;

   constructor(private alertService: AlertService) { }

   ngOnInit() {

      this.Contador();

      this.subscription = this.alertService.getAlert()
         .subscribe(message => {
            this.message = '';
            this.error = false;
            switch (message && message.type) {
               case 'success':
                  message.cssClass = 'alert alert-success';
                  break;
               case 'info':
                  message.cssClass = 'alert alert-info';
                  break;
               case 'warning':
                  message.cssClass = 'alert alert-warning';
                  break;
               case 'error':
                  message.cssClass = 'alert alert-danger';
                  this.error = true;
                  break;
            }

            this.message = message;
         }
      );
   }

   Contador() {
      setTimeout(() => {
         this.contador=this.contador-1;
         if(this.contador>=0){
            this.Contador();
         }else{
            this.message = null;
         }

      }, 1000);
   }

   ngOnDestroy() {
      this.subscription.unsubscribe();
   }
}