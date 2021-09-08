import {Component, OnInit, inject} from '@angular/core';
import {NgModule} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import {DatatableColumns} from '../../../../entities/datatable/datatable-columns';
import {StewardService} from '../../../../shared/services/steward/steward.service';
@Component({
  selector: 'app-list-essential-workers',
  templateUrl: './list-essential-workers.component.html',
  styleUrls: ['./list-essential-workers.component.scss']
})
export class ListEssentialWorkersComponent implements OnInit {
  model: any = {};
  cols: Array<DatatableColumns>;
  endpoint = 'app/rest/v2/entities/ecurfew_EssentialWorkers?returnCount=true&view=essentialWorkers-view&sort=-createTs';
  hasCheckBox = true;
  idColumn = 'id';
  params: Map<any, string>;
  routeView = '/home/citizens/essential-worker/{0}/view-essential-worker';
  users: any = [];
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
      title: 'Employee Number',
      data: 'employeeNumber'
    });
    this.cols.push({
      title: 'National Id',
      data: 'nationalId'
    });
    this.cols.push({
      title: 'Category',
      data: 'category.name'
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

