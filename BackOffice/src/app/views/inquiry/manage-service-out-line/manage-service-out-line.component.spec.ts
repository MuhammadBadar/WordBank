import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageServiceOutLineComponent } from './manage-service-out-line.component';

describe('ManageServiceOutLineComponent', () => {
  let component: ManageServiceOutLineComponent;
  let fixture: ComponentFixture<ManageServiceOutLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageServiceOutLineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageServiceOutLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
