import { Component, OnInit } from '@angular/core';
import { Device } from '../device';
import { DeviceService } from '../device.service';

@Component({
  selector: 'dm-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css'],
})
export class DeviceListComponent implements OnInit {
  devices: Device[];

  isLoading = false;

  constructor(private deviceService: DeviceService) {}

  ngOnInit(): void {
    this.deviceService.devices$.subscribe((deviceList) => {
      this.isLoading = true;
      setTimeout(() => {
        this.devices = this.deviceService.getSortedDevices(deviceList);
        this.isLoading = false;
      });
    });
    this.deviceService.getDevices();
  }

  trackByItems(index: number, device: Device): string {
    return device.devui;
  }
}
