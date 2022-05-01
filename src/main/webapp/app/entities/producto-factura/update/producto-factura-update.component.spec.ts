import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ProductoFacturaService } from '../service/producto-factura.service';
import { IProductoFactura, ProductoFactura } from '../producto-factura.model';
import { IProducto } from 'app/entities/producto/producto.model';
import { ProductoService } from 'app/entities/producto/service/producto.service';

import { ProductoFacturaUpdateComponent } from './producto-factura-update.component';

describe('ProductoFactura Management Update Component', () => {
  let comp: ProductoFacturaUpdateComponent;
  let fixture: ComponentFixture<ProductoFacturaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let productoFacturaService: ProductoFacturaService;
  let productoService: ProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ProductoFacturaUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ProductoFacturaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProductoFacturaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    productoFacturaService = TestBed.inject(ProductoFacturaService);
    productoService = TestBed.inject(ProductoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Producto query and add missing value', () => {
      const productoFactura: IProductoFactura = { id: 456 };
      const producto: IProducto = { id: 40416 };
      productoFactura.producto = producto;

      const productoCollection: IProducto[] = [{ id: 87733 }];
      jest.spyOn(productoService, 'query').mockReturnValue(of(new HttpResponse({ body: productoCollection })));
      const additionalProductos = [producto];
      const expectedCollection: IProducto[] = [...additionalProductos, ...productoCollection];
      jest.spyOn(productoService, 'addProductoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ productoFactura });
      comp.ngOnInit();

      expect(productoService.query).toHaveBeenCalled();
      expect(productoService.addProductoToCollectionIfMissing).toHaveBeenCalledWith(productoCollection, ...additionalProductos);
      expect(comp.productosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const productoFactura: IProductoFactura = { id: 456 };
      const producto: IProducto = { id: 2207 };
      productoFactura.producto = producto;

      activatedRoute.data = of({ productoFactura });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(productoFactura));
      expect(comp.productosSharedCollection).toContain(producto);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ProductoFactura>>();
      const productoFactura = { id: 123 };
      jest.spyOn(productoFacturaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ productoFactura });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: productoFactura }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(productoFacturaService.update).toHaveBeenCalledWith(productoFactura);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ProductoFactura>>();
      const productoFactura = new ProductoFactura();
      jest.spyOn(productoFacturaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ productoFactura });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: productoFactura }));
      saveSubject.complete();

      // THEN
      expect(productoFacturaService.create).toHaveBeenCalledWith(productoFactura);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ProductoFactura>>();
      const productoFactura = { id: 123 };
      jest.spyOn(productoFacturaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ productoFactura });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(productoFacturaService.update).toHaveBeenCalledWith(productoFactura);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackProductoById', () => {
      it('Should return tracked Producto primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackProductoById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
