import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductoFactura } from '../producto-factura.model';

@Component({
  selector: 'macavi-producto-factura-detail',
  templateUrl: './producto-factura-detail.component.html',
})
export class ProductoFacturaDetailComponent implements OnInit {
  productoFactura: IProductoFactura | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productoFactura }) => {
      this.productoFactura = productoFactura;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
