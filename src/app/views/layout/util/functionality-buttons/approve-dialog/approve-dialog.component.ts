import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {NgForm} from '@angular/forms';
import {StewardService} from '../../../../../shared/services/steward/steward.service';
import {Notify} from '../../../../../shared/class/notify';
import {ResponseWrapper} from '../../../../../entities/wrappers/response-wrapper';

@Component({
  selector: 'app-approve-dialog',
  templateUrl: './approve-dialog.component.html',
  styleUrls: ['./approve-dialog.component.css']
})
export class ApproveDialogComponent {

  checkerActions: any;
  selectedIds: Array<any>;
  approveLabel = 'Approve';
  endpoint: string;

  constructor(
    public dialogRef: MatDialogRef<ApproveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected stewardService: StewardService<any, any>,
    protected notify: Notify,
  ) {
    this.checkerActions = data.checkerActions;
    // this.checkerActions.action = 'Approve';
    this.selectedIds = data.selectedIds;
    this.endpoint = data.endpoint;
    this.approveLabel = data.approveLabel;
  }

  processAction(form: NgForm) {
    // this.checkerActions.details = this.checkerActions;

    // console.log('>>>>>>>>>>>>>>>>>>>', this.checkerActions.details);

    this.stewardService.post(this.endpoint, {details: this.checkerActions}).subscribe((response) => {
      this.processResponse(form, response);
    });
  }

  private processResponse(form: NgForm, response: ResponseWrapper<any>) {
    if (response.code === 200) {
      form.resetForm();
      this.notify.showSuccess(response.message);
      $($.fn.dataTable.tables(true)).DataTable().ajax.reload(null, false);
      this.dialogRef.close();
    } else {
      form.resetForm();
      this.notify.showWarning(response.message);
    }
  }


}
