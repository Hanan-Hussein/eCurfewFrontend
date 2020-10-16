import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Notify} from '../shared/class/notify';
import { MatButtonModule } from '@angular/material/button';
import { LandingPageComponent } from './landing-page.component';
import { LandingPageRoutingModule } from './landing-page-routing';


@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    FormsModule,
    MatButtonModule
  ],
  providers: [Notify]
})
export class LandingPageModule {
}
