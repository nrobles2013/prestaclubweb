import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RvenueStatGraphComponent } from './rvenue-stat-graph.component';

describe('RvenueStatGraphComponent', () => {
  let component: RvenueStatGraphComponent;
  let fixture: ComponentFixture<RvenueStatGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RvenueStatGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RvenueStatGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
