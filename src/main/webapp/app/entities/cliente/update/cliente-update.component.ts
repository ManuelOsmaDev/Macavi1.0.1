import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ICliente, Cliente } from '../cliente.model';
import { ClienteService } from '../service/cliente.service';
import { ILocate } from 'app/entities/locate/locate.model';
import { LocateService } from 'app/entities/locate/service/locate.service';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';

@Component({
  selector: 'macavi-cliente-update',
  templateUrl: './cliente-update.component.html',
})
export class ClienteUpdateComponent implements OnInit {
  isSaving = false;

  locatesSharedCollection: ILocate[] = [];
  usuariosSharedCollection: IUsuario[] = [];

  editForm = this.fb.group({
    id: [],
    direcion: [null, [Validators.required, Validators.maxLength(60)]],
    telefono: [null, [Validators.required]],
    locate: [],
    usuario: [],
  });

  constructor(
    protected clienteService: ClienteService,
    protected locateService: LocateService,
    protected usuarioService: UsuarioService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cliente }) => {
      this.updateForm(cliente);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cliente = this.createFromForm();
    if (cliente.id !== undefined) {
      this.subscribeToSaveResponse(this.clienteService.update(cliente));
    } else {
      this.subscribeToSaveResponse(this.clienteService.create(cliente));
    }
  }

  trackLocateById(_index: number, item: ILocate): number {
    return item.id!;
  }

  trackUsuarioById(_index: number, item: IUsuario): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICliente>>): void {
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

  protected updateForm(cliente: ICliente): void {
    this.editForm.patchValue({
      id: cliente.id,
      direcion: cliente.direcion,
      telefono: cliente.telefono,
      locate: cliente.locate,
      usuario: cliente.usuario,
    });

    this.locatesSharedCollection = this.locateService.addLocateToCollectionIfMissing(this.locatesSharedCollection, cliente.locate);
    this.usuariosSharedCollection = this.usuarioService.addUsuarioToCollectionIfMissing(this.usuariosSharedCollection, cliente.usuario);
  }

  protected loadRelationshipsOptions(): void {
    this.locateService
      .query()
      .pipe(map((res: HttpResponse<ILocate[]>) => res.body ?? []))
      .pipe(map((locates: ILocate[]) => this.locateService.addLocateToCollectionIfMissing(locates, this.editForm.get('locate')!.value)))
      .subscribe((locates: ILocate[]) => (this.locatesSharedCollection = locates));

    this.usuarioService
      .query()
      .pipe(map((res: HttpResponse<IUsuario[]>) => res.body ?? []))
      .pipe(
        map((usuarios: IUsuario[]) => this.usuarioService.addUsuarioToCollectionIfMissing(usuarios, this.editForm.get('usuario')!.value))
      )
      .subscribe((usuarios: IUsuario[]) => (this.usuariosSharedCollection = usuarios));
  }

  protected createFromForm(): ICliente {
    return {
      ...new Cliente(),
      id: this.editForm.get(['id'])!.value,
      direcion: this.editForm.get(['direcion'])!.value,
      telefono: this.editForm.get(['telefono'])!.value,
      locate: this.editForm.get(['locate'])!.value,
      usuario: this.editForm.get(['usuario'])!.value,
    };
  }
}
