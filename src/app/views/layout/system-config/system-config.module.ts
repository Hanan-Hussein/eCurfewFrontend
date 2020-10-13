import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemConfigRoutingModule } from './system-config-routing.module';
import { ConfigComponent } from './config/config.component';
import { PasswordComplexityComponent } from './password-complexity/password-complexity.component';
import { SystemIntegrationsComponent } from './system-integrations/system-integrations.component';
import { GlobalConfigComponent } from './global-config/global-config.component';
import { CommissionConfigurationsComponent } from './commission-configurations/commission-configurations.component';
import { ViewConfigurationComponent } from './view-configuration/view-configuration.component';
import { ApproveConfigurationComponent } from './approve-configuration/approve-configuration.component';
import { SwitchConfigsComponent } from './switch-configs/switch-configs.component';
import {UtilModule} from '../util/util.module';
import {FormsModule} from '@angular/forms';
import { ForexComponent } from './forex/forex.component';
import { CreateforexComponent } from './createforex/createforex.component';
import { ViewForexComponent } from './view-forex/view-forex.component';

import {UfsExportService} from '../util/ufs-export.service';
import { DeleteDialogComponent } from '../util/functionality-buttons/delete-dialog/delete-dialog.component';
import { ApproveDialogComponent } from '../util/functionality-buttons/approve-dialog/approve-dialog.component';
import { DeclineDialogComponent } from '../util/functionality-buttons/decline-dialog/decline-dialog.component';
import { PaymentProviderComponent } from './payment-provider/payment-provider.component';
import { CreatePaymentProviderComponent } from './create-payment-provider/create-payment-provider.component';
import { ApprovePaymentProviderComponent } from './approve-payment-provider/approve-payment-provider.component';
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




@NgModule({
  declarations: [ConfigComponent, 
    PasswordComplexityComponent, SystemIntegrationsComponent,
     GlobalConfigComponent, CommissionConfigurationsComponent, 
     ViewConfigurationComponent, ApproveConfigurationComponent,
      SwitchConfigsComponent, ForexComponent, CreateforexComponent, 
      ViewForexComponent, PaymentProviderComponent, 
      CreatePaymentProviderComponent, ApprovePaymentProviderComponent,
      PaymentProviderChargesComponent,CreatePaymentProviderChargesComponent,
      ApprovePaymentProviderChargesComponent,StaggeredProviderChargesComponent,
      CreateStaggeredProviderChargesComponent,ApproveStaggeredProviderChargesComponent,
       MerchantFeesComponent, CreateMerchantFeesComponent, ApproveMerchantFeesComponent, 
       CustomerFeesComponent, CreateCustomerFeesComponent, ApproveCustomerFeesComponent ],
  imports: [
    CommonModule,
    SystemConfigRoutingModule,
    UtilModule,
    FormsModule
  ],
  entryComponents: [
    DeleteDialogComponent,
    ApproveDialogComponent,
    DeclineDialogComponent
  ],
  providers: [UfsExportService]
})
export class SystemConfigModule { }
