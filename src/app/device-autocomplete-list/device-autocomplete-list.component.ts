import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Device } from '../device';
import { DeviceService } from '../device.service';

@Component({
  selector: 'dm-device-autocomplete-list',
  templateUrl: './device-autocomplete-list.component.html',
  styleUrls: ['./device-autocomplete-list.component.css'],
})
export class DeviceAutocompleteListComponent implements OnInit, OnDestroy {
  autocompleteDevices: Device[];

  private devices: Device[];
  private searchTerm = '';

  private deviceSubscription: Subscription;
  private deviceSearchTermSubscription: Subscription;
  private pulseEffectRemoveTimerSubscription: Subscription;

  @Output() autocompleteResultClicked = new EventEmitter();

  constructor(private deviceService: DeviceService) {}

  ngOnInit(): void {
    this.deviceSubscription = this.deviceService.devices$.subscribe(
      (deviceList) => {
        const sortedDevices = this.deviceService.getSortedDevices(deviceList);
        this.devices = sortedDevices;
        this.autocompleteDevices = this.deviceService
          .getDevicesBySearchTerm(sortedDevices, this.searchTerm)
          .slice(0, 5);
      }
    );

    this.deviceSearchTermSubscription = this.deviceService.deviceSearchTerm$
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        tap((searchTerm) => {
          this.searchTerm = searchTerm;
          this.autocompleteDevices = this.deviceService
            .getDevicesBySearchTerm(this.devices, searchTerm)
            .slice(0, 5);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.deviceSubscription.unsubscribe();
    this.deviceSearchTermSubscription.unsubscribe();
    this.pulseEffectRemoveTimerSubscription.unsubscribe();
  }

  onAutocompleteResultClick(deviceElementId: string) {
    this.scrollToDeviceElement(deviceElementId);
    this.autocompleteResultClicked.emit();
  }

  scrollToDeviceElement(deviceElementId: string) {
    const deviceElement: HTMLElement = document.getElementById(deviceElementId);
    deviceElement.classList.add('pulse');
    deviceElement.scrollIntoView({ behavior: 'smooth' });
    this.pulseEffectRemoveTimerSubscription = timer(3000).subscribe(() =>
      deviceElement.classList.remove('pulse')
    );
  }
}
