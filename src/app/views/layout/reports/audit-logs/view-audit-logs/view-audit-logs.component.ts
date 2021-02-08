import { Component, OnInit } from '@angular/core';
import {AuditTrail} from '../../../../../entities/wrappers/audit-trail';
// import {AuditTrail} from '../../../../../entities/';
import {ViewParamBase} from '../../../../../shared/base/viewParamBase';
import {StewardService} from '../../../../../shared/services/steward/steward.service';
import {Notify} from '../../../../../shared/class/notify';
import {ActivatedRoute} from '@angular/router';
import {routerTransition} from '../../../../../router.animations';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-view-audit-logs',
  templateUrl: './view-audit-logs.component.html',
  styleUrls: ['./view-audit-logs.component.scss'],
  animations: [routerTransition()]

})
export class ViewAuditLogsComponent implements OnInit {
  audit: AuditTrail;
  viewparam: Array<ViewParamBase>;
    objectKeys = Object.keys;
    subscription: Subscription;

  constructor(private stewardService: StewardService<any, any>,
    private notify: Notify,
    private route: ActivatedRoute) {
      this.viewparam = new Array<ViewParamBase>();

      this.audit = new AuditTrail();
      this.subscription = new Subscription();
   }

   ngOnInit() {
    this.route.params.subscribe(params => {
        if (params['id'] != null) {
            this.fetchAuditTrail(params['id']);
        }
    });
}
loadAudit() {
  let order = 1;
  const inst = this;
  inst.viewparam = [];
  inst.viewparam.push({
      value: inst.audit.user.name,
      label: 'User',
      order: 1,
  });
  inst.viewparam.push({
    value: inst.audit.type,
    label: 'Type',
    order: 2,
});
inst.viewparam.push({
  value: inst.audit.changes,
  label: 'Changes',
  order: 3,
});
inst.viewparam.push({
  value: inst.audit.user.login,
  label: 'Email',
  order: 3,
});
inst.viewparam.push({
  value: inst.audit.user.login,
  label: 'Email',
  order: 3,
});
inst.viewparam.push({
  value: inst.audit.eventTs,
  label: 'Date Occurence',
  order: 4,
});
inst.viewparam.push({
  value: inst.audit.entity,
  label: 'Entity',
  order: 5,
});
}

private fetchAuditTrail(id: any) {
  const inst = this;
  const order = 1;
  const params: Map<any, string> = new Map();
  params.set('view', 'audit-view');
  params.set('sort', '-eventTs');


  this.subscription.add(
  this.stewardService.get('fortis/rest/v2/entities/sec$EntityLog/' + id,params).subscribe((response:any) => {
      if (response) {
          inst.audit = response;
          inst.loadAudit();
      } else {
          this.notify.showWarning('Sorry record not found');
      }
  })
  );
}
}

