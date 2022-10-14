import { Component, Input } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, Color } from 'ng2-charts';
import { DataChart } from 'src/app/_model';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})

export class PieChartComponent {

   public title = '' as string;


   public pieChartOptions: ChartOptions = {
      responsive: true,
      legend: { position: 'right' },
      title: {
         display: (this.title.length > 0),
         text: this.title
      }
   };

   public pieChartColors: Color[] = [
      {
        backgroundColor: [
          '#E6B0AA','#E8DAEF','#FEF5E7','#F8C471','#5DADE2','#F5B7B1','#E6B0AA','#E6B0AA','#E6B0AA','#E6B0AA',
          '#D5F5E3','#E6B0AA','#E6B0AA','#E6B0AA','#E6B0AA','#E6B0AA','#E6B0AA','#E6B0AA','#E6B0AA','#E6B0AA',
          '#D4E6F1','#E6B0AA','#E6B0AA','#E6B0AA','#E6B0AA','#E6B0AA','#E6B0AA','#E6B0AA','#E6B0AA','#E6B0AA',
        ]
      }
    ];

   public pieChartLabels: Label[] = ['MANUALES', 'AUTOMATICAS', 'PROPIAS'];
   public pieChartData: SingleDataSet = [310, 500, 20];
   public pieChartType: ChartType = 'pie';
   public pieChartLegend = true;
   public pieChartPlugins = [];

   @Input() set data(value: DataChart[]) {
      var label = [] as string[];
      var dato = [] as number[];
      var color = [] as string[];

      value.forEach(element => {
         label.push(element.descripcion);
         dato.push(element.cantidad);
         color.push(this.getRandomColor3());
      });


      this.pieChartLabels = label;
      this.pieChartData = dato;
      this.pieChartColors = [
         {
           backgroundColor: color
         }
       ];
   }

   @Input() set titulo(value: string) {
      this.title = value;
      this.pieChartOptions.title.text = value;
      this.pieChartOptions.title.display = (value.length > 0)
   }

   @Input() set mostrarLeyenda(value: boolean) {
      this.pieChartLegend = value;
   }

   @Input() set posicionLeyenda(value: Chart.PositionType) {
      this.pieChartOptions.legend.position = value;
   }

   constructor() {
      monkeyPatchChartJsTooltip();
      monkeyPatchChartJsLegend();
   }

   getRandomColor3(){
      let color = "#";
      for (let i = 0; i < 3; i++)
         color += ("0" + Math.floor(((1 + Math.random()) * Math.pow(16, 2)) / 2).toString(16)).slice(-2);
      return color;
   }

   hslToHex(h, s, l) {
      h /= 360;
      s /= 100;
      l /= 100;
      let r, g, b;
      if (s === 0) {
        r = g = b = l; // achromatic
      } else {
        const hue2rgb = (p, q, t) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1 / 6) return p + (q - p) * 6 * t;
          if (t < 1 / 2) return q;
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
          return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
      }
      const toHex = x => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      };
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }

}