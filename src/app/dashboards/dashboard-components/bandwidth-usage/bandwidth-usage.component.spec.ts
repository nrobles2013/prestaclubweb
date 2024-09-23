import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandwidthUsageComponent } from './bandwidth-usage.component';

describe('BandwidthUsageComponent', () => {
  let component: BandwidthUsageComponent;
  let fixture: ComponentFixture<BandwidthUsageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandwidthUsageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandwidthUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
