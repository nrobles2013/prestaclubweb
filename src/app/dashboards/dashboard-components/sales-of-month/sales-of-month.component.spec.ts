import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOfMonthComponent } from './sales-of-month.component';

describe('SalesOfMonthComponent', () => {
  let component: SalesOfMonthComponent;
  let fixture: ComponentFixture<SalesOfMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesOfMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesOfMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
