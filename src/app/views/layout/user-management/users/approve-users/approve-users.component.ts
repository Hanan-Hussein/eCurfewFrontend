import {DatatableColumns} from '../../../../../entities/datatable/datatable-columns';
import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-approve-users',
  templateUrl: './approve-users.component.html',
  styleUrls: ['./approve-users.component.scss']
})
export class ApproveUsersComponent implements OnInit {
  cols: Array<DatatableColumns>;
  endpoint = 'user';
  hasCheckBox = true;
  idColumn = 'userId';
  params: Map<any, string>;
  routeView = '/home/user-management/users/{0}/view-user';

  constructor() {
    this.cols = [];
    this.params = new Map();
    this.params.set('sort', 'userId,desc');
    this.params.set('actionStatus', 'Unapproved');
  }

  ngOnInit() {
    this.cols.push({
      isCheckBox: true,
      title: '',
      data: 'userId',
    });
    this.cols.push({
      title: 'Full Name',
      data: 'fullName'
    });
    this.cols.push({
      title: 'Email',
      data: 'email',
    });
    this.cols.push({
      title: 'Phone Number',
      data: 'phoneNumber'
    });
    // this.cols.push({
    //   title: 'User Type',
    //   data: 'userType.userType'
    // });
    this.cols.push({
      title: 'Date Created',
      data: 'creationDate',
      isDate: true
    });
    this.cols.push({
      title: 'Status',
      data: 'actionStatus'
    });
    this.cols.push({
      title: 'View',
      data: 'userId',
      isViewMore: true
    });

  }

}
