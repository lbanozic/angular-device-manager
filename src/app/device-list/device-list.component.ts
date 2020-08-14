import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { Device } from '../device';
import { DeviceService } from '../device.service';

@Component({
  selector: 'dm-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css'],
})
export class DeviceListComponent implements OnInit, OnDestroy {
  devices: Device[];

  isLoading = false;

  private deviceSubscription: Subscription;
  private deviceUpdaterTimerSubscription: Subscription;

  constructor(private deviceService: DeviceService) {}

  ngOnInit(): void {
    this.deviceSubscription = this.deviceService.devices$.subscribe(
      (deviceList) => {
        this.isLoading = true;
        setTimeout(() => {
          this.devices = this.deviceService.getSortedDevices(deviceList);
          this.isLoading = false;
        });
      }
    );

    this.deviceUpdaterTimerSubscription = timer(10000, 10000).subscribe(() =>
      this.deviceService.updateDeviceReadings()
    );

    this.deviceService.generateDevices();
  }

  ngOnDestroy(): void {
    this.deviceSubscription.unsubscribe();
    this.deviceUpdaterTimerSubscription.unsubscribe();
  }

  trackByDevui(index: number, device: Device): string {
    return device.devui;
  }
}
