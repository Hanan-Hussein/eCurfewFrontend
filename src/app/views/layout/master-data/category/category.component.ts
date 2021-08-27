import { Component, OnInit } from '@angular/core';
import {DatatableColumns} from '../../../../entities/datatable/datatable-columns';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  cols: Array<DatatableColumns>;
  endpoint = 'app/rest/v2/entities/ecurfew_Category?returnCount=true&view=category-view&sort=-createTs';
  routeView = 'home/master-data/category/{0}/view-category';
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
        title: 'Category Code',
        data: 'categoryCode'
        });
      this.cols.push({
      title: 'Category Name',
      data: 'name'
      });
      this.cols.push({
        title: 'Description',
        data: 'description'
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
