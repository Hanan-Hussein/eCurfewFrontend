import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {String} from 'typescript-string-operations';
import {DataTableDirective} from 'angular-datatables';
import {DatePipe} from '@angular/common';
import {DatatableColumns} from '../../../../entities/datatable/datatable-columns';
import {DtServiceService} from '../../../../shared/services/datatable-service/dt-service.service';
import {StewardService} from '../../../../shared/services/steward/steward.service';

export declare type SupportedExtensions = 'pdf' | 'png' | 'xlsx' | 'xls' | 'docx' | 'doc' | 'txt' | 'csv' | 'json' | 'xml';

@Component({
  selector: 'app-custom-datatable',
  templateUrl: './custom-datatable.component.html',
  styleUrls: ['./custom-datatable.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomDatatableComponent implements OnInit, AfterViewInit {

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, {static: false})
  datatableElement: DataTableDirective;
  @Input() endpoint: string;
  @Input() cols: Array<DatatableColumns>;
  column: Array<DataTables.ColumnSettings>;
  @Input() hasCheckBox: boolean;
  @Input() routeEdit: string;
  @Input() routeView: string;
  @Input() routeDelete: string;
  @Input() idColumn: string;
  @Input() params: Map<any, string>;
  page_size = '10';
  @Input() hasShowEntries: boolean;
  @Input() fileName: string;
  @Input() canExport: boolean;
  @Input() route: string;
  @Input() hasViewMore: boolean;

  colTitle: Array<DatatableColumns>;
  fromDate: Date;
  toDate: Date;
  @Input() filterParams: string;
  filter_needle: string;
  @Input() isFilterPresent: boolean;
  @ViewChild('custom_dt', {static: false}) table: ElementRef;

  constructor(
    private http: HttpClient,
    protected renderer: Renderer2,
    public router: Router,
    protected stewardService: StewardService<any, any>,
    private exportAsService: DtServiceService,
    private datePipe: DatePipe
  ) {
    this.colTitle = [];
    this.column = [];
  }

  ngOnInit() {
    this.cols.forEach(col => {
      if (col.isCheckBox) {
        this.column.push(
          {
            data: col.data,
            render: (id?: any) => ''
          });
      } else if (col.isDate) {
        this.column.push(
          {
            data: col.data,
            title: col.title,
            render: (d?: number) => {
              if (d != null) {
                return new Date(d).toLocaleString();
              } else {
                return 'N/A';
              }
            }
          });
        this.colTitle.push({title: col.title});
      } else if (col.isRender) {
        this.column.push(
          {
            data: col.data,
            title: col.title,
            render: (d?: any) => {
              return d[col.isRenderField];
            }
          });
        this.colTitle.push({title: col.title});
      } else if (col.isRenderStatus) {
        this.column.push(
          {
            data: col.data,
            title: col.title,
            render: (d?: number) => {
              if (d != null) {
                return d === 1 ? 'APPROVED' : 'PENDING';
              }
            }
          });
        this.colTitle.push({title: col.title});
      } else if (col.isViewMore && !col.isViewEdit && !col.isDelete) {
        this.column.push(
          {
            data: col.data, title: col.title,
            render: function (id: number, comp: any, entity: any) {
              return '<div class=\'text-center\'>'
                + '<i  class=\'fa fa-eye pointer\' style=\'color: #2475B0\' title=\'View\' data-view-id=\'' + id + '\'></i></div>';
            }
          }
        );
        this.colTitle.push({title: col.title});
      } else if (!col.isViewMore && !col.isDelete && col.isViewEdit) {
        this.column.push(
          {
            data: col.data, title: col.title,
            render: function (id: number, comp: any, entity: any) {
              return '<div class=\'text-center\'>'
                + '<i  class=\'fa fa-edit pointer\' style=\'color: #10A881\' title=\'Edit\' data-edit-id=\'' + id + '\'></i></div>';
            }
          }
        );
        this.colTitle.push({title: col.title});
      } else if (col.isDelete && !col.isViewEdit && !col.isViewMore) {
        this.column.push(
          {
            data: col.data, title: col.title,
            render: function (id: number, comp: any, entity: any) {
              return '<div class=\'text-center\'>'
                + '<i  class=\'fa fa-trash pointer\' style=\'color: #FF3031\' title=\'Delete\' data-delete-id=\'' + id + '\'></i></div>';
            }
          }
        );
        this.colTitle.push({title: col.title});
      } else if (col.isViewMore && col.isViewEdit && !col.isDelete) {
        this.column.push(
          {
            data: col.data, title: col.title,
            render: function (id: number, comp: any, entity: any) {
              return '<div class=\'text-center\'>'
                + '<i  class=\'fa fa-edit pointer\' style=\'color: #10A881\' title=\'Edit\' data-edit-id=\'' + id + '\'></i>&nbsp;&nbsp;&nbsp;&nbsp;'
                + '<i  class=\'fa fa-eye pointer\' style=\'color: #2475B0\' title=\'View\' data-view-id=\'' + id + '\'></i></div>';
            }
          }
        );
        this.colTitle.push({title: col.title});
      } else if (col.isViewMore && col.isViewEdit && col.isDelete) {
        this.column.push(
          {
            data: col.data, title: col.title,
            render: function (id: number, comp: any, entity: any) {
              return '<div class=\'text-center\'>'
                + '<i  class=\'fa fa-edit pointer\' style=\'color: #10A881\' title=\'Edit\' data-edit-id=\'' + id + '\'></i>&nbsp;&nbsp;&nbsp;&nbsp;'
                + '<i  class=\'fa fa-eye pointer\' style=\'color: #2475B0\' title=\'View\' data-view-id=\'' + id + '\'></i>&nbsp;&nbsp;&nbsp;&nbsp;'
                + '<i  class=\'fa fa-trash pointer\' style=\'color: #FF3031\' title=\'Delete\' data-delete-id=\'' + id + '\'></i></div>';
            }
          }
        );
        this.colTitle.push({title: col.title});
      } else if (col.isLink) {
        this.column.push(
          {
            data: col.data,
            title: col.title,
            render: function (id: number, comp: any, entity: any) {
              if (id) {
                return `<span style="cursor: pointer; color: #2475B0" data-link="${String.Format(col.link, entity.id)}">${id}</span>`;
              } else {
                return '';
              }
            }
          }
        );
        this.colTitle.push({title: col.title});
      } else {
        this.column.push(
          {
            data: col.data,
            title: col.title,
            render: function (d?: any) {
              if(typeof d=="number"){
                return d;
              }
              return d ? d : '';
            }
          });
        this.colTitle.push({title: col.title});
      }
    });
    this.dtOptions = this.stewardService.intiateDataTable(this.endpoint,
      this.column, this.idColumn, this.params, (params: any) => {
        params.size = this.page_size;
        if (this.fromDate !== undefined) {
          params.from = this.datePipe.transform(this.fromDate, 'dd/MM/yyyy');
        }
        if (this.toDate !== undefined) {
          params.to = this.datePipe.transform(this.toDate, 'dd/MM/yyyy');
        }
        if (this.filter_needle !== undefined) {
          params.needle = this.filter_needle;
        }
      }, this.hasCheckBox);
  }

  ngAfterViewInit(): void {
    this.renderer.listen('document', 'click', (event) => {
      if (event.target.hasAttribute('data-edit-id')) {
        const rrt = String.Format(this.routeEdit, event.target.getAttribute('data-edit-id'));
        this.router.navigate([rrt], {skipLocationChange: true});
      }

      if (event.target.hasAttribute('data-view-id')) {
        const rrt = String.Format(this.routeView, event.target.getAttribute('data-view-id'));
        this.router.navigate([rrt], {skipLocationChange: true});

      }

      if (event.target.hasAttribute('data-delete-id')) {
        const rrt = String.Format(this.routeDelete, event.target.getAttribute('data-delete-id'));
        this.router.navigate([rrt], {skipLocationChange: true});

      }

      if (event.target.hasAttribute('data-link')) {
        const rrt = '/' + event.target.getAttribute('data-link');
        this.router.navigate([rrt], {skipLocationChange: true});
      }
    });

    $('.select-all-checkbox').click(function () {
      if ($(this).is(':checked')) {
        // @ts-ignore
        $($.fn.dataTable.tables(true)).DataTable().rows().select();
      } else {
        // @ts-ignore
        $($.fn.dataTable.tables(true)).DataTable().rows().deselect();
      }
    });
  }

  refilterTable(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.page.len(parseInt(this.page_size, 10)).draw();
    });
  }

  export(type: SupportedExtensions) {
    switch (type) {
      case 'pdf':
        this.exportAsService.generatePdf('custom-datatable', this.fileName + '-' + new Date().toLocaleDateString());
        break;
      case 'xlsx':
        this.exportAsService.exportToExcel(this.table, this.fileName);
        break;
      default:
        break;
    }
  }

  filterById(event: any) {
    if (event.fromDate !== undefined) {
      this.fromDate = event.fromDate;
    }
    if (event.toDate !== undefined) {
      this.toDate = event.toDate;
    }
    if (event.filter_needle !== undefined) {
      this.filter_needle = event.filter_needle;
    }
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.page.len(parseInt(this.page_size, 10)).draw();
    });
  }

}
