import { Component, OnInit } from '@angular/core';
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
        devui: new FormControl(
          '',
          Validators.required,
          this.hexPatternValidator
        ),
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

  onSubmit() {
    console.info(this.deviceForm.value);
  }
}
