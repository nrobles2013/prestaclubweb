import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyEarningComponent } from './monthly-earning.component';

describe('MonthlyEarningComponent', () => {
  let component: MonthlyEarningComponent;
  let fixture: ComponentFixture<MonthlyEarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyEarningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyEarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
