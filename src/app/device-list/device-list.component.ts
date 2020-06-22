import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Device } from '../device';
import { DeviceService } from '../device.service';

@Component({
  selector: 'dm-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css'],
})
export class DeviceListComponent implements OnInit {
  devices$: Observable<Device[]>;

  constructor(private deviceService: DeviceService) {}

  ngOnInit(): void {
    this.devices$ = this.deviceService.getDevices();
  }

  getDevices(): Observable<Device[]> {
    return this.deviceService.getDevices();
  }
}
