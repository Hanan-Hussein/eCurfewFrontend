import {Component, HostListener, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {StewardService} from '../../../../../shared/services/steward/steward.service';
import {Notify} from '../../../../../shared/class/notify';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import { RankModel} from '../../../../../entities/rank';
@Component({
  selector: 'app-add-rank',
  templateUrl: './add-rank.component.html',
  styleUrls: ['./add-rank.component.scss']
})
export class AddRankComponent implements OnInit {

  model: RankModel;
  subscription: Subscription;
  isUpdate: boolean;
  isReadOnly = false;
  disabled = false;
  isView = false;
  @Output() id: string;
  constructor(
    private stewardService: StewardService<any, any>,
    private notify: Notify,
    protected router: Router,
    private route: ActivatedRoute) {
    this.model = new RankModel();
    this.subscription = new Subscription();
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'] != null) {
        this.fetchData(params['id']);
        this.isView = true;
        this.disabled = true;
        this.isReadOnly = true;
      }
    });
  }

  private fetchData(id: number) {
    const inst = this;
    inst.subscription.add(
      this.stewardService.getMasterData('app/rest/v2/entities/ecurfew_Rank/' + id).subscribe((response) => {
        if (response) {
          this.model.rankName = response.rankName;
          this.model.rankCode = response.rankCode;
          this.model.description = response.description;
          this.id = response.id;

        } else {
          inst.notify.showWarning(response.message);
        }
      })
    );

  }

  @HostListener('window:beforeunload')
  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  enableUpdate() {
    this.isReadOnly = false;
    this.isUpdate = !this.isUpdate;
  }

  disableUpdate() {
    this.isReadOnly = true;
    this.isUpdate = !this.isUpdate;
  }

  onCreateForm(createForm: NgForm) {
    const params: Map<any, string> = new Map();
    const inst = this;
    if (this.isUpdate) {
      this.stewardService.put('app/rest/v2/update/station/' + this.id, this.model).subscribe((response) => {
        console.log(response);
        if (response) {
          inst.notify.showSuccess(response.message);
          this.router.navigate(['home/master-data/police-station']);
        } else {
          inst.notify.showWarning(response.message);
        }
      }, error => {
        console.log(error);
        inst.notify.showWarning(error.error.message);
      });
    } else {
      this.stewardService.post('app/rest/v2/services/ecurfew_CreateMasterDataService/createRank', {rank: this.model}).subscribe((response) => {
        console.log(response);
        if (response.code === 200) {
          inst.notify.showSuccess(response.message);
          this.router.navigate(['home/master-data/rank']);
        } else {
          inst.notify.showWarning(response.message);
        }
      }, error => {
        console.log(error);
        inst.notify.showWarning(error.error.message);
      });
    }

  }

}
