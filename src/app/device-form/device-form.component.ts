import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  first,
  map,
} from 'rxjs/operators';
import { Device, DeviceStatus } from '../device';
import { DeviceService } from '../device.service';

@Component({
  selector: 'dm-device-form',
  templateUrl: './device-form.component.html',
  styleUrls: ['./device-form.component.css'],
})
export class DeviceFormComponent implements OnInit {
  @Output() formSubmitted = new EventEmitter();

  deviceForm: FormGroup;

  constructor(private deviceService: DeviceService) {}

  ngOnInit(): void {
    this.deviceForm = new FormGroup(
      {
        devui: new FormControl('', Validators.required, [
          this.hexPatternValidator,
          this.uniqueDevuiValidator,
        ]),
        min: new FormControl(''),
        max: new FormControl(''),
        name: new FormControl('', Validators.required),
      },
      [],
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

  get hexPatternValidator(): AsyncValidatorFn {
    return (
      control: FormControl
    ):
      | Promise<ValidationErrors | null>
      | Observable<ValidationErrors | null> => {
      if (control.value) {
        return control.valueChanges.pipe(
          debounceTime(1000),
          distinctUntilChanged(),
          map((value) =>
            new RegExp('#+([a-fA-F0-9]{6})$').test(value)
              ? null
              : { isHexPatternInvalid: true }
          ),
          first(),
          catchError(() => of(null))
        );
      }
      return of(null);
    };
  }

  get minMaxValidator(): AsyncValidatorFn {
    return (
      control: FormGroup
    ):
      | Promise<ValidationErrors | null>
      | Observable<ValidationErrors | null> => {
      if (control.value) {
        return control.valueChanges.pipe(
          debounceTime(1000),
          distinctUntilChanged(),
          map((formValues) =>
            formValues.min && formValues.max && formValues.min > formValues.max
              ? { minMaxInvalid: true }
              : null
          ),
          first(),
          catchError(() => of(null))
        );
      }
      return of(null);
    };
  }

  get uniqueDevuiValidator(): AsyncValidatorFn {
    return (
      control: FormControl
    ):
      | Promise<ValidationErrors | null>
      | Observable<ValidationErrors | null> => {
      if (control.value) {
        return control.valueChanges.pipe(
          debounceTime(1000),
          distinctUntilChanged(),
          map((value) =>
            this.deviceService.doesDeviceExists(value)
              ? { doesDevuiExist: true }
              : null
          ),
          first(),
          catchError(() => of(null))
        );
      }
      return of(null);
    };
  }

  resetDeviceForm() {
    this.deviceForm.reset();
  }

  onSubmit() {
    const device: Device = {
      name: this.name.value,
      devui: this.devui.value,
      creationDate: new Date(),
      min: this.min.value,
      max: this.max.value,
      batteryLevel: 100,
      signalStrength: 10,
      status: DeviceStatus.Ok,
    };
    this.deviceService.addDevice(device);
    this.formSubmitted.emit();
  }
}
