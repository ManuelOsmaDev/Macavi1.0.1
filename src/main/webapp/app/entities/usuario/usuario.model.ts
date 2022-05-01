import { ICliente } from 'app/entities/cliente/cliente.model';
import { IFactura } from 'app/entities/factura/factura.model';
import { IRolUsuario } from 'app/entities/rol-usuario/rol-usuario.model';
import { ITipoDni } from 'app/entities/tipo-dni/tipo-dni.model';

export interface IUsuario {
  id?: number;
  email?: string;
  loginUsuario?: string;
  nombre?: string;
  tipoDni?: string;
  password?: string;
  clientes?: ICliente[] | null;
  facturas?: IFactura[] | null;
  rolUsuarios?: IRolUsuario[] | null;
  tipodni?: ITipoDni | null;
}

export class Usuario implements IUsuario {
  constructor(
    public id?: number,
    public email?: string,
    public loginUsuario?: string,
    public nombre?: string,
    public tipoDni?: string,
    public password?: string,
    public clientes?: ICliente[] | null,
    public facturas?: IFactura[] | null,
    public rolUsuarios?: IRolUsuario[] | null,
    public tipodni?: ITipoDni | null
  ) {}
}

export function getUsuarioIdentifier(usuario: IUsuario): number | undefined {
  return usuario.id;
}
