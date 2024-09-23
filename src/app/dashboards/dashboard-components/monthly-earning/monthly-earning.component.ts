import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexYAxis,
  ApexLegend,
  ApexXAxis,
  ApexTooltip,
  ApexTheme,
  ApexGrid,
  NgApexchartsModule,
} from 'ng-apexcharts';

export type salesChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  yaxis: ApexYAxis | any;
  stroke: any;
  theme: ApexTheme | any;
  tooltip: ApexTooltip | any;
  dataLabels: ApexDataLabels | any;
  legend: ApexLegend | any;
  colors: string[] | any;
  markers: any;
  grid: ApexGrid | any;
};

@Component({
  selector: 'app-monthly-earning',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './monthly-earning.component.html',
  styleUrls: ['./monthly-earning.component.css'],
})
export class MonthlyEarningComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public salesChartOptions: Partial<salesChartOptions>;

  constructor() {
    this.salesChartOptions = {
      series: [
        {
          name: 'Earning',
          data: [50, 130, 80, 70, 180, 105, 250],
        },
        {
          name: 'Sales',
          data: [80, 100, 60, 200, 150, 100, 150],
        },
      ],
      chart: {
        fontFamily: "inherit",
        height: 345,
        type: 'line',
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 3,
        strokeColors: 'transparent',
      },
      stroke: {
        curve: 'smooth',
        width: '2',
      },
      colors: ['#009efb', '#55ce63'],
      legend: {
        show: false,
      },
      grid: {
        show: true,
        strokeDashArray: 3,
        borderColor: 'rgba(0,0,0,0.1)',
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      xaxis: {
        type: 'category',
        categories: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
        ],
        labels: {
          style: {
            colors: '#a1aab2',
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: '#a1aab2',
          },
        },
      },
      tooltip: {
        theme: 'dark',
      },
    };
  }

  ngOnInit(): void {}
}
