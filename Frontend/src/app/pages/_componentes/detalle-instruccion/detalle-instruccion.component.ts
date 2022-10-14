import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InstruccionPago } from 'src/app/_model';
import { DialogoConfirmacionComponent } from '..';

@Component({
  selector: 'app-detalle-instruccion',
  templateUrl: './detalle-instruccion.component.html',
  styleUrls: ['./detalle-instruccion.component.css']
})
export class DetalleInstruccionComponent implements OnInit {

   transferencia: InstruccionPago[];

   constructor(public dialogo: MatDialogRef<DialogoConfirmacionComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
         this.transferencia = this.data;
      }

   cerrarDialogo(): void {
      this.dialogo.close(false);
   }
   confirmado(): void {
      this.dialogo.close(true);
   }

   @HostListener("keydown.esc")
     public onEsc() {
       this.dialogo.close(false);
   }

   ngOnInit() {

   }


}
