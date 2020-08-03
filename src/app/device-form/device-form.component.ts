import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'dm-device-form',
  templateUrl: './device-form.component.html',
  styleUrls: ['./device-form.component.css'],
})
export class DeviceFormComponent implements OnInit {
  deviceForm = new FormGroup({
    devui: new FormControl('', [
      Validators.required,
      Validators.pattern('#+([a-fA-F0-9]{6})$'),
    ]),
    min: new FormControl(''),
    max: new FormControl(''),
    name: new FormControl('', Validators.required),
  });

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    console.info(this.deviceForm.value);
  }
}
