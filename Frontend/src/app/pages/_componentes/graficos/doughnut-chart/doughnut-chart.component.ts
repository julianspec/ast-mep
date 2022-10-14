import { Component, Input } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { MultiDataSet, Label, SingleDataSet, Color } from 'ng2-charts';
import { DataChart } from 'src/app/_model';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})

export class DoughnutChartComponent {

   public title = '' as string;

   public doughnutChartOptions: ChartOptions = {
      responsive: true,
      legend: { position: 'right' },
      title: {
         display: true,
         text: this.title
      }
   };

   public doughnutChartColors: Color[] = [
      {
        backgroundColor: [
        ]
      }
    ];

   public doughnutChartLabels: Label[] = ['BMW', 'Ford', 'Tesla'];
   public doughnutChartData: SingleDataSet = [310, 500, 20];
   public doughnutChartType: ChartType = 'doughnut';
   public doughnutChartLegend = true;

   @Input() set data(value: DataChart[]) {
      var label = [] as string[];
      var dato = [] as number[];
      var color = [] as string[];

      value.forEach(element => {
         label.push(element.descripcion);
         dato.push(element.cantidad);
         color.push(this.getRandomColor3());
      });

      this.doughnutChartLabels = label;
      this.doughnutChartData = dato;
      this.doughnutChartColors = [
         {
           backgroundColor: color
         }
       ];
   }

   @Input() set titulo(value: string) {
      this.doughnutChartOptions.title.text = value;
      this.doughnutChartOptions.title.display = (value.length > 0)
   }

   @Input() set mostrarLeyenda(value: boolean) {
      this.doughnutChartLegend = value;
   }

   @Input() set posicionLeyenda(value: Chart.PositionType) {
      this.doughnutChartOptions.legend.position = value;
   }

   getRandomColor3(){
      let color = "#";
      for (let i = 0; i < 3; i++)
         color += ("0" + Math.floor(((1 + Math.random()) * Math.pow(16, 2)) / 2).toString(16)).slice(-2);
      return color;
   }
}
