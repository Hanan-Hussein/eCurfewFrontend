import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {DataTableDirective} from 'angular-datatables';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.css']
})
export class DateFilterComponent {

  minDate = new Date();
  maxDate = new Date(2020, 0, 1);

  defaultTime = {hour: 13, minute: 30};
  meridianTime = {hour: 13, minute: 30};
  meridian = true;
  seconds = true;
  fromDate: Date;
  toDate: Date;

  @ViewChild(DataTableDirective, {static: false})
  datatableElement: DataTableDirective;

  @Output() submitForm = new EventEmitter<any>();
  @Input() filterParams: string;
  filter_needle: string;


  filterById(): void {
    const dateFiltered = {
      fromDate: this.fromDate, toDate: this.toDate, filter_needle: this.filter_needle
    };
    this.submitForm.emit(dateFiltered);
  }

}
