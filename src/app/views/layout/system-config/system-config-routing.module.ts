import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuard} from '../../../shared/guard';

import { CreateforexComponent } from './createforex/createforex.component';
import { ForexComponent } from './forex/forex.component';
import { ViewForexComponent } from './view-forex/view-forex.component';
import { PaymentProviderComponent } from './payment-provider/payment-provider.component';
import { CreatePaymentProviderComponent } from './create-payment-provider/create-payment-provider.component';
import { ApprovePaymentProviderComponent } from './approve-payment-provider/approve-payment-provider.component';
import { PasswordComplexityComponent } from './password-complexity/password-complexity.component';
import { SystemIntegrationsComponent } from './system-integrations/system-integrations.component';
import { SwitchConfigsComponent } from './switch-configs/switch-configs.component';
import { GlobalConfigComponent } from './global-config/global-config.component';
import { CommissionConfigurationsComponent } from './commission-configurations/commission-configurations.component';
import { ApproveConfigurationComponent } from './approve-configuration/approve-configuration.component';
import { ViewConfigurationComponent } from './view-configuration/view-configuration.component';
import { PaymentProviderChargesComponent } from './payment-provider-charges/payment-provider-charges.component';
import { CreatePaymentProviderChargesComponent } from './create-payment-provider-charges/create-payment-provider-charges.component';
import { ApprovePaymentProviderChargesComponent } from './approve-payment-provider-charges/approve-payment-provider-charges.component';
import { StaggeredProviderChargesComponent } from './staggered-provider-charges/staggered-provider-charges.component';
import { CreateStaggeredProviderChargesComponent } from './create-staggered-provider-charges/create-staggered-provider-charges.component';
import { ApproveStaggeredProviderChargesComponent } from './approve-staggered-provider-charges/approve-staggered-provider-charges.component';
import { MerchantFeesComponent } from './merchant-fees/merchant-fees.component';
import { CreateMerchantFeesComponent } from './create-merchant-fees/create-merchant-fees.component';
import { ApproveMerchantFeesComponent } from './approve-merchant-fees/approve-merchant-fees.component';
import { CustomerFeesComponent } from './customer-fees/customer-fees.component';
import { CreateCustomerFeesComponent } from './create-customer-fees/create-customer-fees.component';
import { ApproveCustomerFeesComponent } from './approve-customer-fees/approve-customer-fees.component';


const routes: Routes = [
  {
    path: 'switch-config', component: SwitchConfigsComponent, data: {title: 'Switch Configs'},
    canActivate: [AuthGuard]
  },
  {
    path: 'system-integrations', component: SystemIntegrationsComponent, data: {title: 'System Integration'},
    canActivate: [AuthGuard]
  },
  {
    path: 'password-complexity', component: PasswordComplexityComponent, data: {title: 'Password Complexity'},
    canActivate: [AuthGuard]
  },
  {
    path: 'global-config', component: GlobalConfigComponent, data: {title: 'Global Configuration'},
    canActivate: [AuthGuard]
  },
  {
    path: 'commission-config', component: CommissionConfigurationsComponent, data: {title: 'Commission Config'},
    canActivate: [AuthGuard]
  },
  {
    path: 'approve-configuration', component: ApproveConfigurationComponent, data: {title: 'Approve Config'},
    canActivate: [AuthGuard]
  },
  {
    path: 'config/:id/view-config', component: ViewConfigurationComponent, data: {title: 'View Config'},
    canActivate: [AuthGuard]
  },

  {path: 'providers', component: PaymentProviderComponent, canActivate: [AuthGuard]},
  {path: 'providers/create-provider', component: CreatePaymentProviderComponent, canActivate: [AuthGuard]},
  {path: 'providers/:id/view-provider', component: CreatePaymentProviderComponent, canActivate: [AuthGuard]},
  {path: 'providers/approve-provider', component: ApprovePaymentProviderComponent, canActivate: [AuthGuard]},

  {path: 'providers-charges', component: PaymentProviderChargesComponent, canActivate: [AuthGuard]},
  {path: 'providers-charges/create-provider', component: CreatePaymentProviderChargesComponent, canActivate: [AuthGuard]},
  {path: 'providers-charges/:id/view-provider', component: CreatePaymentProviderChargesComponent, canActivate: [AuthGuard]},
  {path: 'providers-charges/approve-provider', component: ApprovePaymentProviderChargesComponent, canActivate: [AuthGuard]},

  {path: 'provider-staggered-charge', component: StaggeredProviderChargesComponent, canActivate: [AuthGuard]},
  {path: 'provider-staggered-charge/create-provider', component: CreateStaggeredProviderChargesComponent, canActivate: [AuthGuard]},
  {path: 'provider-staggered-charge/:id/view-provider', component: CreateStaggeredProviderChargesComponent, canActivate: [AuthGuard]},
  {path: 'provider-staggered-charge/approve-provider', component: ApproveStaggeredProviderChargesComponent, canActivate: [AuthGuard]},

  {path: 'merchant-fees-charges', component: MerchantFeesComponent, canActivate: [AuthGuard]},
  {path: 'merchant-fees-charges/create-provider', component: CreateMerchantFeesComponent, canActivate: [AuthGuard]},
  {path: 'merchant-fees-charges/:id/view-provider', component: CreateMerchantFeesComponent, canActivate: [AuthGuard]},
  {path: 'merchant-fees-charges/approve-merchant', component: ApproveMerchantFeesComponent, canActivate: [AuthGuard]},

  {path: 'customer-fees-charges', component: CustomerFeesComponent, canActivate: [AuthGuard]},
  {path: 'customer-fees-charges/create-provider', component: CreateCustomerFeesComponent, canActivate: [AuthGuard]},
  {path: 'customer-fees-charges/:id/view-provider', component: CreateCustomerFeesComponent, canActivate: [AuthGuard]},
  {path: 'customer-fees-charges/approve-customer', component: ApproveCustomerFeesComponent, canActivate: [AuthGuard]},
 
  
  
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemConfigRoutingModule {
}
