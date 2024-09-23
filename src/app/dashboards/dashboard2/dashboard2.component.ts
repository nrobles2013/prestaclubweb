import { Component, AfterViewInit } from '@angular/core';
import { ProjectCounterComponent } from '../dashboard-components/project-counter/project-counter.component';
import { MonthlyEarningComponent } from '../dashboard-components/monthly-earning/monthly-earning.component';
import { SalesAnalyticsComponent } from '../dashboard-components/sales-analytics/sales-analytics.component';
import { BandwidthUsageComponent } from '../dashboard-components/bandwidth-usage/bandwidth-usage.component';
import { ProjectComponent } from '../dashboard-components/project/project.component';
import { ProfileComponent } from '../dashboard-components/profile/profile.component';
import { WidgetComponent } from '../dashboard-components/widget/widget.component';
import { RecentcommentComponent } from '../dashboard-components/recent-comment/recent-comment.component';
import { TodoComponent } from '../dashboard-components/to-do/todo.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FeatherModule } from 'angular-feather';

@Component({
  templateUrl: './dashboard2.component.html',
  standalone: true,
  imports: [
    ProjectCounterComponent,
    MonthlyEarningComponent,
    SalesAnalyticsComponent,
    BandwidthUsageComponent,
    ProjectComponent,
    ProfileComponent,
    WidgetComponent,
    RecentcommentComponent,
    TodoComponent,
    NgApexchartsModule,
    FeatherModule,
  ],
  styleUrls: ['./dashboard2.component.css'],
})
export class Dashboard2Component implements AfterViewInit {
  subtitle: string;

  constructor() {
    this.subtitle = 'This is some text within a card block.';
  }

  ngAfterViewInit() {}
}
