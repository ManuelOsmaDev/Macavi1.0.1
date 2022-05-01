import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IProductoFactura, getProductoFacturaIdentifier } from '../producto-factura.model';

export type EntityResponseType = HttpResponse<IProductoFactura>;
export type EntityArrayResponseType = HttpResponse<IProductoFactura[]>;

@Injectable({ providedIn: 'root' })
export class ProductoFacturaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/producto-facturas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(productoFactura: IProductoFactura): Observable<EntityResponseType> {
    return this.http.post<IProductoFactura>(this.resourceUrl, productoFactura, { observe: 'response' });
  }

  update(productoFactura: IProductoFactura): Observable<EntityResponseType> {
    return this.http.put<IProductoFactura>(
      `${this.resourceUrl}/${getProductoFacturaIdentifier(productoFactura) as number}`,
      productoFactura,
      { observe: 'response' }
    );
  }

  partialUpdate(productoFactura: IProductoFactura): Observable<EntityResponseType> {
    return this.http.patch<IProductoFactura>(
      `${this.resourceUrl}/${getProductoFacturaIdentifier(productoFactura) as number}`,
      productoFactura,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProductoFactura>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProductoFactura[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addProductoFacturaToCollectionIfMissing(
    productoFacturaCollection: IProductoFactura[],
    ...productoFacturasToCheck: (IProductoFactura | null | undefined)[]
  ): IProductoFactura[] {
    const productoFacturas: IProductoFactura[] = productoFacturasToCheck.filter(isPresent);
    if (productoFacturas.length > 0) {
      const productoFacturaCollectionIdentifiers = productoFacturaCollection.map(
        productoFacturaItem => getProductoFacturaIdentifier(productoFacturaItem)!
      );
      const productoFacturasToAdd = productoFacturas.filter(productoFacturaItem => {
        const productoFacturaIdentifier = getProductoFacturaIdentifier(productoFacturaItem);
        if (productoFacturaIdentifier == null || productoFacturaCollectionIdentifiers.includes(productoFacturaIdentifier)) {
          return false;
        }
        productoFacturaCollectionIdentifiers.push(productoFacturaIdentifier);
        return true;
      });
      return [...productoFacturasToAdd, ...productoFacturaCollection];
    }
    return productoFacturaCollection;
  }
}
