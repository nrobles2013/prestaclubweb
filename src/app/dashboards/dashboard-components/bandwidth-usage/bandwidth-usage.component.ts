import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexLegend,
  ApexTooltip,
  ApexNonAxisChartSeries,
  ApexStroke,
  ApexPlotOptions,
  NgApexchartsModule,
} from 'ng-apexcharts';

export interface bandwidthChartOptions {
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
  selector: 'app-bandwidth-usage',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './bandwidth-usage.component.html',
  styleUrls: ['./bandwidth-usage.component.css'],
})
export class BandwidthUsageComponent implements OnInit {
  @ViewChild('chart') chart3: ChartComponent = Object.create(null);
  public bandwidthChartOptions: Partial<bandwidthChartOptions>;

  constructor() {
    this.bandwidthChartOptions = {
      series: [300, 500, 100],
      chart: {
        fontFamily: "inherit",
        type: 'donut',
        height: 140,
        width: 140,
      },
      plotOptions: {
        pie: {
          expandOnClick: false,
          donut: {
            size: '50px',
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
        width: 2,
        colors: ['#39c449'],
      },
      legends: {
        show: false,
      },
      labels: ['Sales', 'Cost', 'Earning'],
      colors: ['#1976d2', '#fff', '#2b2b2b'],
    };
  }

  ngOnInit(): void {}
}
