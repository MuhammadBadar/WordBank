import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUserAdditionalfieldsComponent } from './manage-user-additionalfields.component';

describe('ManageUserAdditionalfieldsComponent', () => {
  let component: ManageUserAdditionalfieldsComponent;
  let fixture: ComponentFixture<ManageUserAdditionalfieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageUserAdditionalfieldsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageUserAdditionalfieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
