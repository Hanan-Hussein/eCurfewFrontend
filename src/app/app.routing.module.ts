import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DefaultLayoutComponent} from './containers';
import { FirstChangeComponent } from './first-change/first-change.component';
import {P404Component} from './views/error/404.component';

export const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'landingPage',
  //   pathMatch: 'full',
  // },
  {
    path: 'landingPage',
    loadChildren:() => import('./landing-page/landing-page.module').then(m=>m.LandingPageModule)
  },
  {
    path:'biometrics',
    loadChildren:()=>import('./biometrics/biometrics.module').then(m=>m.BiometricsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'verify_otp',
    loadChildren: () => import('./verify-otp/verify-otp.module').then(m => m.VerifyOtpModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./change-password/change-password.module').then(m => m.ChangeComponentModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
  },
  {
    path: 'setup',
    loadChildren: () => import('./setup/setup.module').then(m => m.SetupModule)
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {path: 'home', loadChildren: () => import('./views/layout/layout.module').then(m => m.LayoutModule)},
    ]
  },
  {path: 'first-change', component: FirstChangeComponent},
  {path: '**', component: P404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
