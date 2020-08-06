import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Device } from '../device';
import { DeviceService } from '../device.service';

@Component({
  selector: 'dm-device-autocomplete-list',
  templateUrl: './device-autocomplete-list.component.html',
  styleUrls: ['./device-autocomplete-list.component.css'],
})
export class DeviceAutocompleteListComponent implements OnInit {
  private devices: Device[];
  autocompleteDevices: Device[];
  private searchTerm = '';

  constructor(private deviceService: DeviceService) {}

  ngOnInit(): void {
    this.deviceService.devices$.subscribe((deviceList) => {
      const sortedDevices = this.deviceService.getSortedDevices(deviceList);
      this.devices = sortedDevices;
      this.autocompleteDevices = this.deviceService
        .getDevicesBySearchTerm(sortedDevices, this.searchTerm)
        .slice(0, 5);
    });

    this.deviceService.getDevices();

    this.deviceService.deviceSearchTerm$
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        tap((searchTerm) => {
          this.searchTerm = searchTerm;
          this.autocompleteDevices = this.deviceService
            .getDevicesBySearchTerm(this.devices, searchTerm)
            .slice(0, 5);
        })
      )
      .subscribe();
  }
}
