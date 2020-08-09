import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Device, DeviceStatus } from './device';
import { generateRandomDevices } from './device-generator';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  devices$ = new Subject<Device[]>();
  deviceSearchTerm$ = new Subject<string>();

  private deviceList: Device[];
  private deviceListFiltered: Device[];

  private deviceStatusFilters: string[] = [
    DeviceStatus.Alarm,
    DeviceStatus.NoData,
    DeviceStatus.Ok,
  ];

  constructor() {}

  getDevices() {
    generateRandomDevices(1000).then((devices) => {
      this.deviceList = devices;
      this.deviceListFiltered = devices;
      this.devices$.next(this.deviceListFiltered);
    });
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

  getSortedDevices(devicesToSort: Device[]): Device[] {
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

  doesDeviceExists(devui: string): boolean {
    return this.deviceList.some(
      (device) => device.devui.toLowerCase() === devui.toLowerCase()
    );
  }

  private getFilteredDeviceList(devicesToFilter: Device[]): Device[] {
    return devicesToFilter.filter((device) =>
      this.deviceStatusFilters.includes(device.status)
    );
  }
}
