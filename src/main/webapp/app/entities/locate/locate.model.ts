import { ICliente } from 'app/entities/cliente/cliente.model';

export interface ILocate {
  id?: number;
  ciudad?: string;
  departamento?: string;
  pais?: string;
  clientes?: ICliente[] | null;
}

export class Locate implements ILocate {
  constructor(
    public id?: number,
    public ciudad?: string,
    public departamento?: string,
    public pais?: string,
    public clientes?: ICliente[] | null
  ) {}
}

export function getLocateIdentifier(locate: ILocate): number | undefined {
  return locate.id;
}
