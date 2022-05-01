import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ILocate, Locate } from '../locate.model';
import { LocateService } from '../service/locate.service';

@Component({
  selector: 'macavi-locate-update',
  templateUrl: './locate-update.component.html',
})
export class LocateUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    ciudad: [null, [Validators.required, Validators.maxLength(50)]],
    departamento: [null, [Validators.required, Validators.maxLength(50)]],
    pais: [null, [Validators.required, Validators.maxLength(50)]],
  });

  constructor(protected locateService: LocateService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ locate }) => {
      this.updateForm(locate);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const locate = this.createFromForm();
    if (locate.id !== undefined) {
      this.subscribeToSaveResponse(this.locateService.update(locate));
    } else {
      this.subscribeToSaveResponse(this.locateService.create(locate));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILocate>>): void {
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

  protected updateForm(locate: ILocate): void {
    this.editForm.patchValue({
      id: locate.id,
      ciudad: locate.ciudad,
      departamento: locate.departamento,
      pais: locate.pais,
    });
  }

  protected createFromForm(): ILocate {
    return {
      ...new Locate(),
      id: this.editForm.get(['id'])!.value,
      ciudad: this.editForm.get(['ciudad'])!.value,
      departamento: this.editForm.get(['departamento'])!.value,
      pais: this.editForm.get(['pais'])!.value,
    };
  }
}
