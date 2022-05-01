import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { RolUsuarioComponent } from '../list/rol-usuario.component';
import { RolUsuarioDetailComponent } from '../detail/rol-usuario-detail.component';
import { RolUsuarioUpdateComponent } from '../update/rol-usuario-update.component';
import { RolUsuarioRoutingResolveService } from './rol-usuario-routing-resolve.service';

const rolUsuarioRoute: Routes = [
  {
    path: '',
    component: RolUsuarioComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RolUsuarioDetailComponent,
    resolve: {
      rolUsuario: RolUsuarioRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RolUsuarioUpdateComponent,
    resolve: {
      rolUsuario: RolUsuarioRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RolUsuarioUpdateComponent,
    resolve: {
      rolUsuario: RolUsuarioRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(rolUsuarioRoute)],
  exports: [RouterModule],
})
export class RolUsuarioRoutingModule {}
