import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSTDStudentComponent } from './manage-std-student.component';

describe('ManageSTDStudentComponent', () => {
  let component: ManageSTDStudentComponent;
  let fixture: ComponentFixture<ManageSTDStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSTDStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSTDStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
