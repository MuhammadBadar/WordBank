import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageInquiryFollowUpComponent } from './manage-inquiry-follow-up.component';

describe('ManageInquiryFollowUpComponent', () => {
  let component: ManageInquiryFollowUpComponent;
  let fixture: ComponentFixture<ManageInquiryFollowUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageInquiryFollowUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageInquiryFollowUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
