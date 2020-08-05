import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceFiltersFormComponent } from './device-filters-form.component';

describe('DeviceFiltersFormComponent', () => {
  let component: DeviceFiltersFormComponent;
  let fixture: ComponentFixture<DeviceFiltersFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceFiltersFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceFiltersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
