import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ITipoDni, TipoDni } from '../tipo-dni.model';
import { TipoDniService } from '../service/tipo-dni.service';

@Component({
  selector: 'macavi-tipo-dni-update',
  templateUrl: './tipo-dni-update.component.html',
})
export class TipoDniUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombreDni: [null, [Validators.required, Validators.maxLength(20)]],
  });

  constructor(protected tipoDniService: TipoDniService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoDni }) => {
      this.updateForm(tipoDni);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tipoDni = this.createFromForm();
    if (tipoDni.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoDniService.update(tipoDni));
    } else {
      this.subscribeToSaveResponse(this.tipoDniService.create(tipoDni));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoDni>>): void {
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

  protected updateForm(tipoDni: ITipoDni): void {
    this.editForm.patchValue({
      id: tipoDni.id,
      nombreDni: tipoDni.nombreDni,
    });
  }

  protected createFromForm(): ITipoDni {
    return {
      ...new TipoDni(),
      id: this.editForm.get(['id'])!.value,
      nombreDni: this.editForm.get(['nombreDni'])!.value,
    };
  }
}
