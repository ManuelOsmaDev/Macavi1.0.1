import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IProductoFactura, ProductoFactura } from '../producto-factura.model';
import { ProductoFacturaService } from '../service/producto-factura.service';
import { IProducto } from 'app/entities/producto/producto.model';
import { ProductoService } from 'app/entities/producto/service/producto.service';

@Component({
  selector: 'macavi-producto-factura-update',
  templateUrl: './producto-factura-update.component.html',
})
export class ProductoFacturaUpdateComponent implements OnInit {
  isSaving = false;

  productosSharedCollection: IProducto[] = [];

  editForm = this.fb.group({
    id: [],
    producto: [],
  });

  constructor(
    protected productoFacturaService: ProductoFacturaService,
    protected productoService: ProductoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productoFactura }) => {
      this.updateForm(productoFactura);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const productoFactura = this.createFromForm();
    if (productoFactura.id !== undefined) {
      this.subscribeToSaveResponse(this.productoFacturaService.update(productoFactura));
    } else {
      this.subscribeToSaveResponse(this.productoFacturaService.create(productoFactura));
    }
  }

  trackProductoById(_index: number, item: IProducto): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductoFactura>>): void {
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

  protected updateForm(productoFactura: IProductoFactura): void {
    this.editForm.patchValue({
      id: productoFactura.id,
      producto: productoFactura.producto,
    });

    this.productosSharedCollection = this.productoService.addProductoToCollectionIfMissing(
      this.productosSharedCollection,
      productoFactura.producto
    );
  }

  protected loadRelationshipsOptions(): void {
    this.productoService
      .query()
      .pipe(map((res: HttpResponse<IProducto[]>) => res.body ?? []))
      .pipe(
        map((productos: IProducto[]) =>
          this.productoService.addProductoToCollectionIfMissing(productos, this.editForm.get('producto')!.value)
        )
      )
      .subscribe((productos: IProducto[]) => (this.productosSharedCollection = productos));
  }

  protected createFromForm(): IProductoFactura {
    return {
      ...new ProductoFactura(),
      id: this.editForm.get(['id'])!.value,
      producto: this.editForm.get(['producto'])!.value,
    };
  }
}
