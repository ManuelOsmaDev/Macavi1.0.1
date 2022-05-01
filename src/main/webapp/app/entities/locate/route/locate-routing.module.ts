import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { LocateComponent } from '../list/locate.component';
import { LocateDetailComponent } from '../detail/locate-detail.component';
import { LocateUpdateComponent } from '../update/locate-update.component';
import { LocateRoutingResolveService } from './locate-routing-resolve.service';

const locateRoute: Routes = [
  {
    path: '',
    component: LocateComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LocateDetailComponent,
    resolve: {
      locate: LocateRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LocateUpdateComponent,
    resolve: {
      locate: LocateRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LocateUpdateComponent,
    resolve: {
      locate: LocateRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(locateRoute)],
  exports: [RouterModule],
})
export class LocateRoutingModule {}
