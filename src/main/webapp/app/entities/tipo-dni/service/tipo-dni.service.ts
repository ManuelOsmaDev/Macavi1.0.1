import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITipoDni, getTipoDniIdentifier } from '../tipo-dni.model';

export type EntityResponseType = HttpResponse<ITipoDni>;
export type EntityArrayResponseType = HttpResponse<ITipoDni[]>;

@Injectable({ providedIn: 'root' })
export class TipoDniService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tipo-dnis');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(tipoDni: ITipoDni): Observable<EntityResponseType> {
    return this.http.post<ITipoDni>(this.resourceUrl, tipoDni, { observe: 'response' });
  }

  update(tipoDni: ITipoDni): Observable<EntityResponseType> {
    return this.http.put<ITipoDni>(`${this.resourceUrl}/${getTipoDniIdentifier(tipoDni) as number}`, tipoDni, { observe: 'response' });
  }

  partialUpdate(tipoDni: ITipoDni): Observable<EntityResponseType> {
    return this.http.patch<ITipoDni>(`${this.resourceUrl}/${getTipoDniIdentifier(tipoDni) as number}`, tipoDni, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITipoDni>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoDni[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTipoDniToCollectionIfMissing(tipoDniCollection: ITipoDni[], ...tipoDnisToCheck: (ITipoDni | null | undefined)[]): ITipoDni[] {
    const tipoDnis: ITipoDni[] = tipoDnisToCheck.filter(isPresent);
    if (tipoDnis.length > 0) {
      const tipoDniCollectionIdentifiers = tipoDniCollection.map(tipoDniItem => getTipoDniIdentifier(tipoDniItem)!);
      const tipoDnisToAdd = tipoDnis.filter(tipoDniItem => {
        const tipoDniIdentifier = getTipoDniIdentifier(tipoDniItem);
        if (tipoDniIdentifier == null || tipoDniCollectionIdentifiers.includes(tipoDniIdentifier)) {
          return false;
        }
        tipoDniCollectionIdentifiers.push(tipoDniIdentifier);
        return true;
      });
      return [...tipoDnisToAdd, ...tipoDniCollection];
    }
    return tipoDniCollection;
  }
}
