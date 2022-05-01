import { IProductoFactura } from 'app/entities/producto-factura/producto-factura.model';

export interface IProducto {
  id?: number;
  cantidadProducto?: number | null;
  descripcionProdcuto?: string;
  estilo?: string;
  genero?: string;
  marca?: string;
  porcentajeIva?: number | null;
  talla?: number | null;
  productoFacturas?: IProductoFactura[] | null;
}

export class Producto implements IProducto {
  constructor(
    public id?: number,
    public cantidadProducto?: number | null,
    public descripcionProdcuto?: string,
    public estilo?: string,
    public genero?: string,
    public marca?: string,
    public porcentajeIva?: number | null,
    public talla?: number | null,
    public productoFacturas?: IProductoFactura[] | null
  ) {}
}

export function getProductoIdentifier(producto: IProducto): number | undefined {
  return producto.id;
}
