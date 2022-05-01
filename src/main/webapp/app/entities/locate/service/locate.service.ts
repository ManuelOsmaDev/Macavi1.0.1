import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ILocate, getLocateIdentifier } from '../locate.model';

export type EntityResponseType = HttpResponse<ILocate>;
export type EntityArrayResponseType = HttpResponse<ILocate[]>;

@Injectable({ providedIn: 'root' })
export class LocateService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/locates');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(locate: ILocate): Observable<EntityResponseType> {
    return this.http.post<ILocate>(this.resourceUrl, locate, { observe: 'response' });
  }

  update(locate: ILocate): Observable<EntityResponseType> {
    return this.http.put<ILocate>(`${this.resourceUrl}/${getLocateIdentifier(locate) as number}`, locate, { observe: 'response' });
  }

  partialUpdate(locate: ILocate): Observable<EntityResponseType> {
    return this.http.patch<ILocate>(`${this.resourceUrl}/${getLocateIdentifier(locate) as number}`, locate, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILocate>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILocate[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addLocateToCollectionIfMissing(locateCollection: ILocate[], ...locatesToCheck: (ILocate | null | undefined)[]): ILocate[] {
    const locates: ILocate[] = locatesToCheck.filter(isPresent);
    if (locates.length > 0) {
      const locateCollectionIdentifiers = locateCollection.map(locateItem => getLocateIdentifier(locateItem)!);
      const locatesToAdd = locates.filter(locateItem => {
        const locateIdentifier = getLocateIdentifier(locateItem);
        if (locateIdentifier == null || locateCollectionIdentifiers.includes(locateIdentifier)) {
          return false;
        }
        locateCollectionIdentifiers.push(locateIdentifier);
        return true;
      });
      return [...locatesToAdd, ...locateCollection];
    }
    return locateCollection;
  }
}
