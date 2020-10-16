import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Notify} from '../shared/class/notify';
import { MatButtonModule } from '@angular/material/button';
import { BiometricsComponent } from './biometrics.component';
import { BiometricsRoutingModule } from './biometrics-routing';



@NgModule({
  declarations: [BiometricsComponent],
  imports: [
    CommonModule,
    BiometricsRoutingModule,
    FormsModule,
    MatButtonModule
  ],
  providers: [Notify]
})
export class BiometricsPageModule {
}
