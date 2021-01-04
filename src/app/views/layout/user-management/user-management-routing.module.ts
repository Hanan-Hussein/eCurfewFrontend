import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListusersComponent} from './users/listusers/listusers.component';
import {ViewUserComponent} from './users/view-user/view-user.component';
import {ViewRoleComponent} from './roles/view-role/view-role.component';
import {CreateuserComponent} from './users/createuser/createuser.component';
import {CreateRoleComponent} from './roles/create-role/create-role.component';
import {RolesComponent} from './roles/roles.component';
import {WorkgroupsComponent} from './workgroups/workgroups.component';
import {CreateWorkgroupComponent} from './workgroups/create-workgroup/create-workgroup.component';
import {ViewWorkgroupComponent} from './workgroups/view-workgroup/view-workgroup.component';
import {AuthGuard} from '../../../shared/guard';
import {ApproveRolesComponent} from './roles/approve-roles/approve-roles.component';
import {ApproveWorkgroupsComponent} from './workgroups/approve-workgroups/approve-workgroups.component';
import {ApproveUsersComponent} from './users/approve-users/approve-users.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {ProfileComponent} from './user-profile/profile/profile.component';
import { LockedUsersComponent } from './users/locked-users/locked-users.component';


const routes: Routes = [
  {
    path: '', data: {title: 'user-management'}, children: [
      {path: 'users', component: ListusersComponent, canActivate: [AuthGuard]},
      {path: 'users/create-user', component: CreateuserComponent, canActivate: [AuthGuard]},
      {path: 'users/:id/view-user', component: ViewUserComponent, canActivate: [AuthGuard]},
      {path: 'roles', component: RolesComponent, canActivate: [AuthGuard]},
      {path: 'roles/create-role', component: CreateRoleComponent, canActivate: [AuthGuard]},
      {path: 'roles/:id/view-role', component: ViewRoleComponent, canActivate: [AuthGuard]},
      {path: 'workgroups', component: WorkgroupsComponent, canActivate: [AuthGuard]},
      {path: 'workgroups/create-workgroup', component: CreateWorkgroupComponent, canActivate: [AuthGuard]},
      {path: 'workgroups/:id/view-workgroup', component: ViewWorkgroupComponent, canActivate: [AuthGuard]},
      {path: 'roles/approve-role', component: ApproveRolesComponent, canActivate: [AuthGuard]},
      {path: 'workgroups/approve-workgroup', component: ApproveWorkgroupsComponent, canActivate: [AuthGuard]},
      {path: 'users/approve-user', component: ApproveUsersComponent, canActivate: [AuthGuard]},
      {path: 'user/profile', component: UserProfileComponent, canActivate: [AuthGuard]},
      {path: 'profile',component:ProfileComponent,canActivate:[AuthGuard]},
      {path: 'user/locked-users', component: LockedUsersComponent, canActivate: [AuthGuard]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
