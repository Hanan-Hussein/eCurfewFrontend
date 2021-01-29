import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {NgForm} from '@angular/forms';
import {CheckerActions} from '../../../../../entities/wrappers/checker-actions';
import {StewardService} from '../../../../../shared/services/steward/steward.service';
import {Notify} from '../../../../../shared/class/notify';
import {ResponseWrapper} from '../../../../../entities/wrappers/response-wrapper';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent {
  checkerActions: CheckerActions;
  selectedIds: Array<any>;
  deleteLabel = 'Delete';
  endpoint: string;

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected stewardService: StewardService<any, any>,
    protected notify: Notify,
  ) {
    this.checkerActions = data.checkerActions;
    this.selectedIds = data.selectedIds;
    this.endpoint = data.endpoint;
    this.deleteLabel = data.deleteLabel;
  }


  processAction(form: NgForm) {
    this.stewardService.post(this.endpoint,{disable: this.checkerActions} ).subscribe((response) => {
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
      // this.notify.showWarning(response.data[0]);
      this.notify.showWarning(response.message);

    }
  }

}
