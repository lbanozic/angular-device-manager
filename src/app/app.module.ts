import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeviceFiltersFormComponent } from './device-filters-form/device-filters-form.component';
import { DeviceFormComponent } from './device-form/device-form.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceComponent } from './device/device.component';
import { IconInfoComponent } from './icons/icon-info/icon-info.component';
import { IconPlusComponent } from './icons/icon-plus/icon-plus.component';
import { IconXComponent } from './icons/icon-x/icon-x.component';
import { ModalComponent } from './modal/modal.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PopoverComponent } from './popover/popover.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DeviceComponent,
    DeviceListComponent,
    IconInfoComponent,
    PopoverComponent,
    IconPlusComponent,
    ModalComponent,
    IconXComponent,
    DeviceFormComponent,
    DeviceFiltersFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PortalModule,
    OverlayModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
