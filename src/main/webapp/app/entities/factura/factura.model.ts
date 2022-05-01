import dayjs from 'dayjs/esm';
import { ICliente } from 'app/entities/cliente/cliente.model';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { IProductoFactura } from 'app/entities/producto-factura/producto-factura.model';

export interface IFactura {
  id?: number;
  descripcion?: string;
  fechaFact?: dayjs.Dayjs;
  fechaVenc?: dayjs.Dayjs;
  tipoPago?: string;
  totalFactura?: number | null;
  cliente?: ICliente | null;
  usuario?: IUsuario | null;
  prodctofactura?: IProductoFactura | null;
}

export class Factura implements IFactura {
  constructor(
    public id?: number,
    public descripcion?: string,
    public fechaFact?: dayjs.Dayjs,
    public fechaVenc?: dayjs.Dayjs,
    public tipoPago?: string,
    public totalFactura?: number | null,
    public cliente?: ICliente | null,
    public usuario?: IUsuario | null,
    public prodctofactura?: IProductoFactura | null
  ) {}
}

export function getFacturaIdentifier(factura: IFactura): number | undefined {
  return factura.id;
}
