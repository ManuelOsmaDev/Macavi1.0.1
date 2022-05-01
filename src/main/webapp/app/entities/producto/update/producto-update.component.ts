import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IProducto, Producto } from '../producto.model';
import { ProductoService } from '../service/producto.service';

@Component({
  selector: 'macavi-producto-update',
  templateUrl: './producto-update.component.html',
})
export class ProductoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    cantidadProducto: [],
    descripcionProdcuto: [null, [Validators.required, Validators.maxLength(100)]],
    estilo: [null, [Validators.required, Validators.maxLength(20)]],
    genero: [null, [Validators.required, Validators.maxLength(20)]],
    marca: [null, [Validators.required, Validators.maxLength(20)]],
    porcentajeIva: [],
    talla: [],
  });

  constructor(protected productoService: ProductoService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ producto }) => {
      this.updateForm(producto);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const producto = this.createFromForm();
    if (producto.id !== undefined) {
      this.subscribeToSaveResponse(this.productoService.update(producto));
    } else {
      this.subscribeToSaveResponse(this.productoService.create(producto));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProducto>>): void {
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

  protected updateForm(producto: IProducto): void {
    this.editForm.patchValue({
      id: producto.id,
      cantidadProducto: producto.cantidadProducto,
      descripcionProdcuto: producto.descripcionProdcuto,
      estilo: producto.estilo,
      genero: producto.genero,
      marca: producto.marca,
      porcentajeIva: producto.porcentajeIva,
      talla: producto.talla,
    });
  }

  protected createFromForm(): IProducto {
    return {
      ...new Producto(),
      id: this.editForm.get(['id'])!.value,
      cantidadProducto: this.editForm.get(['cantidadProducto'])!.value,
      descripcionProdcuto: this.editForm.get(['descripcionProdcuto'])!.value,
      estilo: this.editForm.get(['estilo'])!.value,
      genero: this.editForm.get(['genero'])!.value,
      marca: this.editForm.get(['marca'])!.value,
      porcentajeIva: this.editForm.get(['porcentajeIva'])!.value,
      talla: this.editForm.get(['talla'])!.value,
    };
  }
}
