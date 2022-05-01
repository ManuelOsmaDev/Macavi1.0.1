import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IProductoFactura, ProductoFactura } from '../producto-factura.model';

import { ProductoFacturaService } from './producto-factura.service';

describe('ProductoFactura Service', () => {
  let service: ProductoFacturaService;
  let httpMock: HttpTestingController;
  let elemDefault: IProductoFactura;
  let expectedResult: IProductoFactura | IProductoFactura[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ProductoFacturaService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a ProductoFactura', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new ProductoFactura()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ProductoFactura', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ProductoFactura', () => {
      const patchObject = Object.assign({}, new ProductoFactura());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ProductoFactura', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a ProductoFactura', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addProductoFacturaToCollectionIfMissing', () => {
      it('should add a ProductoFactura to an empty array', () => {
        const productoFactura: IProductoFactura = { id: 123 };
        expectedResult = service.addProductoFacturaToCollectionIfMissing([], productoFactura);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(productoFactura);
      });

      it('should not add a ProductoFactura to an array that contains it', () => {
        const productoFactura: IProductoFactura = { id: 123 };
        const productoFacturaCollection: IProductoFactura[] = [
          {
            ...productoFactura,
          },
          { id: 456 },
        ];
        expectedResult = service.addProductoFacturaToCollectionIfMissing(productoFacturaCollection, productoFactura);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ProductoFactura to an array that doesn't contain it", () => {
        const productoFactura: IProductoFactura = { id: 123 };
        const productoFacturaCollection: IProductoFactura[] = [{ id: 456 }];
        expectedResult = service.addProductoFacturaToCollectionIfMissing(productoFacturaCollection, productoFactura);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(productoFactura);
      });

      it('should add only unique ProductoFactura to an array', () => {
        const productoFacturaArray: IProductoFactura[] = [{ id: 123 }, { id: 456 }, { id: 64308 }];
        const productoFacturaCollection: IProductoFactura[] = [{ id: 123 }];
        expectedResult = service.addProductoFacturaToCollectionIfMissing(productoFacturaCollection, ...productoFacturaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const productoFactura: IProductoFactura = { id: 123 };
        const productoFactura2: IProductoFactura = { id: 456 };
        expectedResult = service.addProductoFacturaToCollectionIfMissing([], productoFactura, productoFactura2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(productoFactura);
        expect(expectedResult).toContain(productoFactura2);
      });

      it('should accept null and undefined values', () => {
        const productoFactura: IProductoFactura = { id: 123 };
        expectedResult = service.addProductoFacturaToCollectionIfMissing([], null, productoFactura, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(productoFactura);
      });

      it('should return initial array if no ProductoFactura is added', () => {
        const productoFacturaCollection: IProductoFactura[] = [{ id: 123 }];
        expectedResult = service.addProductoFacturaToCollectionIfMissing(productoFacturaCollection, undefined, null);
        expect(expectedResult).toEqual(productoFacturaCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
