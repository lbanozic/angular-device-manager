import {
  Overlay,
  OverlayConfig,
  OverlayRef,
  ConnectedPosition,
  OverlaySizeConfig,
} from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import { Component, HostListener, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'dm-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.css'],
})
export class PopoverComponent {
  @Input()
  popoverTrigger: HTMLElement;

  @ViewChild(CdkPortal)
  popoverTemplate: CdkPortal;

  private overlayRef: OverlayRef;

  private overlayPositions: ConnectedPosition[] = [
    {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
      offsetY: -40,
    },
    {
      originX: 'end',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'bottom',
      offsetY: 40,
    },
  ];

  constructor(private overlay: Overlay) {}

  show() {
    this.overlayRef = this.overlay.create(this.getOverlayConfig());
    this.overlayRef.attach(this.popoverTemplate);
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
      .flexibleConnectedTo(this.popoverTrigger)
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

    const popoverTriggerDOMRect = this.popoverTrigger.getBoundingClientRect();

    const sizeConfig: OverlaySizeConfig = {
      width: popoverTriggerDOMRect.width,
    };

    this.overlayRef.updateSize(sizeConfig);
  }
}
