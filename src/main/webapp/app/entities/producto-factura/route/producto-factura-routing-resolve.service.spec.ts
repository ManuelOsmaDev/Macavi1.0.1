import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IProductoFactura, ProductoFactura } from '../producto-factura.model';
import { ProductoFacturaService } from '../service/producto-factura.service';

import { ProductoFacturaRoutingResolveService } from './producto-factura-routing-resolve.service';

describe('ProductoFactura routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: ProductoFacturaRoutingResolveService;
  let service: ProductoFacturaService;
  let resultProductoFactura: IProductoFactura | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(ProductoFacturaRoutingResolveService);
    service = TestBed.inject(ProductoFacturaService);
    resultProductoFactura = undefined;
  });

  describe('resolve', () => {
    it('should return IProductoFactura returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultProductoFactura = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultProductoFactura).toEqual({ id: 123 });
    });

    it('should return new IProductoFactura if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultProductoFactura = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultProductoFactura).toEqual(new ProductoFactura());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as ProductoFactura })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultProductoFactura = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultProductoFactura).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
