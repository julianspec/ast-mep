import { Component, Input, OnInit } from '@angular/core';
import { InstruccionPago } from 'src/app/_model';

@Component({
  selector: 'vista-instruccion',
  templateUrl: './vista.component.html',
  styleUrls: ['./vista.component.css']
})
export class VistaComponent implements OnInit {

   transferencia: InstruccionPago[];

   @Input() set values(value: InstruccionPago[]) {
      this.transferencia = value;
   }

   constructor() { }

   ngOnInit(): void {
   }

}
