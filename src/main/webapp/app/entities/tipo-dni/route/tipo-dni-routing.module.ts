import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TipoDniComponent } from '../list/tipo-dni.component';
import { TipoDniDetailComponent } from '../detail/tipo-dni-detail.component';
import { TipoDniUpdateComponent } from '../update/tipo-dni-update.component';
import { TipoDniRoutingResolveService } from './tipo-dni-routing-resolve.service';

const tipoDniRoute: Routes = [
  {
    path: '',
    component: TipoDniComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TipoDniDetailComponent,
    resolve: {
      tipoDni: TipoDniRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TipoDniUpdateComponent,
    resolve: {
      tipoDni: TipoDniRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TipoDniUpdateComponent,
    resolve: {
      tipoDni: TipoDniRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(tipoDniRoute)],
  exports: [RouterModule],
})
export class TipoDniRoutingModule {}
