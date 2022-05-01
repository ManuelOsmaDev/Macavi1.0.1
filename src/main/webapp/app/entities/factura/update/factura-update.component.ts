import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IFactura, Factura } from '../factura.model';
import { FacturaService } from '../service/factura.service';
import { ICliente } from 'app/entities/cliente/cliente.model';
import { ClienteService } from 'app/entities/cliente/service/cliente.service';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';
import { IProductoFactura } from 'app/entities/producto-factura/producto-factura.model';
import { ProductoFacturaService } from 'app/entities/producto-factura/service/producto-factura.service';

@Component({
  selector: 'macavi-factura-update',
  templateUrl: './factura-update.component.html',
})
export class FacturaUpdateComponent implements OnInit {
  isSaving = false;

  clientesSharedCollection: ICliente[] = [];
  usuariosSharedCollection: IUsuario[] = [];
  productoFacturasSharedCollection: IProductoFactura[] = [];

  editForm = this.fb.group({
    id: [],
    descripcion: [null, [Validators.required, Validators.maxLength(500)]],
    fechaFact: [null, [Validators.required]],
    fechaVenc: [null, [Validators.required]],
    tipoPago: [null, [Validators.required, Validators.maxLength(10)]],
    totalFactura: [],
    cliente: [],
    usuario: [],
    prodctofactura: [],
  });

  constructor(
    protected facturaService: FacturaService,
    protected clienteService: ClienteService,
    protected usuarioService: UsuarioService,
    protected productoFacturaService: ProductoFacturaService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ factura }) => {
      if (factura.id === undefined) {
        const today = dayjs().startOf('day');
        factura.fechaFact = today;
        factura.fechaVenc = today;
      }

      this.updateForm(factura);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const factura = this.createFromForm();
    if (factura.id !== undefined) {
      this.subscribeToSaveResponse(this.facturaService.update(factura));
    } else {
      this.subscribeToSaveResponse(this.facturaService.create(factura));
    }
  }

  trackClienteById(_index: number, item: ICliente): number {
    return item.id!;
  }

  trackUsuarioById(_index: number, item: IUsuario): number {
    return item.id!;
  }

  trackProductoFacturaById(_index: number, item: IProductoFactura): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFactura>>): void {
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

  protected updateForm(factura: IFactura): void {
    this.editForm.patchValue({
      id: factura.id,
      descripcion: factura.descripcion,
      fechaFact: factura.fechaFact ? factura.fechaFact.format(DATE_TIME_FORMAT) : null,
      fechaVenc: factura.fechaVenc ? factura.fechaVenc.format(DATE_TIME_FORMAT) : null,
      tipoPago: factura.tipoPago,
      totalFactura: factura.totalFactura,
      cliente: factura.cliente,
      usuario: factura.usuario,
      prodctofactura: factura.prodctofactura,
    });

    this.clientesSharedCollection = this.clienteService.addClienteToCollectionIfMissing(this.clientesSharedCollection, factura.cliente);
    this.usuariosSharedCollection = this.usuarioService.addUsuarioToCollectionIfMissing(this.usuariosSharedCollection, factura.usuario);
    this.productoFacturasSharedCollection = this.productoFacturaService.addProductoFacturaToCollectionIfMissing(
      this.productoFacturasSharedCollection,
      factura.prodctofactura
    );
  }

  protected loadRelationshipsOptions(): void {
    this.clienteService
      .query()
      .pipe(map((res: HttpResponse<ICliente[]>) => res.body ?? []))
      .pipe(
        map((clientes: ICliente[]) => this.clienteService.addClienteToCollectionIfMissing(clientes, this.editForm.get('cliente')!.value))
      )
      .subscribe((clientes: ICliente[]) => (this.clientesSharedCollection = clientes));

    this.usuarioService
      .query()
      .pipe(map((res: HttpResponse<IUsuario[]>) => res.body ?? []))
      .pipe(
        map((usuarios: IUsuario[]) => this.usuarioService.addUsuarioToCollectionIfMissing(usuarios, this.editForm.get('usuario')!.value))
      )
      .subscribe((usuarios: IUsuario[]) => (this.usuariosSharedCollection = usuarios));

    this.productoFacturaService
      .query()
      .pipe(map((res: HttpResponse<IProductoFactura[]>) => res.body ?? []))
      .pipe(
        map((productoFacturas: IProductoFactura[]) =>
          this.productoFacturaService.addProductoFacturaToCollectionIfMissing(productoFacturas, this.editForm.get('prodctofactura')!.value)
        )
      )
      .subscribe((productoFacturas: IProductoFactura[]) => (this.productoFacturasSharedCollection = productoFacturas));
  }

  protected createFromForm(): IFactura {
    return {
      ...new Factura(),
      id: this.editForm.get(['id'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value,
      fechaFact: this.editForm.get(['fechaFact'])!.value ? dayjs(this.editForm.get(['fechaFact'])!.value, DATE_TIME_FORMAT) : undefined,
      fechaVenc: this.editForm.get(['fechaVenc'])!.value ? dayjs(this.editForm.get(['fechaVenc'])!.value, DATE_TIME_FORMAT) : undefined,
      tipoPago: this.editForm.get(['tipoPago'])!.value,
      totalFactura: this.editForm.get(['totalFactura'])!.value,
      cliente: this.editForm.get(['cliente'])!.value,
      usuario: this.editForm.get(['usuario'])!.value,
      prodctofactura: this.editForm.get(['prodctofactura'])!.value,
    };
  }
}
