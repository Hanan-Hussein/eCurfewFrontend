import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuditLogsComponent} from './audit-logs/audit-logs.component';
import {SessionLogsComponent} from './session-logs/session-logs.component';
import { IncomeReportsComponent } from './income-reports/income-reports.component';
import { TopUpRequestsComponent } from './top-up-requests/top-up-requests.component';
import { AccountingEntriesComponent } from './accounting-entries/accounting-entries.component';
import { ConsumptionReportComponent } from './consumption-report/consumption-report.component';
import {AuthenticationReportComponent}from './authentication-report/authentication-report.component';
import { CustomerReportsComponent } from './customer-reports/customer-reports.component';
import {UserReportComponent} from './user-report/user-report.component';


const routes: Routes = [
  {
    path: '', data: {title: 'reports'}, children: [
      {path: 'audit-logs', component: AuditLogsComponent},
      {path: 'session-logs', component: SessionLogsComponent},
      {path: 'income-reports', component: IncomeReportsComponent},
      {path: 'authentication-report', component: AuthenticationReportComponent},
      {path: 'top-up-reports', component: TopUpRequestsComponent},
      {path: 'accounting-entries', component:AccountingEntriesComponent},
      {path: 'consumption-reports', component:ConsumptionReportComponent},
      {path:  'customer-authorized-unauthorized-reports',component:CustomerReportsComponent},
      {path: 'user-authorized-unauthorized-reports',component:UserReportComponent}
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
