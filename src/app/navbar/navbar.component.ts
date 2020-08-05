import { Component, OnInit, ViewChild } from '@angular/core';
import { DeviceFormComponent } from '../device-form/device-form.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'dm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  pageTitle = 'Angular Device Manager';

  @ViewChild(ModalComponent)
  deviceFormModalComponent: ModalComponent;

  @ViewChild(DeviceFormComponent)
  deviceFormComponent: DeviceFormComponent;

  constructor() {}

  ngOnInit(): void {}

  showDeviceFormModal() {
    this.deviceFormModalComponent.show();
  }

  onDeviceModalClosed() {
    this.deviceFormComponent.resetDeviceForm();
  }

  onDeviceFormSubmitted() {
    this.deviceFormModalComponent.hide();
  }
}
