import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DeviceService } from '../device.service';

@Component({
  selector: 'dm-device-filters-form',
  templateUrl: './device-filters-form.component.html',
  styleUrls: ['./device-filters-form.component.css'],
})
export class DeviceFiltersFormComponent implements OnInit {
  deviceFiltersForm: FormGroup;

  constructor(private deviceService: DeviceService) {}

  ngOnInit(): void {
    this.deviceFiltersForm = new FormGroup({
      Alarm: new FormControl(true),
      NoData: new FormControl(true),
      Ok: new FormControl(true),
    });

    this.deviceFiltersForm.valueChanges.subscribe((values) => {
      const filters = Object.keys(values).filter((x) => values[x] !== false);
      this.deviceService.applyFilters(filters);
    });
  }
}
