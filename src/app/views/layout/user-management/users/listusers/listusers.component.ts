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
  endpoint = 'fortis/rest/v2/entities/fortis_FortisUser';
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
      title: 'Name',
      data: 'name'
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
      title: 'View',
      data: 'id',
      isViewMore: true
    });

  }

}
