import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IUsuario, Usuario } from '../usuario.model';
import { UsuarioService } from '../service/usuario.service';
import { ITipoDni } from 'app/entities/tipo-dni/tipo-dni.model';
import { TipoDniService } from 'app/entities/tipo-dni/service/tipo-dni.service';

@Component({
  selector: 'macavi-usuario-update',
  templateUrl: './usuario-update.component.html',
})
export class UsuarioUpdateComponent implements OnInit {
  isSaving = false;

  tipoDnisSharedCollection: ITipoDni[] = [];

  editForm = this.fb.group({
    id: [],
    email: [null, [Validators.required, Validators.maxLength(100)]],
    loginUsuario: [null, [Validators.required, Validators.maxLength(100)]],
    nombre: [null, [Validators.required, Validators.maxLength(30)]],
    tipoDni: [null, [Validators.required, Validators.maxLength(90)]],
    password: [null, [Validators.required, Validators.maxLength(100)]],
    tipodni: [],
  });

  constructor(
    protected usuarioService: UsuarioService,
    protected tipoDniService: TipoDniService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ usuario }) => {
      this.updateForm(usuario);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const usuario = this.createFromForm();
    if (usuario.id !== undefined) {
      this.subscribeToSaveResponse(this.usuarioService.update(usuario));
    } else {
      this.subscribeToSaveResponse(this.usuarioService.create(usuario));
    }
  }

  trackTipoDniById(_index: number, item: ITipoDni): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUsuario>>): void {
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

  protected updateForm(usuario: IUsuario): void {
    this.editForm.patchValue({
      id: usuario.id,
      email: usuario.email,
      loginUsuario: usuario.loginUsuario,
      nombre: usuario.nombre,
      tipoDni: usuario.tipoDni,
      password: usuario.password,
      tipodni: usuario.tipodni,
    });

    this.tipoDnisSharedCollection = this.tipoDniService.addTipoDniToCollectionIfMissing(this.tipoDnisSharedCollection, usuario.tipodni);
  }

  protected loadRelationshipsOptions(): void {
    this.tipoDniService
      .query()
      .pipe(map((res: HttpResponse<ITipoDni[]>) => res.body ?? []))
      .pipe(
        map((tipoDnis: ITipoDni[]) => this.tipoDniService.addTipoDniToCollectionIfMissing(tipoDnis, this.editForm.get('tipodni')!.value))
      )
      .subscribe((tipoDnis: ITipoDni[]) => (this.tipoDnisSharedCollection = tipoDnis));
  }

  protected createFromForm(): IUsuario {
    return {
      ...new Usuario(),
      id: this.editForm.get(['id'])!.value,
      email: this.editForm.get(['email'])!.value,
      loginUsuario: this.editForm.get(['loginUsuario'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      tipoDni: this.editForm.get(['tipoDni'])!.value,
      password: this.editForm.get(['password'])!.value,
      tipodni: this.editForm.get(['tipodni'])!.value,
    };
  }
}
