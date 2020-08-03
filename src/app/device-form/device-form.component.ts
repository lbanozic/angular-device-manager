import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'dm-device-form',
  templateUrl: './device-form.component.html',
  styleUrls: ['./device-form.component.css'],
})
export class DeviceFormComponent implements OnInit {
  deviceForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.deviceForm = new FormGroup(
      {
        devui: new FormControl('', [
          Validators.required,
          Validators.pattern('#+([a-fA-F0-9]{6})$'),
        ]),
        min: new FormControl(''),
        max: new FormControl(''),
        name: new FormControl('', Validators.required),
      },
      this.minMaxValidator
    );
  }

  get devui() {
    return this.deviceForm.get('devui');
  }

  get min() {
    return this.deviceForm.get('min');
  }

  get max() {
    return this.deviceForm.get('max');
  }

  get name() {
    return this.deviceForm.get('name');
  }

  get minMaxValidator(): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      const minValue = control.get('min').value;
      const maxValue = control.get('max').value;

      return minValue && maxValue && minValue > maxValue
        ? { minMaxInvalid: true }
        : null;
    };
  }

  onSubmit() {
    console.info(this.deviceForm.value);
  }
}
