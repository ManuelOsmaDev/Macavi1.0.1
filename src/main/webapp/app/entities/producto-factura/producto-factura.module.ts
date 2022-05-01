import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ProductoFacturaComponent } from './list/producto-factura.component';
import { ProductoFacturaDetailComponent } from './detail/producto-factura-detail.component';
import { ProductoFacturaUpdateComponent } from './update/producto-factura-update.component';
import { ProductoFacturaDeleteDialogComponent } from './delete/producto-factura-delete-dialog.component';
import { ProductoFacturaRoutingModule } from './route/producto-factura-routing.module';

@NgModule({
  imports: [SharedModule, ProductoFacturaRoutingModule],
  declarations: [
    ProductoFacturaComponent,
    ProductoFacturaDetailComponent,
    ProductoFacturaUpdateComponent,
    ProductoFacturaDeleteDialogComponent,
  ],
  entryComponents: [ProductoFacturaDeleteDialogComponent],
})
export class ProductoFacturaModule {}
