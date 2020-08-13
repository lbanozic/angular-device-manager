import { Component, OnInit, OnDestroy } from '@angular/core';
import { Device } from '../device';
import { DeviceService } from '../device.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dm-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css'],
})
export class DeviceListComponent implements OnInit, OnDestroy {
  devices: Device[];

  isLoading = false;

  private deviceSubscription: Subscription;

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

    this.deviceService.generateDevices();
  }

  ngOnDestroy(): void {
    this.deviceSubscription.unsubscribe();
  }

  trackByItems(index: number, device: Device): string {
    return device.devui;
  }
}
