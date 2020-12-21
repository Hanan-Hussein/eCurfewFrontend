import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {DatatableColumns} from '../../../../../entities/datatable/datatable-columns';
import {StewardService} from '../../../../../shared/services/steward/steward.service';

@Component({
  selector: 'app-locked-users',
  templateUrl: './locked-users.component.html',
  styleUrls: ['./locked-users.component.scss']
})
export class LockedUsersComponent implements OnInit {

  model: any = {};
  cols: Array<DatatableColumns>;
  endpoint = 'fortis/rest/v2/entities/fortis_FortisUser?returnCount=true&active=false';
  hasCheckBox = true;
  idColumn = 'id';
  params: Map<any, string>;
  routeView = '/home/user-management/users/{0}/view-user';
  users:any = [];
  constructor(
    private stewardService: StewardService<any, any>,
  ) {
    this.cols = [];
    this.params = new Map();

    this.params.set('sort', 'id,desc');
  }

  ngOnInit() {


    this.cols.push({
      isCheckBox: true,
      title: '',
      data: 'id',
    });
    this.cols.push({
      title: 'First Name',
      data: 'firstName'
    });
    this.cols.push({
      title: 'Last Name',
      data: 'lastName'
    });
    this.cols.push({
      title: 'Email',
      data: 'email',
    });
    this.cols.push({
      title: 'Phone Number',
      data: 'phoneNumber'
    });
    this.cols.push({
      title: 'Action Status',
      data: 'actionStatus'
    });
    this.cols.push({
      title: 'View',
      data: 'id',
      isViewMore: true
    });

  }


}
