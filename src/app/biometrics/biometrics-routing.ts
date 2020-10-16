import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { BiometricsComponent } from './biometrics.component';




const routes: Routes = [
  {
    path: '',
    component: BiometricsComponent,
    data: {title: 'biometrics'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BiometricsRoutingModule {
}
