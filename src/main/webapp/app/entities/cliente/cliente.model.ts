import { IFactura } from 'app/entities/factura/factura.model';
import { ILocate } from 'app/entities/locate/locate.model';
import { IUsuario } from 'app/entities/usuario/usuario.model';

export interface ICliente {
  id?: number;
  direcion?: string;
  telefono?: number;
  facturas?: IFactura[] | null;
  locate?: ILocate | null;
  usuario?: IUsuario | null;
}

export class Cliente implements ICliente {
  constructor(
    public id?: number,
    public direcion?: string,
    public telefono?: number,
    public facturas?: IFactura[] | null,
    public locate?: ILocate | null,
    public usuario?: IUsuario | null
  ) {}
}

export function getClienteIdentifier(cliente: ICliente): number | undefined {
  return cliente.id;
}
