import { DatatableColumns } from '../../../../entities/datatable/datatable-columns';
import {Component, OnInit} from '@angular/core';
@Component({
  selector: 'app-approve-police-officer',
  templateUrl: './approve-police-officer.component.html',
  styleUrls: ['./approve-police-officer.component.scss']
})
export class ApprovePoliceOfficerComponent implements OnInit {
  cols: Array<DatatableColumns>;
  endpoint = 'app/rest/v2/entities/ecurfew_PoliceOfficer/search?filter=%7B%22conditions%22%3A%20%5B%7B%22property%22%3A%20%22actionStatus%22%2C%22operator%22%3A%20%22%3D%22%2C%22value%22%3A%20%22UNAPPROVED%22%20%7D%5D%7D&returnCount=true&view=policeOfficer-view&sort=-createTs';
  hasCheckBox = true;
  idColumn = 'id';
  params: Map<any, string>;
  routeView = '/home/user-management/users/{0}/view-user';

  constructor() {
    this.cols = [];
    this.params = new Map();
    this.params.set('sort', 'id');
    // this.params.set('actionStatus', 'Unapproved');
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
      title: 'Service Number',
      data: 'serviceNumber'
    });
    this.cols.push({
      title: 'National Id',
      data: 'nationalId'
    });
    this.cols.push({
      title: 'Rank',
      data: 'rank.rankName'
    });
    this.cols.push({
      title: 'Action',
      data: 'action'
    });
    this.cols.push({
      title: 'Action Status',
      data: 'actionStatus'
    });
    this.cols.push({
      title: 'Created Date',
      data: 'createTs',
      isDate: true
    });
    this.cols.push({
      title: 'View',
      data: 'id',
      isViewMore: true
    });

  }

}
