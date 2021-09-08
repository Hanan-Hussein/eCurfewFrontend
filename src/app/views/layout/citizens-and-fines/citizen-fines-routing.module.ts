import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '../../../shared/guard';
import { CreateEssentialWorkersComponent } from './create-essential-workers/create-essential-workers.component';
import { ListEssentialWorkersComponent } from './list-essential-workers/list-essential-workers.component';
import { ViewEssentialWorkerComponent } from './view-essential-worker/view-essential-worker.component';
const routes: Routes = [
    {
      path: '', data: {title: 'citizens'}, children: [
        {path: 'essential-workers', component: ListEssentialWorkersComponent, data: {title: 'Essential Workers'}, canActivate: [AuthGuard]},
        {path: 'create-essential-workers', component: CreateEssentialWorkersComponent, canActivate: [AuthGuard]},
        {
          path: 'essential-worker/:id/view-essential-worker',
          component: ViewEssentialWorkerComponent,
          data: {title: 'View Essential Worker'},
          canActivate: [AuthGuard]
        },
      ]
    }
  ];
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
    export class CitizenFinesRoutingModule { }

