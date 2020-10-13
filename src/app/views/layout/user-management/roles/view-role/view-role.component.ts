import {AfterViewInit, Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {StewardService} from '../../../../../shared/services/steward/steward.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Notify} from '../../../../../shared/class/notify';
import {CreateRolesWrapper} from '../../../../../entities/wrappers/create-roles-wrapper';
import {Subscription} from 'rxjs';
import {RolesWrapper} from '../../../../../entities/wrappers/roles-wrapper';
import {Entity} from '../../../../../entities/entity-model';
import {Entities} from '../create-role/Entities';

@Component({
  selector: 'app-view-role',
  templateUrl: './view-role.component.html',
  styleUrls: ['./view-role.component.scss']
})
export class ViewRoleComponent implements OnInit, OnDestroy, AfterViewInit {
  model: CreateRolesWrapper;
  rolePermissions: Array<number>;
  permissions = [];
  rolesWrapper: RolesWrapper;
  roleId: number;
  ids: Array<number>;
  entity: Array<Entity>;
  entities: Entities[];
  subscription: Subscription;
  isReadOnly = true;
  disabled = true;
  isUpdate: boolean;

  constructor(private stewardService: StewardService<any, any>,
              private notify: Notify, private route: ActivatedRoute, protected router: Router) {
    this.model = new CreateRolesWrapper();
    this.entity = [];
    this.rolePermissions = [];
    this.ids = [];
    this.rolesWrapper = new RolesWrapper();
    this.subscription = new Subscription();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'] != null) {
        this.fetchRoles(params['id']);
      }
    });
    this.stewardService.get('entity').subscribe(resp => {
      this.entities = resp.data.content;
    });
  }

  @HostListener('window:beforeunload')
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngAfterViewInit() {
    this.entity.forEach(res => {
      res.ufsEntityPermissionList.forEach(ec => {
        ec.ufsRolePermissionList.map(fnd => {
          if (fnd.role.roleId === this.model.roleId) {
            ec.checked = true;
          }
        });
      });
    });
  }

  fetchRoles(id: number) {
    const params: Map<any, string> = new Map();
    const inst = this;
    this.subscription.add(
      this.stewardService.get('common-modules/api/v1/role/' + id, params).subscribe((response) => {
        if (response.code === 200) {
          inst.model = response.data;
          inst.loadRoles(id);
        } else {
          inst.notify.showWarning(response.message);
        }
      })
    );
  }

  loadRoles(id: number) {
    const params: Map<any, string> = new Map();
    this.stewardService.get('common-modules/api/v1/role/permissions/' + id, params).subscribe((response) => {
      if (response.code === 200) {
        const data = response.data;
        data.forEach(perm => {
          // console.log(this.entities, 'this entities');
          this.entities.forEach(mp => {
            mp.permissions.forEach(res => {
              if (res.entityPermissionId === perm.permissionId) {
                res.checked = true;
                this.model.permissionId = res.entityPermissionId;
                this.model.permissionName = res.permission;
              }
            });
          });

        });
      } else {
        this.notify.showWarning(response.message);
      }
    });
  }

  enableUpdate() {
    this.isReadOnly = false;
    this.isUpdate = !this.isUpdate;

  }

  disableUpdate() {
    this.isReadOnly = true;
    this.isUpdate = !this.isUpdate;
  }

  updateRoles() {
    this.entities.forEach(res => {
      res.permissions.forEach(ec => {
        if (ec.checked) {
          this.permissions.push(ec.entityPermissionId);
        }
      });
    });

    this.rolesWrapper.roleId = this.model.roleId;
    this.rolesWrapper.roleName = this.model.roleName;
    this.rolesWrapper.description = this.model.description;
    this.rolesWrapper.permissions = this.permissions;

    this.stewardService.put('common-modules/api/v1/role', this.rolesWrapper).subscribe((response) => {
      if (response.code === 200) {
        this.notify.showSuccess(response.message);
        this.router.navigate(['/home/user-management/roles']);
      } else {
        this.notify.showWarning(response.message);
      }
    }, error => {
      console.log(error);
    });

  }

}
