import { Component, OnInit, ViewChild } from '@angular/core';

import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexLegend,
  ApexTooltip,
  ApexStroke,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  NgApexchartsModule,
} from 'ng-apexcharts';

export interface SalesdifferenceChartOptions {
  series: ApexNonAxisChartSeries | any;
  chart: ApexChart | any;
  stroke: ApexStroke | any;
  dataLabels: ApexDataLabels | any;
  legends: ApexLegend | any;
  labels: any;
  name: any;
  tooltip: ApexTooltip | any;
  colors: string[] | any;
  plotOptions: ApexPlotOptions | any;
}

@Component({
  selector: 'app-sales-difference',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './sales-difference.component.html',
  styleUrls: ['./sales-difference.component.css'],
})
export class SalesDifferenceComponent implements OnInit {
  @ViewChild('chart') chart4: ChartComponent = Object.create(null);
  public SalesdifferenceChartOptions: Partial<SalesdifferenceChartOptions>;

  constructor() {
    this.SalesdifferenceChartOptions = {
      series: [35, 15, 10],
      chart: {
        fontFamily: "inherit",
        type: 'donut',
        height: 150,
      },
      plotOptions: {
        pie: {
          expandOnClick: false,
          donut: {
            size: '60px',
            labels: {
              show: false,
            },
          },
        },
      },
      tooltip: {
        theme: 'dark',
        fillSeriesColor: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 0,
      },
      legends: {
        show: false,
      },
      labels: ['Item A', 'Item B', 'Item C'],
      colors: ['#39c449', '#ebf3f5', '#009efb'],
    };
  }

  ngOnInit(): void {}
}
