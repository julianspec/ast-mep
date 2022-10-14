import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from '..';

@Component({
  selector: 'app-dialogo-correcto',
  templateUrl: './dialogo-correcto.component.html',
  styleUrls: ['./dialogo-correcto.component.css']
})

export class DialogoCorrectoComponent implements OnInit {



   constructor(public dialogo: MatDialogRef<DialogoConfirmacionComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { titulo: string, mensaje: string, error: boolean}) { }

      confirmado(): void {
         this.dialogo.close(true);
      }

      ngOnInit() {
      }

}
