import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { timer } from 'rxjs';
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

  @Output() autocompleteResultClicked = new EventEmitter();

  constructor(private deviceService: DeviceService) {}

  ngOnInit(): void {
    this.deviceService.devices$.subscribe((deviceList) => {
      const sortedDevices = this.deviceService.getSortedDevices(deviceList);
      this.devices = sortedDevices;
      this.autocompleteDevices = this.deviceService
        .getDevicesBySearchTerm(sortedDevices, this.searchTerm)
        .slice(0, 5);
    });

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

  onAutocompleteResultClick(deviceElementId: string) {
    this.scrollToDeviceElement(deviceElementId);
    this.autocompleteResultClicked.emit();
  }

  scrollToDeviceElement(deviceElementId: string) {
    const deviceElement: HTMLElement = document.getElementById(deviceElementId);
    deviceElement.classList.add('pulse');
    deviceElement.scrollIntoView({ behavior: 'smooth' });
    timer(3000).subscribe(() => deviceElement.classList.remove('pulse'));
  }
}
