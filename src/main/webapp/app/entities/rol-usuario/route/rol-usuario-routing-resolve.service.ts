import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IRolUsuario, RolUsuario } from '../rol-usuario.model';
import { RolUsuarioService } from '../service/rol-usuario.service';

@Injectable({ providedIn: 'root' })
export class RolUsuarioRoutingResolveService implements Resolve<IRolUsuario> {
  constructor(protected service: RolUsuarioService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRolUsuario> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((rolUsuario: HttpResponse<RolUsuario>) => {
          if (rolUsuario.body) {
            return of(rolUsuario.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RolUsuario());
  }
}
