import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Device, DeviceStatus } from './device';
import { generateRandomDevices } from './device-generator';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  devices$: Observable<Device[]>;
  deviceSearchTerm$: Observable<string>;

  private devicesSource = new Subject<Device[]>();
  private deviceSearchTermSource = new Subject<string>();

  private deviceList: Device[];
  private deviceListFiltered: Device[];

  private numberOfDevices = 1000;

  private deviceStatusFilters: string[] = [
    DeviceStatus.Alarm,
    DeviceStatus.NoData,
    DeviceStatus.Ok,
  ];

  constructor() {
    this.devices$ = this.devicesSource.asObservable();
    this.deviceSearchTerm$ = this.deviceSearchTermSource.asObservable();
  }

  generateDevices() {
    generateRandomDevices(this.numberOfDevices).then((devices) => {
      this.deviceList = devices;
      this.deviceListFiltered = devices;
      this.devicesSource.next(this.deviceListFiltered);
    });
  }

  addDevice(device: Device) {
    this.deviceList.push(device);
    this.deviceListFiltered = this.getFilteredDeviceList(this.deviceList);
    this.devicesSource.next(this.deviceListFiltered);
  }

  applyFilters(deviceStatusFilters: string[]) {
    this.deviceStatusFilters = deviceStatusFilters;
    this.deviceListFiltered = this.getFilteredDeviceList(this.deviceList);
    this.devicesSource.next(this.deviceListFiltered);
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

  searchDevice(searchTerm: string) {
    this.deviceSearchTermSource.next(searchTerm);
  }

  private getFilteredDeviceList(devicesToFilter: Device[]): Device[] {
    return devicesToFilter.filter((device) =>
      this.deviceStatusFilters.includes(device.status)
    );
  }
}
