import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceComponent } from './device/device.component';
import { IconInfoComponent } from './icons/icon-info/icon-info.component';
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
  ],
  imports: [BrowserModule, AppRoutingModule, PortalModule, OverlayModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
