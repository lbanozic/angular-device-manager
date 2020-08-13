import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DeviceService } from '../device.service';

@Component({
  selector: 'dm-device-filters-form',
  templateUrl: './device-filters-form.component.html',
  styleUrls: ['./device-filters-form.component.css'],
})
export class DeviceFiltersFormComponent implements OnInit, OnDestroy {
  deviceFiltersForm: FormGroup;

  private deviceFiltersFormValueChangedSubscription: Subscription;

  constructor(private deviceService: DeviceService) {}

  ngOnInit(): void {
    this.deviceFiltersForm = new FormGroup({
      Alarm: new FormControl(true),
      NoData: new FormControl(true),
      Ok: new FormControl(true),
    });

    this.deviceFiltersFormValueChangedSubscription = this.deviceFiltersForm.valueChanges.subscribe(
      (values) => {
        const filters = Object.keys(values).filter((x) => values[x] !== false);
        this.deviceService.applyFilters(filters);
      }
    );
  }

  ngOnDestroy(): void {
    this.deviceFiltersFormValueChangedSubscription.unsubscribe();
  }
}
