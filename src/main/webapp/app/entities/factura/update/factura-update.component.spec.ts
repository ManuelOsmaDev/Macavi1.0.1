import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { FacturaService } from '../service/factura.service';
import { IFactura, Factura } from '../factura.model';
import { ICliente } from 'app/entities/cliente/cliente.model';
import { ClienteService } from 'app/entities/cliente/service/cliente.service';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';
import { IProductoFactura } from 'app/entities/producto-factura/producto-factura.model';
import { ProductoFacturaService } from 'app/entities/producto-factura/service/producto-factura.service';

import { FacturaUpdateComponent } from './factura-update.component';

describe('Factura Management Update Component', () => {
  let comp: FacturaUpdateComponent;
  let fixture: ComponentFixture<FacturaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let facturaService: FacturaService;
  let clienteService: ClienteService;
  let usuarioService: UsuarioService;
  let productoFacturaService: ProductoFacturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FacturaUpdateComponent],
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
      .overrideTemplate(FacturaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FacturaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    facturaService = TestBed.inject(FacturaService);
    clienteService = TestBed.inject(ClienteService);
    usuarioService = TestBed.inject(UsuarioService);
    productoFacturaService = TestBed.inject(ProductoFacturaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Cliente query and add missing value', () => {
      const factura: IFactura = { id: 456 };
      const cliente: ICliente = { id: 98815 };
      factura.cliente = cliente;

      const clienteCollection: ICliente[] = [{ id: 59464 }];
      jest.spyOn(clienteService, 'query').mockReturnValue(of(new HttpResponse({ body: clienteCollection })));
      const additionalClientes = [cliente];
      const expectedCollection: ICliente[] = [...additionalClientes, ...clienteCollection];
      jest.spyOn(clienteService, 'addClienteToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ factura });
      comp.ngOnInit();

      expect(clienteService.query).toHaveBeenCalled();
      expect(clienteService.addClienteToCollectionIfMissing).toHaveBeenCalledWith(clienteCollection, ...additionalClientes);
      expect(comp.clientesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Usuario query and add missing value', () => {
      const factura: IFactura = { id: 456 };
      const usuario: IUsuario = { id: 226 };
      factura.usuario = usuario;

      const usuarioCollection: IUsuario[] = [{ id: 49634 }];
      jest.spyOn(usuarioService, 'query').mockReturnValue(of(new HttpResponse({ body: usuarioCollection })));
      const additionalUsuarios = [usuario];
      const expectedCollection: IUsuario[] = [...additionalUsuarios, ...usuarioCollection];
      jest.spyOn(usuarioService, 'addUsuarioToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ factura });
      comp.ngOnInit();

      expect(usuarioService.query).toHaveBeenCalled();
      expect(usuarioService.addUsuarioToCollectionIfMissing).toHaveBeenCalledWith(usuarioCollection, ...additionalUsuarios);
      expect(comp.usuariosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call ProductoFactura query and add missing value', () => {
      const factura: IFactura = { id: 456 };
      const prodctofactura: IProductoFactura = { id: 56631 };
      factura.prodctofactura = prodctofactura;

      const productoFacturaCollection: IProductoFactura[] = [{ id: 89230 }];
      jest.spyOn(productoFacturaService, 'query').mockReturnValue(of(new HttpResponse({ body: productoFacturaCollection })));
      const additionalProductoFacturas = [prodctofactura];
      const expectedCollection: IProductoFactura[] = [...additionalProductoFacturas, ...productoFacturaCollection];
      jest.spyOn(productoFacturaService, 'addProductoFacturaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ factura });
      comp.ngOnInit();

      expect(productoFacturaService.query).toHaveBeenCalled();
      expect(productoFacturaService.addProductoFacturaToCollectionIfMissing).toHaveBeenCalledWith(
        productoFacturaCollection,
        ...additionalProductoFacturas
      );
      expect(comp.productoFacturasSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const factura: IFactura = { id: 456 };
      const cliente: ICliente = { id: 70014 };
      factura.cliente = cliente;
      const usuario: IUsuario = { id: 36071 };
      factura.usuario = usuario;
      const prodctofactura: IProductoFactura = { id: 36552 };
      factura.prodctofactura = prodctofactura;

      activatedRoute.data = of({ factura });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(factura));
      expect(comp.clientesSharedCollection).toContain(cliente);
      expect(comp.usuariosSharedCollection).toContain(usuario);
      expect(comp.productoFacturasSharedCollection).toContain(prodctofactura);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Factura>>();
      const factura = { id: 123 };
      jest.spyOn(facturaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ factura });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: factura }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(facturaService.update).toHaveBeenCalledWith(factura);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Factura>>();
      const factura = new Factura();
      jest.spyOn(facturaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ factura });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: factura }));
      saveSubject.complete();

      // THEN
      expect(facturaService.create).toHaveBeenCalledWith(factura);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Factura>>();
      const factura = { id: 123 };
      jest.spyOn(facturaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ factura });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(facturaService.update).toHaveBeenCalledWith(factura);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackClienteById', () => {
      it('Should return tracked Cliente primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackClienteById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackUsuarioById', () => {
      it('Should return tracked Usuario primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackUsuarioById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackProductoFacturaById', () => {
      it('Should return tracked ProductoFactura primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackProductoFacturaById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
