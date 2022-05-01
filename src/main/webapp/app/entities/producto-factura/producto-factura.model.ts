import { IFactura } from 'app/entities/factura/factura.model';
import { IProducto } from 'app/entities/producto/producto.model';

export interface IProductoFactura {
  id?: number;
  facturas?: IFactura[] | null;
  producto?: IProducto | null;
}

export class ProductoFactura implements IProductoFactura {
  constructor(public id?: number, public facturas?: IFactura[] | null, public producto?: IProducto | null) {}
}

export function getProductoFacturaIdentifier(productoFactura: IProductoFactura): number | undefined {
  return productoFactura.id;
}
