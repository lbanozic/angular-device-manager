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

  constructor(private deviceService: DeviceService) {}

  ngOnInit(): void {
    this.deviceService.devices$.subscribe(
      (deviceList) =>
        (this.devices = this.deviceService.getSortedDevices(deviceList))
    );
    this.deviceService.getDevices();
  }
}
