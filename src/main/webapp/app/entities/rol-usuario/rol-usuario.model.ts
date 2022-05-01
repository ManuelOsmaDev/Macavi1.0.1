import { IRol } from 'app/entities/rol/rol.model';
import { IUsuario } from 'app/entities/usuario/usuario.model';

export interface IRolUsuario {
  id?: number;
  rol?: IRol | null;
  usuarioRol?: IUsuario | null;
}

export class RolUsuario implements IRolUsuario {
  constructor(public id?: number, public rol?: IRol | null, public usuarioRol?: IUsuario | null) {}
}

export function getRolUsuarioIdentifier(rolUsuario: IRolUsuario): number | undefined {
  return rolUsuario.id;
}
