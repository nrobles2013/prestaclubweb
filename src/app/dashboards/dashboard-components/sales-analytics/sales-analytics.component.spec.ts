import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesAnalyticsComponent } from './sales-analytics.component';

describe('SalesAnalyticsComponent', () => {
  let component: SalesAnalyticsComponent;
  let fixture: ComponentFixture<SalesAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
