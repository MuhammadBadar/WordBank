import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageInquirylistComponent } from './manage-inquirylist.component';

describe('ManageInquirylistComponent', () => {
  let component: ManageInquirylistComponent;
  let fixture: ComponentFixture<ManageInquirylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageInquirylistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageInquirylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
