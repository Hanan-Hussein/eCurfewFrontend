import {Component, Input} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {DeleteDialogComponent} from './delete-dialog/delete-dialog.component';
import {ApproveDialogComponent} from './approve-dialog/approve-dialog.component';
import {DeclineDialogComponent} from './decline-dialog/decline-dialog.component';
import {CheckerActions} from '../../../../entities/wrappers/checker-actions';
import {Notify} from '../../../../shared/class/notify';

@Component({
  selector: 'app-functionality-buttons',
  templateUrl: './functionality-buttons.component.html',
  styleUrls: ['./functionality-buttons.component.css']
})
export class FunctionalityButtonsComponent {

  @Input() checkerActions: CheckerActions;
  @Input() selectedIds: Array<any>;

  @Input() deleteLabel: string;
  @Input() declineLabel: string;
  @Input() endpoint: string;

  @Input() addLabel: string;
  @Input() addLink: string;

  @Input() approveLabel: string;
  @Input() approveLink: string;
  @Input() approveLinkLabel: string;


  constructor(
    protected notify: Notify,
    public dialog: MatDialog
  ) {
    this.checkerActions = new CheckerActions();
    this.selectedIds = [];
    this.approveLinkLabel = '';
    this.approveLabel = '';
    this.addLabel = '';
    this.declineLabel = '';
  }

  deleteConfirm(): void {
    const ids: Array<any> = [];

    $.each($('.selected'), function (index: number, row: any) {
      ids.push($(row).attr('data-id'));
    });
    if (ids.length < 1) {
      this.notify.show('Please select at least one entry');
      return;
    }
    this.checkerActions.ids = ids;


    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      data: {
        checkerActions: this.checkerActions,
        selectedIds: ids,
        endpoint: this.endpoint,
        deleteLabel: this.deleteLabel
      },
      panelClass: 'custom-delete-modal'
    });

    dialogRef.afterClosed().subscribe(result => {
      $($.fn.dataTable.tables(true)).DataTable().ajax.reload(null, false);
    });

  }

  approveConfirm(): void {
    const ids: Array<any> = [];
    if (this.selectedIds.length === 0) {
      $.each($('.selected'), function (index: number, row: any) {
        ids.push($(row).attr('data-id'));
      });
      if (ids.length < 1) {
        this.notify.show('Please select at least one entry');
        return;
      }
    }
    if (this.selectedIds.length === 0) {
      this.checkerActions.ids = ids;
    } else {
      this.checkerActions.ids = this.selectedIds;
    }


    const dialogRef = this.dialog.open(ApproveDialogComponent, {
      width: '500px',
      data: {
        checkerActions: this.checkerActions,
        selectedIds: ids,
        endpoint: this.endpoint,
        approveLabel: this.approveLabel,
      },
      panelClass: 'custom-delete-modal'
    });

    dialogRef.afterClosed().subscribe(result => {
      $($.fn.dataTable.tables(true)).DataTable().ajax.reload(null, false);
    });

  }

  declineConfirm(): void {
    const ids: Array<any> = [];
    if (this.selectedIds.length === 0) {
      $.each($('.selected'), function (index: number, row: any) {
        ids.push($(row).attr('data-id'));
      });
      if (ids.length < 1) {
        this.notify.show('Please select at least one entry');
        return;
      }
    }
    if (this.selectedIds.length === 0) {
      this.checkerActions.ids = ids;
    } else {
      this.checkerActions.ids = this.selectedIds;
    }


    const dialogRef = this.dialog.open(DeclineDialogComponent, {
      width: '500px',
      data: {
        checkerActions: this.checkerActions,
        selectedIds: ids,
        endpoint: this.endpoint,
        declineLabel: this.declineLabel
      },
      panelClass: 'custom-delete-modal'
    });

    dialogRef.afterClosed().subscribe(result => {
      $($.fn.dataTable.tables(true)).DataTable().ajax.reload(null, false);
    });

  }


}
