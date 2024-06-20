import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFiscalYearComponent } from './manage-fiscal-year.component';

describe('ManageFiscalYearComponent', () => {
  let component: ManageFiscalYearComponent;
  let fixture: ComponentFixture<ManageFiscalYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageFiscalYearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageFiscalYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
