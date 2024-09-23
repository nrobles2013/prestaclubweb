import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProectOfMonthComponent } from './proect-of-month.component';

describe('ProectOfMonthComponent', () => {
  let component: ProectOfMonthComponent;
  let fixture: ComponentFixture<ProectOfMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProectOfMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProectOfMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
