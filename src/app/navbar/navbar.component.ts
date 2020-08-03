import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'dm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  pageTitle = 'Angular Device Manager';

  @ViewChild(ModalComponent)
  public newDeviceModal: ModalComponent;

  constructor() {}

  ngOnInit(): void {}

  showNewDeviceModal() {
    this.newDeviceModal.show();
  }
}
