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
    this.deviceService.devices$.subscribe((deviceList) => {
      this.devices = deviceList;
      this.devices.sort((device1, device2) => {
        if (device1.name > device2.name) {
          return 1;
        }
        if (device1.name < device2.name) {
          return -1;
        }
        return 0;
      });
    });
    this.deviceService.getDevices();
  }
}
