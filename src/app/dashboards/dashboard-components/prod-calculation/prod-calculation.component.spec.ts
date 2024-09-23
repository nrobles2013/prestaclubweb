import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdCalculationComponent } from './prod-calculation.component';

describe('ProdCalculationComponent', () => {
  let component: ProdCalculationComponent;
  let fixture: ComponentFixture<ProdCalculationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdCalculationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
