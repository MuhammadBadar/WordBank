import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStudentFormComponent } from './manage-student-form.component';

describe('ManageStudentFormComponent', () => {
  let component: ManageStudentFormComponent;
  let fixture: ComponentFixture<ManageStudentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageStudentFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageStudentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
