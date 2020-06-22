import { Component, Input, OnInit } from '@angular/core';
import { Device } from '../device';

@Component({
  selector: 'dm-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css'],
})
export class DeviceComponent implements OnInit {
  @Input() device: Device;

  constructor() {}

  ngOnInit(): void {}
}
