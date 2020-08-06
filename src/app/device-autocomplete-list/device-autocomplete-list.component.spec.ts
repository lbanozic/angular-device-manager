import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceAutocompleteListComponent } from './device-autocomplete-list.component';

describe('DeviceAutocompleteListComponent', () => {
  let component: DeviceAutocompleteListComponent;
  let fixture: ComponentFixture<DeviceAutocompleteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceAutocompleteListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceAutocompleteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
