import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagesampletypeComponent } from './manage-sampletype.component';

describe('ManageSampletypeComponent', () => {
  let component: ManagesampletypeComponent;
  let fixture: ComponentFixture<ManagesampletypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagesampletypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagesampletypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
