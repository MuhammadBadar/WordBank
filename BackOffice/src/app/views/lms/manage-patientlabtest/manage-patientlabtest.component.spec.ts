import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePatientlabtestComponent } from './manage-patientlabtest.component';

describe('ManagePatientlabtestComponent', () => {
  let component: ManagePatientlabtestComponent;
  let fixture: ComponentFixture<ManagePatientlabtestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePatientlabtestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagePatientlabtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
