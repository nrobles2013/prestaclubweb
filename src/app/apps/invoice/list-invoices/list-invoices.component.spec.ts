import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInvoicesComponent } from './list-invoices.component';

describe('ListInvoicesComponent', () => {
  let component: ListInvoicesComponent;
  let fixture: ComponentFixture<ListInvoicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListInvoicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
