import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ILocate, Locate } from '../locate.model';
import { LocateService } from '../service/locate.service';

@Injectable({ providedIn: 'root' })
export class LocateRoutingResolveService implements Resolve<ILocate> {
  constructor(protected service: LocateService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILocate> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((locate: HttpResponse<Locate>) => {
          if (locate.body) {
            return of(locate.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Locate());
  }
}
