import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ILocate, Locate } from '../locate.model';

import { LocateService } from './locate.service';

describe('Locate Service', () => {
  let service: LocateService;
  let httpMock: HttpTestingController;
  let elemDefault: ILocate;
  let expectedResult: ILocate | ILocate[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(LocateService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      ciudad: 'AAAAAAA',
      departamento: 'AAAAAAA',
      pais: 'AAAAAAA',
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

    it('should create a Locate', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Locate()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Locate', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          ciudad: 'BBBBBB',
          departamento: 'BBBBBB',
          pais: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Locate', () => {
      const patchObject = Object.assign(
        {
          pais: 'BBBBBB',
        },
        new Locate()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Locate', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          ciudad: 'BBBBBB',
          departamento: 'BBBBBB',
          pais: 'BBBBBB',
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

    it('should delete a Locate', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addLocateToCollectionIfMissing', () => {
      it('should add a Locate to an empty array', () => {
        const locate: ILocate = { id: 123 };
        expectedResult = service.addLocateToCollectionIfMissing([], locate);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(locate);
      });

      it('should not add a Locate to an array that contains it', () => {
        const locate: ILocate = { id: 123 };
        const locateCollection: ILocate[] = [
          {
            ...locate,
          },
          { id: 456 },
        ];
        expectedResult = service.addLocateToCollectionIfMissing(locateCollection, locate);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Locate to an array that doesn't contain it", () => {
        const locate: ILocate = { id: 123 };
        const locateCollection: ILocate[] = [{ id: 456 }];
        expectedResult = service.addLocateToCollectionIfMissing(locateCollection, locate);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(locate);
      });

      it('should add only unique Locate to an array', () => {
        const locateArray: ILocate[] = [{ id: 123 }, { id: 456 }, { id: 2905 }];
        const locateCollection: ILocate[] = [{ id: 123 }];
        expectedResult = service.addLocateToCollectionIfMissing(locateCollection, ...locateArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const locate: ILocate = { id: 123 };
        const locate2: ILocate = { id: 456 };
        expectedResult = service.addLocateToCollectionIfMissing([], locate, locate2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(locate);
        expect(expectedResult).toContain(locate2);
      });

      it('should accept null and undefined values', () => {
        const locate: ILocate = { id: 123 };
        expectedResult = service.addLocateToCollectionIfMissing([], null, locate, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(locate);
      });

      it('should return initial array if no Locate is added', () => {
        const locateCollection: ILocate[] = [{ id: 123 }];
        expectedResult = service.addLocateToCollectionIfMissing(locateCollection, undefined, null);
        expect(expectedResult).toEqual(locateCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
