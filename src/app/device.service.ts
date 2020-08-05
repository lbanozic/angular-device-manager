import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Device } from './device';
import { DEVICES } from './device-mock';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  devices$ = new Subject<Device[]>();
  private deviceList: Device[] = DEVICES;

  constructor() {}

  getDevices() {
    this.devices$.next(this.deviceList);
  }

  addDevice(device: Device) {
    this.deviceList.push(device);
    this.devices$.next(this.deviceList);
  }
}
