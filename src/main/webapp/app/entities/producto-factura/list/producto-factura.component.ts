import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProductoFactura } from '../producto-factura.model';
import { ProductoFacturaService } from '../service/producto-factura.service';
import { ProductoFacturaDeleteDialogComponent } from '../delete/producto-factura-delete-dialog.component';

@Component({
  selector: 'macavi-producto-factura',
  templateUrl: './producto-factura.component.html',
})
export class ProductoFacturaComponent implements OnInit {
  productoFacturas?: IProductoFactura[];
  isLoading = false;

  constructor(protected productoFacturaService: ProductoFacturaService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.productoFacturaService.query().subscribe({
      next: (res: HttpResponse<IProductoFactura[]>) => {
        this.isLoading = false;
        this.productoFacturas = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IProductoFactura): number {
    return item.id!;
  }

  delete(productoFactura: IProductoFactura): void {
    const modalRef = this.modalService.open(ProductoFacturaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.productoFactura = productoFactura;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
