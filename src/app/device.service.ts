import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Device } from './device';
import { DEVICES } from './device-mock';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  constructor() {}

  getDevices(): Observable<Device[]> {
    return of(DEVICES);
  }
}
