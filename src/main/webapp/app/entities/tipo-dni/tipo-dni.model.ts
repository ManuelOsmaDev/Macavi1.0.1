import { IUsuario } from 'app/entities/usuario/usuario.model';

export interface ITipoDni {
  id?: number;
  nombreDni?: string;
  usuarios?: IUsuario[] | null;
}

export class TipoDni implements ITipoDni {
  constructor(public id?: number, public nombreDni?: string, public usuarios?: IUsuario[] | null) {}
}

export function getTipoDniIdentifier(tipoDni: ITipoDni): number | undefined {
  return tipoDni.id;
}
