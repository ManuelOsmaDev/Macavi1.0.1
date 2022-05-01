import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IRolUsuario, RolUsuario } from '../rol-usuario.model';
import { RolUsuarioService } from '../service/rol-usuario.service';
import { IRol } from 'app/entities/rol/rol.model';
import { RolService } from 'app/entities/rol/service/rol.service';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';

@Component({
  selector: 'macavi-rol-usuario-update',
  templateUrl: './rol-usuario-update.component.html',
})
export class RolUsuarioUpdateComponent implements OnInit {
  isSaving = false;

  rolsSharedCollection: IRol[] = [];
  usuariosSharedCollection: IUsuario[] = [];

  editForm = this.fb.group({
    id: [],
    rol: [],
    usuarioRol: [],
  });

  constructor(
    protected rolUsuarioService: RolUsuarioService,
    protected rolService: RolService,
    protected usuarioService: UsuarioService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ rolUsuario }) => {
      this.updateForm(rolUsuario);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const rolUsuario = this.createFromForm();
    if (rolUsuario.id !== undefined) {
      this.subscribeToSaveResponse(this.rolUsuarioService.update(rolUsuario));
    } else {
      this.subscribeToSaveResponse(this.rolUsuarioService.create(rolUsuario));
    }
  }

  trackRolById(_index: number, item: IRol): number {
    return item.id!;
  }

  trackUsuarioById(_index: number, item: IUsuario): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRolUsuario>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(rolUsuario: IRolUsuario): void {
    this.editForm.patchValue({
      id: rolUsuario.id,
      rol: rolUsuario.rol,
      usuarioRol: rolUsuario.usuarioRol,
    });

    this.rolsSharedCollection = this.rolService.addRolToCollectionIfMissing(this.rolsSharedCollection, rolUsuario.rol);
    this.usuariosSharedCollection = this.usuarioService.addUsuarioToCollectionIfMissing(
      this.usuariosSharedCollection,
      rolUsuario.usuarioRol
    );
  }

  protected loadRelationshipsOptions(): void {
    this.rolService
      .query()
      .pipe(map((res: HttpResponse<IRol[]>) => res.body ?? []))
      .pipe(map((rols: IRol[]) => this.rolService.addRolToCollectionIfMissing(rols, this.editForm.get('rol')!.value)))
      .subscribe((rols: IRol[]) => (this.rolsSharedCollection = rols));

    this.usuarioService
      .query()
      .pipe(map((res: HttpResponse<IUsuario[]>) => res.body ?? []))
      .pipe(
        map((usuarios: IUsuario[]) => this.usuarioService.addUsuarioToCollectionIfMissing(usuarios, this.editForm.get('usuarioRol')!.value))
      )
      .subscribe((usuarios: IUsuario[]) => (this.usuariosSharedCollection = usuarios));
  }

  protected createFromForm(): IRolUsuario {
    return {
      ...new RolUsuario(),
      id: this.editForm.get(['id'])!.value,
      rol: this.editForm.get(['rol'])!.value,
      usuarioRol: this.editForm.get(['usuarioRol'])!.value,
    };
  }
}
