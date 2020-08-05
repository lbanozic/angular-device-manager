import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Device, DeviceStatus } from './device';
import { DEVICES } from './device-mock';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  devices$ = new Subject<Device[]>();

  private deviceList: Device[] = DEVICES;
  private deviceListFiltered: Device[] = DEVICES;

  private deviceStatusFilters: string[] = [
    DeviceStatus.Alarm,
    DeviceStatus.NoData,
    DeviceStatus.Ok,
  ];

  constructor() {}

  getDevices() {
    this.devices$.next(this.deviceListFiltered);
  }

  addDevice(device: Device) {
    this.deviceList.push(device);
    this.deviceListFiltered = this.getFilteredDeviceList(this.deviceList);
    this.devices$.next(this.deviceListFiltered);
  }

  applyFilters(deviceStatusFilters: string[]) {
    this.deviceStatusFilters = deviceStatusFilters;
    this.deviceListFiltered = this.getFilteredDeviceList(this.deviceList);
    this.devices$.next(this.deviceListFiltered);
  }

  private getFilteredDeviceList(devicesToFilter: Device[]) {
    return devicesToFilter.filter((device) =>
      this.deviceStatusFilters.includes(device.status)
    );
  }
}
