import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Device } from '../device';
import { PopoverComponent } from '../popover/popover.component';

@Component({
  selector: 'dm-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css'],
})
export class DeviceComponent implements OnInit {
  @Input() device: Device;

  @ViewChild(PopoverComponent)
  batteryAndSignalIndicatorPopover: PopoverComponent;

  readonly colorRed: string = '#dc3545';
  readonly colorBlack: string = '#000';

  constructor() {}

  ngOnInit(): void {}

  get iconColor(): string {
    if (this.device.batteryLevel < 50 || this.device.signalStrength < 5) {
      return this.colorRed;
    }
    return this.colorBlack;
  }

  get deviceBatteryLevelTextColor(): string {
    if (this.device.batteryLevel < 50) {
      return this.colorRed;
    }
    return this.colorBlack;
  }

  get signalStrengthTextColor(): string {
    if (this.device.signalStrength < 5) {
      return this.colorRed;
    }
    return this.colorBlack;
  }

  get deviceReading(): string {
    return this.device.reading?.toString() ?? '-';
  }

  showBatteryAndSignalIndicatorPopover() {
    this.batteryAndSignalIndicatorPopover.show();
  }
}
