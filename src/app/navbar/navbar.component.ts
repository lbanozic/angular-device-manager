import { Component, OnInit, ViewChild } from '@angular/core';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';
import { DeviceFormComponent } from '../device-form/device-form.component';
import { DeviceService } from '../device.service';
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

  @ViewChild(AutocompleteComponent)
  deviceAutocompleteComponent: AutocompleteComponent;

  constructor(private deviceService: DeviceService) {}

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

  showDeviceAutocomplete() {
    this.deviceAutocompleteComponent.show();
  }

  onDeviceSearchInput(searchTerm: string) {
    this.deviceService.deviceSearchTerm$.next(searchTerm);
  }
}
