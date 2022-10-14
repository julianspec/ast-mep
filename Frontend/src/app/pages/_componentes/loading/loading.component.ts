import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

   isCompleted = true;

   constructor(public dialogo: MatDialogRef<LoadingComponent>,
      @Inject(MAT_DIALOG_DATA) public mensaje: string) {
         dialogo.disableClose = true;
   }


   confirmado(): void {
      this.dialogo.close(true);
   }

   ngOnInit() {
   }

}
