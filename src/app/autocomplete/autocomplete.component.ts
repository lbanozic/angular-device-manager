import {
  ConnectedPosition,
  Overlay,
  OverlayConfig,
  OverlayRef,
  OverlaySizeConfig,
} from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import { Component, HostListener, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'dm-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
})
export class AutocompleteComponent {
  @Input()
  autocompleteTrigger: HTMLElement;

  @ViewChild(CdkPortal)
  autocompleteTemplate: CdkPortal;

  private overlayRef: OverlayRef;

  private overlayPositions: ConnectedPosition[] = [
    {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
    },
    {
      originX: 'end',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'bottom',
    },
  ];

  constructor(private overlay: Overlay) {}

  show() {
    this.overlayRef = this.overlay.create(this.getOverlayConfig());
    this.overlayRef.attach(this.autocompleteTemplate);
    this.updateOverlayWidth();
    this.overlayRef.backdropClick().subscribe(() => this.hide());
  }

  hide() {
    this.overlayRef.detach();
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.updateOverlayWidth();
  }

  private getOverlayConfig(): OverlayConfig {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.autocompleteTrigger)
      .withPositions(this.overlayPositions);

    const scrollStrategy = this.overlay.scrollStrategies.reposition();

    return new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      positionStrategy,
      scrollStrategy,
    });
  }

  private updateOverlayWidth() {
    if (!this.overlayRef) {
      return;
    }

    const autocompleteTriggerDOMRect = this.autocompleteTrigger.getBoundingClientRect();

    const sizeConfig: OverlaySizeConfig = {
      width: autocompleteTriggerDOMRect.width,
    };

    this.overlayRef.updateSize(sizeConfig);
  }
}
