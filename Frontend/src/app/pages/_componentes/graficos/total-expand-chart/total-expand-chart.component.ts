import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-total-expand-chart',
  templateUrl: './total-expand-chart.component.html',
  styleUrls: ['./total-expand-chart.component.css']
})
export class TotalExpandChartComponent implements OnInit {

   public title = [] as string[];
   public cantidad = [] as number[];
   public color = "" as string;
   public simbolo = "" as string;
   public loading = true;

   @Input() set data(value: number[]) {
      this.cantidad = value;
   }

   @Input() set moneda(value: string) {
      this.simbolo = value;
   }

   @Input() set status(value: boolean){
      this.loading = value
   }

   @Input() set titulo(value: string[]) {
      this.title = value;
   }

   @Input() set tipo(value: string) {
      this.color = value;
   }

   constructor() { }

   ngOnInit(): void {
   }

}
