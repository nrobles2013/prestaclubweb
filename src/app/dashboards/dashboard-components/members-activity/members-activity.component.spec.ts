import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersActivityComponent } from './members-activity.component';

describe('MembersActivityComponent', () => {
  let component: MembersActivityComponent;
  let fixture: ComponentFixture<MembersActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembersActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
