import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NgForm} from '@angular/forms';
import {StewardService} from '../../../../../shared/services/steward/steward.service';
import {Notify} from '../../../../../shared/class/notify';
import {CheckerActions} from '../../../../../entities/wrappers/checker-actions';
import {ResponseWrapper} from '../../../../../entities/wrappers/response-wrapper';

@Component({
  selector: 'app-decline-dialog',
  templateUrl: './decline-dialog.component.html',
  styleUrls: ['./decline-dialog.component.css']
})
export class DeclineDialogComponent {

  checkerActions: CheckerActions;
  selectedIds: Array<any>;
  declineLabel = 'Decline';
  endpoint: string;

  constructor(
    public dialogRef: MatDialogRef<DeclineDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected stewardService: StewardService<any, any>,
    protected notify: Notify,
  ) {
    this.checkerActions = data.checkerActions;
    this.checkerActions.action = 'Decline';
    this.selectedIds = data.selectedIds;
    this.endpoint = data.endpoint;
    this.declineLabel = data.declineLabel;
  }

  processAction(form: NgForm) {
    this.stewardService.put(this.endpoint + '/' + this.checkerActions.action.toLowerCase() + '-actions', this.checkerActions).subscribe((response) => {
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
