import {Injectable} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {GlobalParams} from '../globalparams';
import {ResponseWrapper} from '../../../entities/wrappers/response-wrapper';
import {DataTableWrapper} from '../../../entities/wrappers/data-table-wrapper';
import { MasterDataResponseWrapper } from '../../../entities/wrappers/masterdata-wrapper';
// import {AppState} from '../redux/AppState';

@Injectable({
  providedIn: 'root'
})
export class StewardService<T, E> {
  token: string;

  constructor(
    private http: HttpClient,
    private globalParam: GlobalParams,
    private meta: Meta,
    // private _state: AppState
  ) {

  }

  getHeaders(header: string): HttpHeaders {
    // const csrf = this.meta.getTag('name=_csrf').content;
    const token = localStorage.getItem('access_token');
    switch (header) {

      case 'clean':
        return new HttpHeaders({
          'Content-Type': 'application/json; charset=utf-8',
          // 'X-CSRF-TOKEN': csrf
          'Authorization': 'Bearer ' + token
        });
        break;

      case 'no-token':
        return new HttpHeaders({
          'Content-Type': 'application/json; charset=utf-8',
          // 'X-CSRF-TOKEN': csrf
        });
        break;

      case 'login':
        return new HttpHeaders({
          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
          // 'X-CSRF-TOKEN': csrf
          'Authorization': 'Basic ' + btoa('web-portal:Data2020.')
        });
        break;

      case 'plain':
        return new HttpHeaders({
          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
          // 'X-CSRF-TOKEN': csrf
          'Authorization': 'Bearer ' + token
        });
        break;
      case 'form-data':
        return new HttpHeaders({
          // 'X-CSRF-TOKEN': csrf
          'Authorization': 'Bearer ' + token
        });
        break;

      case 'multi-part':
        return new HttpHeaders({
          'Content-type': 'multipart/form-data; charset=utf-8',
          // 'X-CSRF-TOKEN': csrf
          'Authorization': 'Bearer ' + token
        });
        break;
        case 'sendToken':
          return new HttpHeaders({
            'Content-type': 'application/json; charset=utf-8',
            // 'X-CSRF-TOKEN': csrf
            Authorization: 'Basic ' + btoa('client:secret'),
          });
          break;

      default:
        return new HttpHeaders({
          'Content-Type': 'application/json; charset=utf-8',
          // 'X-CSRF-TOKEN': csrf
          'Authorization': 'Bearer ' + token

        });
        break;
    }
  }

  /**
   * Used to handle http post requests
   */
  post(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
    return this.http.post(this.globalParam.baseUrl + endpoint, JSON.stringify(data), {headers: this.getHeaders('clean')}).pipe(
      catchError(this.handleError<any>())
    );
  }

  postNoToken(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
    return this.http.post(this.globalParam.baseUrl + endpoint, JSON.stringify(data), {headers: this.getHeaders('no-token')}).pipe(
      catchError(this.handleError<any>())
    );
  }


  postLogin(endpoint: string, data: T): Observable<any> {
    return this.http.post(this.globalParam.baseUrl + endpoint, data, {
      headers: this.getHeaders('login')
    }).pipe(
      catchError(this.handleError<any>())
    );
  }

  postFormData(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
    const formData: FormData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    return this.http.post(this.globalParam.baseUrl + endpoint, formData, {headers: this.getHeaders('form-data')}).pipe(
      catchError(this.handleError<any>())
    );
  }

  postFormDataNoToken(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
    const formData: FormData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    return this.http.post(this.globalParam.baseUrl + endpoint, formData, {headers: this.getHeaders('form-data')}).pipe(
      catchError(this.handleError<any>())
    );
  }

  postFormAuthorized(endpoint: string, data: T, options?: HttpHeaders): Observable<any> {
    if (!options) {
      options = this.getHeaders('plain');
    }
    return this.http.post(this.globalParam.baseUrl + endpoint, data, {headers: options}).pipe(
      catchError(this.handleError<any>())
    );
  }


  postFormDataMultipart(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
    const formData: FormData = new FormData();
    Object.keys(data).forEach((key) => {
      if (Array.isArray(data[key])) {
        data[key].forEach(k2 => {
          formData.append(key, k2);
        });
      } else {
        formData.append(key, data[key]);
      }
    });

    return this.http.post(this.globalParam.baseUrl + endpoint, formData, {headers: this.getHeaders('form-data')}).pipe(
      catchError(this.handleError<any>())
    );
  }

  sendFile(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
    return this.http
      .post(this.globalParam.baseUrl + endpoint, data, {
        headers: this.getHeaders('form-data')
      })
      .pipe(catchError(this.handleError<any>()));
  }

  putFormDataMultiPart(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
    const formData: FormData = new FormData();
    Object.keys(data).forEach((key) => {
      if (Array.isArray(data[key])) {
        data[key].forEach(k2 => {
          formData.append(key, k2);
        });
      } else {
        formData.append(key, data[key]);
      }
    });
    return this.http.put(this.globalParam.baseUrl + endpoint, formData, {headers: this.getHeaders('form-data')}).pipe(
      catchError(this.handleError<any>())
    );
  }

  /**
   * Used to handle http post requests
   */
  put(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
    return this.http.put(this.globalParam.baseUrl + endpoint, JSON.stringify(data), {headers: this.getHeaders('clean')}).pipe(
      catchError(this.handleError<any>())
    );
  }

  putNoToken(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
    return this.http.put(this.globalParam.baseUrl + endpoint, JSON.stringify(data), {headers: this.getHeaders('no-token')}).pipe(
      catchError(this.handleError<any>())
    );
  }

  delete(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
    return this.http.request('delete', this.globalParam.baseUrl + endpoint, {
      headers: this.getHeaders('clean'),
      body: JSON.stringify(data)
    }).pipe(
      catchError(this.handleError<any>())
    );
  }

  get(endpoint: string, data?: Map<string, string>): Observable<ResponseWrapper<E>> {
    const options = {
      headers: this.getHeaders('clean'),
      params: this.getHttpParams(data)
    };
    return this.http.get(this.globalParam.baseUrl + endpoint, options).pipe(
      catchError(this.handleError<any>())
    );
  }

  getMasterData(
    endpoint: string,
    data?: Map<string, string>
  ): Observable<MasterDataResponseWrapper<E>> {
    const options = {
      headers: this.getHeaders('plain'),
      params: this.getHttpParams(data),
    };
    return this.http
      .get(this.globalParam.baseUrl + endpoint, options)
      .pipe(catchError(this.handleError<any>()));
  }

  getWithCustomeHeader(endpoint: string, data?: Map<string, string>, options?: HttpHeaders): Observable<ResponseWrapper<E>> {
    let opt;
    if (!options) {
      opt = {
        headers: options,
        params: this.getHttpParams(data)
      };
    } else {
      opt = {
        headers: this.getHeaders('clean'),
        params: this.getHttpParams(data)
      };
    }

    return this.http.get(this.globalParam.baseUrl + endpoint, opt).pipe(
      catchError(this.handleError<any>())
    );
  }

  getNoToken(endpoint: string, data?: Map<string, string>): Observable<ResponseWrapper<E>> {
    const options = {
      headers: this.getHeaders('no-token'),
      params: this.getHttpParams(data)
    };
    return this.http.get(this.globalParam.baseUrl + endpoint, options).pipe(
      catchError(this.handleError<any>())
    );
  }
  getToken(endpoint: string, data?: Map<string, string>): Observable<ResponseWrapper<E>> {
    const options = {
      headers: this.getHeaders('clean'),
      params: this.getHttpParams(data)
    };
    return this.http.get(this.globalParam.baseUrl + endpoint, options).pipe(
      catchError(this.handleError<any>())
    );
  }
  sendToken(endpoint: string, data: T): Observable<any> {
    return this.http
      .post(this.globalParam.baseUrl + endpoint, data, {
        headers: this.getHeaders('sendToken'),
      })
      .pipe(catchError(this.handleError<any>()));
  }
  private getHttpParams(data: Map<string, string>): HttpParams {
    if (data === undefined) {
      return new HttpParams();
    }
    let httpParams: HttpParams = new HttpParams();
    data.forEach((value: string, key: string) => {
      httpParams = httpParams.append(key, value);
    });
    return httpParams;
  }

  public dataTableReload(endpoint: string) {
    $($.fn.dataTable.tables(true)).DataTable();
    //        console.debug($($.fn.dataTable.tables(true)).DataTable().ajax.url);
    //        $($.fn.dataTable.tables(true)).DataTable().ajax.
    //        $($.fn.dataTable.tables(true)).DataTable().ajax.url(this.globalParam.baseUrl + endpoint).load();
    $($.fn.dataTable.tables(true)).DataTable().ajax.reload(null, false);
  }

  public intiateDataTable(endpoint: string, cols: Array<DataTables.ColumnSettings>,
                          idField: string, params?: Map<any, string>,
                          paramCallBack?: any, isCheckBoxEnable?: boolean): DataTables.Settings {
    if (isCheckBoxEnable === undefined) {
      isCheckBoxEnable = true;
    }
    if (params == null) {
      params = new Map<any, string>();
    }
    let dtOptions: any = {};
    let httpParams: HttpParams = new HttpParams();
    params.forEach((value: any, key: string) => {
      httpParams = httpParams.append(key, value);
    });
    let columOptions: any = {};
    if (isCheckBoxEnable) {
      columOptions = {
        orderable: !isCheckBoxEnable,
        className: 'select-checkbox',
        targets: 0,
        checkboxes: {
          selectRow: isCheckBoxEnable
        }
      };
    }

    dtOptions = {
      pagingType: 'full_numbers',
      serverSide: true,
      processing: true,
      responsive: true,
      // select: true,
      ajax: (dTParams: any, callback) => {
        if (paramCallBack != null) {
          paramCallBack(dTParams);
        }
        const options = {
          // REVERT TO HEADERS.
          headers: this.getHeaders('form-data'),
          params: this.parseDataTableParams(dTParams, httpParams)
        };
        this.http
          .get<DataTableWrapper<T>>(
            this.globalParam.baseUrl + endpoint,
            options
          ).subscribe((resp :any)=> {
          callback({
            recordsTotal: resp.length,
            recordsFiltered: resp.length,
           // data: resp.data.content
           data:resp
          });
        });
      },
      columns: cols,
      on: (event: string, callback: ((e: Event, settings: any, json: any) => void)) => {
        // console.log('Testing on select event');
      },
      // preDrawCallback: preCallBack,
      rowCallback: (row: Node, data: T[], index: number) => {
        $('td', row).unbind('click');
        $('td', row).bind('click', () => {
          //                    console.debug("Testing click event");
        });
        $(row).attr('data-id', data[idField]);
        return row;
      },
      dom: 'Bfrtip',
      // USED TO REMOVE THE SEARCH INPUT.
      bFilter: false,
      // USED FOR HORIZONTAL SCROLLING.
      scrollX: true,
      buttons: [],
      columnDefs: [
        columOptions
      ],
      select: {
        style: 'multi'
      }
      ,
      order: [[1, 'asc']]
    };
    return dtOptions;
  }

  /**
   * used to parse datatable params to http client and spring boot pageable params
   */
  private parseDataTableParams(dtParams: any, httpParams: HttpParams): HttpParams {
    httpParams = httpParams.append('page', '' + (dtParams.start / dtParams.length));
    if (!dtParams.needle) {
      httpParams = httpParams.append('needle', dtParams.search.value);
    }

    let isSort = false;
    let srtString = '';
    const htp: any = httpParams;
    if (htp.updates) {
      const parm: Array<any> = htp.updates;

      const srt: any = parm.filter(x => {
        return x.param === 'sort';
      });
      if (srt != null) {
        isSort = true;
        srtString = srt.value;
      }
    }
    if (isSort) {
      httpParams = httpParams.append('sort', srtString);
    } else {
      if (dtParams.order.length > 0) {
        httpParams = httpParams.append('sort', dtParams.columns[dtParams.order[0].column].data + ',' + dtParams.order[0].dir);
      }
    }

    Object.keys(dtParams).forEach((key) => {
      if (key != 'length' && key != 'start' && key != 'search' && key != 'sort' && key != 'order' && key != 'columns') {
        httpParams = httpParams.append(key, dtParams[key]);
      }
    });

    return httpParams;
  }


  /**
   * Used to catch exception thrown by http client returns internal server error
   * if status 500 is encountered
   */
  // tslint:disable-next-line:no-shadowed-variable
  private handleError<ResponseWrapper>() {
    return (error: HttpErrorResponse): Observable<any> => {
      const res = new ResponseWrapper();
      // tslint:disable-next-line:triple-equals
      if (error.status == 500) {
        res.code = error.status;
        res.message = 'Sorry internal server error occured please try again later';
      } else {
        res.code = error.status;
        res.message = error.error.message;
        res.data = error.error.data;
      }
      return of(res);
    };
  }
}
