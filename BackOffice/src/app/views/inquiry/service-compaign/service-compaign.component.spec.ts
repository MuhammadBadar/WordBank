import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCompaignComponent } from './service-compaign.component';

describe('ServiceCompaignComponent', () => {
  let component: ServiceCompaignComponent;
  let fixture: ComponentFixture<ServiceCompaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceCompaignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceCompaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
