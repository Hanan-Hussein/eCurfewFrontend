import { Component, OnInit } from '@angular/core';
import { isDate } from 'moment';
import {DatatableColumns} from '../../../../entities/datatable/datatable-columns';


@Component({
  selector: 'app-police-station',
  templateUrl: './police-station.component.html',
  styleUrls: ['./police-station.component.scss']
})
export class PoliceStationComponent implements OnInit {
  cols: Array<DatatableColumns>;
  endpoint = 'app/rest/v2/entities/ecurfew_PoliceStation?returnCount=true&view=policeStation-view&sort=-createTs';
  routeView = 'home/master-data/police-station/{0}/view-police-station';
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
      this.cols.push({
      title: 'Station Code',
      data: 'stationCode'
      });
      this.cols.push({
      title: 'Station Code',
      data: 'nameOfStation'
      });
      this.cols.push({
        title: 'County',
        data: 'county'
        });
      this.cols.push({
        title: 'Location',
        data: 'location'
      });
      this.cols.push({
        title: 'Head Of Station',
        data: 'headOfStation'
      });
      this.cols.push({
        title: 'Created at',
        data: 'createTs',
        isDate: true
      });
      this.cols.push({
      data: 'id',
      title: 'View',
      isViewMore: true,
      });
      }
    }
