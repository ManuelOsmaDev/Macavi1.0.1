import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITipoDni, TipoDni } from '../tipo-dni.model';
import { TipoDniService } from '../service/tipo-dni.service';

@Injectable({ providedIn: 'root' })
export class TipoDniRoutingResolveService implements Resolve<ITipoDni> {
  constructor(protected service: TipoDniService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITipoDni> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((tipoDni: HttpResponse<TipoDni>) => {
          if (tipoDni.body) {
            return of(tipoDni.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TipoDni());
  }
}
