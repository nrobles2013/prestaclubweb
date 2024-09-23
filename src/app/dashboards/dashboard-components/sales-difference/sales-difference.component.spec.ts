import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesDifferenceComponent } from './sales-difference.component';

describe('SalesDifferenceComponent', () => {
  let component: SalesDifferenceComponent;
  let fixture: ComponentFixture<SalesDifferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesDifferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesDifferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
