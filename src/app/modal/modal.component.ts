import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import {
  Component,
  ViewChild,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'dm-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() title: string;

  @Output() modalClosed = new EventEmitter();

  @ViewChild(CdkPortal)
  modalTemplate: CdkPortal;

  private overlayRef: OverlayRef;

  constructor(private overlay: Overlay) {}

  show() {
    this.overlayRef = this.overlay.create(this.getOverlayConfig());
    this.overlayRef.attach(this.modalTemplate);
    this.overlayRef.backdropClick().subscribe(() => this.hide());
  }

  hide() {
    this.overlayRef.detach();
    this.modalClosed.emit();
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
