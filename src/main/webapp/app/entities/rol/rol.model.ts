import { IRolUsuario } from 'app/entities/rol-usuario/rol-usuario.model';

export interface IRol {
  id?: number;
  nombreRol?: string;
  rolUsuarios?: IRolUsuario[] | null;
}

export class Rol implements IRol {
  constructor(public id?: number, public nombreRol?: string, public rolUsuarios?: IRolUsuario[] | null) {}
}

export function getRolIdentifier(rol: IRol): number | undefined {
  return rol.id;
}
