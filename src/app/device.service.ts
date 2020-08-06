import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Device, DeviceStatus } from './device';
import { DEVICES } from './device-mock';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  devices$ = new Subject<Device[]>();
  deviceSearchTerm$ = new Subject<string>();

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

  getSortedDevices(devicesToSort: Device[]) {
    return devicesToSort.sort((device1, device2) => {
      if (device1.name.toLowerCase() > device2.name.toLowerCase()) {
        return 1;
      }
      if (device1.name.toLowerCase() < device2.name.toLowerCase()) {
        return -1;
      }
      return 0;
    });
  }

  getDevicesBySearchTerm(
    devicesToSearch: Device[],
    searchTerm: string
  ): Device[] {
    return devicesToSearch.filter(
      (device) =>
        device.name.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
        device.devui.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
  }

  private getFilteredDeviceList(devicesToFilter: Device[]) {
    return devicesToFilter.filter((device) =>
      this.deviceStatusFilters.includes(device.status)
    );
  }
}
