import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IProductoFactura, ProductoFactura } from '../producto-factura.model';
import { ProductoFacturaService } from '../service/producto-factura.service';

@Injectable({ providedIn: 'root' })
export class ProductoFacturaRoutingResolveService implements Resolve<IProductoFactura> {
  constructor(protected service: ProductoFacturaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProductoFactura> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((productoFactura: HttpResponse<ProductoFactura>) => {
          if (productoFactura.body) {
            return of(productoFactura.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProductoFactura());
  }
}
