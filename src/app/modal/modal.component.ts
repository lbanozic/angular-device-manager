import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import { Component, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'dm-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() title: string;

  @ViewChild(CdkPortal)
  public modalTemplate: CdkPortal;

  private overlayRef: OverlayRef;

  constructor(private overlay: Overlay) {}

  public show() {
    this.overlayRef = this.overlay.create(this.getOverlayConfig());
    this.overlayRef.attach(this.modalTemplate);
    this.overlayRef.backdropClick().subscribe(() => this.hide());
  }

  public hide() {
    this.overlayRef.detach();
  }

  private getOverlayConfig(): OverlayConfig {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const scrollStrategy = this.overlay.scrollStrategies.reposition();

    return new OverlayConfig({
      hasBackdrop: true,
      positionStrategy,
      scrollStrategy,
    });
  }
}
