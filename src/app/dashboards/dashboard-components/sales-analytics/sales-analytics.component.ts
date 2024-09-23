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

export interface SalesanalyticsChartOptions {
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
  selector: 'app-sales-analytics',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './sales-analytics.component.html',
  styleUrls: ['./sales-analytics.component.css'],
})
export class SalesAnalyticsComponent implements OnInit {
  @ViewChild('chart') chart2: ChartComponent = Object.create(null);
  public SalesanalyticsChartOptions: Partial<SalesanalyticsChartOptions>;

  constructor() {
    this.SalesanalyticsChartOptions = {
      series: [300, 500, 100],
      chart: {
        fontFamily: "inherit",
        type: 'pie',
        height: 150,
      },
      plotOptions: {
        pie: {
          expandOnClick: false,
          donut: {
            size: '85px',
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
        width: 1,
        colors: ['#009efb'],
      },
      legends: {
        show: false,
      },
      labels: ['Sales', 'Cost', 'Earning'],
      colors: ['#ffb22b', '#26dad2', '#fff'],
    };
  }

  ngOnInit(): void {}
}
