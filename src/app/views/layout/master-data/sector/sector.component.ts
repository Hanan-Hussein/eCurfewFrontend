import {Component, OnInit} from '@angular/core';
import {DatatableColumns} from '../../../../entities/datatable/datatable-columns';

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.scss']
})
export class SectorComponent implements OnInit {
  cols: Array<DatatableColumns>;
  endpoint = 'fortis/rest/v2/entities/fortis_Sector?returnCount=true&view=sector-view';
  routeView = 'home/master-data/sector/{0}/view-sector';
  hasCheckBox = true;
  idColumn = 'id';
  params: Map<any, string>;

  constructor() {
    this.cols = [];
    this.params = new Map();
    this.params.set('sort', 'code,asc');
  }
  ngOnInit() {
    this.cols.push({
    isCheckBox: true,
    title: '',
    data: 'id'
    });
    // this.cols.push({
    // title: 'Entity Name',
    // data: '_entityName'
    // });

    this.cols.push({
    title: 'Code',
    data: 'code'
    });
    this.cols.push({
    title: 'Description',
    data: 'description'
    });
    this.cols.push({
      title: 'Created at',
      data: 'createTs'
    });
    this.cols.push({
      title: 'Created By',
      data: 'createdBy'
    });
    this.cols.push({
    data: 'id',
    title: 'View',
    isViewMore: true,
    });
    }

    }
