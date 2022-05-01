import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IRolUsuario, RolUsuario } from '../rol-usuario.model';

import { RolUsuarioService } from './rol-usuario.service';

describe('RolUsuario Service', () => {
  let service: RolUsuarioService;
  let httpMock: HttpTestingController;
  let elemDefault: IRolUsuario;
  let expectedResult: IRolUsuario | IRolUsuario[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(RolUsuarioService);
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

    it('should create a RolUsuario', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new RolUsuario()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a RolUsuario', () => {
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

    it('should partial update a RolUsuario', () => {
      const patchObject = Object.assign({}, new RolUsuario());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of RolUsuario', () => {
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

    it('should delete a RolUsuario', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addRolUsuarioToCollectionIfMissing', () => {
      it('should add a RolUsuario to an empty array', () => {
        const rolUsuario: IRolUsuario = { id: 123 };
        expectedResult = service.addRolUsuarioToCollectionIfMissing([], rolUsuario);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(rolUsuario);
      });

      it('should not add a RolUsuario to an array that contains it', () => {
        const rolUsuario: IRolUsuario = { id: 123 };
        const rolUsuarioCollection: IRolUsuario[] = [
          {
            ...rolUsuario,
          },
          { id: 456 },
        ];
        expectedResult = service.addRolUsuarioToCollectionIfMissing(rolUsuarioCollection, rolUsuario);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a RolUsuario to an array that doesn't contain it", () => {
        const rolUsuario: IRolUsuario = { id: 123 };
        const rolUsuarioCollection: IRolUsuario[] = [{ id: 456 }];
        expectedResult = service.addRolUsuarioToCollectionIfMissing(rolUsuarioCollection, rolUsuario);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(rolUsuario);
      });

      it('should add only unique RolUsuario to an array', () => {
        const rolUsuarioArray: IRolUsuario[] = [{ id: 123 }, { id: 456 }, { id: 40338 }];
        const rolUsuarioCollection: IRolUsuario[] = [{ id: 123 }];
        expectedResult = service.addRolUsuarioToCollectionIfMissing(rolUsuarioCollection, ...rolUsuarioArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const rolUsuario: IRolUsuario = { id: 123 };
        const rolUsuario2: IRolUsuario = { id: 456 };
        expectedResult = service.addRolUsuarioToCollectionIfMissing([], rolUsuario, rolUsuario2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(rolUsuario);
        expect(expectedResult).toContain(rolUsuario2);
      });

      it('should accept null and undefined values', () => {
        const rolUsuario: IRolUsuario = { id: 123 };
        expectedResult = service.addRolUsuarioToCollectionIfMissing([], null, rolUsuario, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(rolUsuario);
      });

      it('should return initial array if no RolUsuario is added', () => {
        const rolUsuarioCollection: IRolUsuario[] = [{ id: 123 }];
        expectedResult = service.addRolUsuarioToCollectionIfMissing(rolUsuarioCollection, undefined, null);
        expect(expectedResult).toEqual(rolUsuarioCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
