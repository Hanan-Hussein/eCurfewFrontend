import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuditLogsComponent} from './audit-logs/audit-logs.component';
import {SessionLogsComponent} from './session-logs/session-logs.component';
import { IncomeReportsComponent } from './income-reports/income-reports.component';
import { TopUpRequestsComponent } from './top-up-requests/top-up-requests.component';
import { AccountingEntriesComponent } from './accounting-entries/accounting-entries.component';
import { ConsumptionReportComponent } from './consumption-report/consumption-report.component';


const routes: Routes = [
  {
    path: '', data: {title: 'reports'}, children: [
      {path: 'audit-logs', component: AuditLogsComponent},
      {path: 'session-logs', component: SessionLogsComponent},
      {path: 'income-reports', component: IncomeReportsComponent},
      {path: 'top-up-reports', component: TopUpRequestsComponent},
      {path: 'accounting-entries', component:AccountingEntriesComponent},
      {path: 'consumption-reports', component:ConsumptionReportComponent},
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
