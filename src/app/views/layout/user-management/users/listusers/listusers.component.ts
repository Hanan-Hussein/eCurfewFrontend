import {Component, OnInit,inject} from '@angular/core';
import {NgModule} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NgForm} from '@angular/forms';
// import {StewardService} from '../shared/services/steward/steward.service';
import {DatatableColumns} from '../../../../../entities/datatable/datatable-columns';
// import { StewardService } from 'src/app/shared/services/steward/steward.service';
import {StewardService} from '../../../../../shared/services/steward/steward.service';
@Component({
  selector: 'app-listusers',
  templateUrl: './listusers.component.html',
  styleUrls: ['./listusers.component.scss'],

})
export class ListusersComponent implements OnInit {
  model: any = {};
  cols: Array<DatatableColumns>;
  endpoint = 'fortis/rest/v2/entities/fortis_FortisUser/search?filter=%7B%22conditions%22%3A%20%5B%7B%22property%22%3A%20%22active%22%2C%22operator%22%3A%20%22%3D%22%2C%22value%22%3A%20true%7D%5D%7D&returnCount=true&view=maker-checker-view&sort=-createTs';
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
