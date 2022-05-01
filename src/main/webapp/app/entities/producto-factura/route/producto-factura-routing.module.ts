import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ProductoFacturaComponent } from '../list/producto-factura.component';
import { ProductoFacturaDetailComponent } from '../detail/producto-factura-detail.component';
import { ProductoFacturaUpdateComponent } from '../update/producto-factura-update.component';
import { ProductoFacturaRoutingResolveService } from './producto-factura-routing-resolve.service';

const productoFacturaRoute: Routes = [
  {
    path: '',
    component: ProductoFacturaComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProductoFacturaDetailComponent,
    resolve: {
      productoFactura: ProductoFacturaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProductoFacturaUpdateComponent,
    resolve: {
      productoFactura: ProductoFacturaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProductoFacturaUpdateComponent,
    resolve: {
      productoFactura: ProductoFacturaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(productoFacturaRoute)],
  exports: [RouterModule],
})
export class ProductoFacturaRoutingModule {}
