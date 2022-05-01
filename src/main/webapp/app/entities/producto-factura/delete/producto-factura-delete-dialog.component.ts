import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IProductoFactura } from '../producto-factura.model';
import { ProductoFacturaService } from '../service/producto-factura.service';

@Component({
  templateUrl: './producto-factura-delete-dialog.component.html',
})
export class ProductoFacturaDeleteDialogComponent {
  productoFactura?: IProductoFactura;

  constructor(protected productoFacturaService: ProductoFacturaService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.productoFacturaService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
