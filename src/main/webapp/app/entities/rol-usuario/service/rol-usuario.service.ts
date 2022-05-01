import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IRolUsuario, getRolUsuarioIdentifier } from '../rol-usuario.model';

export type EntityResponseType = HttpResponse<IRolUsuario>;
export type EntityArrayResponseType = HttpResponse<IRolUsuario[]>;

@Injectable({ providedIn: 'root' })
export class RolUsuarioService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/rol-usuarios');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(rolUsuario: IRolUsuario): Observable<EntityResponseType> {
    return this.http.post<IRolUsuario>(this.resourceUrl, rolUsuario, { observe: 'response' });
  }

  update(rolUsuario: IRolUsuario): Observable<EntityResponseType> {
    return this.http.put<IRolUsuario>(`${this.resourceUrl}/${getRolUsuarioIdentifier(rolUsuario) as number}`, rolUsuario, {
      observe: 'response',
    });
  }

  partialUpdate(rolUsuario: IRolUsuario): Observable<EntityResponseType> {
    return this.http.patch<IRolUsuario>(`${this.resourceUrl}/${getRolUsuarioIdentifier(rolUsuario) as number}`, rolUsuario, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRolUsuario>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRolUsuario[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addRolUsuarioToCollectionIfMissing(
    rolUsuarioCollection: IRolUsuario[],
    ...rolUsuariosToCheck: (IRolUsuario | null | undefined)[]
  ): IRolUsuario[] {
    const rolUsuarios: IRolUsuario[] = rolUsuariosToCheck.filter(isPresent);
    if (rolUsuarios.length > 0) {
      const rolUsuarioCollectionIdentifiers = rolUsuarioCollection.map(rolUsuarioItem => getRolUsuarioIdentifier(rolUsuarioItem)!);
      const rolUsuariosToAdd = rolUsuarios.filter(rolUsuarioItem => {
        const rolUsuarioIdentifier = getRolUsuarioIdentifier(rolUsuarioItem);
        if (rolUsuarioIdentifier == null || rolUsuarioCollectionIdentifiers.includes(rolUsuarioIdentifier)) {
          return false;
        }
        rolUsuarioCollectionIdentifiers.push(rolUsuarioIdentifier);
        return true;
      });
      return [...rolUsuariosToAdd, ...rolUsuarioCollection];
    }
    return rolUsuarioCollection;
  }
}
