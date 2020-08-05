import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { DeviceFormComponent } from '../device-form/device-form.component';

@Component({
  selector: 'dm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  pageTitle = 'Angular Device Manager';

  @ViewChild(ModalComponent)
  public deviceFormModalComponent: ModalComponent;

  @ViewChild(DeviceFormComponent)
  public deviceFormComponent: DeviceFormComponent;

  constructor() {}

  ngOnInit(): void {}

  showDeviceFormModal() {
    this.deviceFormModalComponent.show();
  }

  onDeviceModalClosed() {
    this.deviceFormComponent.resetDeviceForm();
  }
}
