import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITipoDni, TipoDni } from '../tipo-dni.model';

import { TipoDniService } from './tipo-dni.service';

describe('TipoDni Service', () => {
  let service: TipoDniService;
  let httpMock: HttpTestingController;
  let elemDefault: ITipoDni;
  let expectedResult: ITipoDni | ITipoDni[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TipoDniService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      nombreDni: 'AAAAAAA',
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

    it('should create a TipoDni', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new TipoDni()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TipoDni', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nombreDni: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TipoDni', () => {
      const patchObject = Object.assign({}, new TipoDni());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TipoDni', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nombreDni: 'BBBBBB',
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

    it('should delete a TipoDni', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addTipoDniToCollectionIfMissing', () => {
      it('should add a TipoDni to an empty array', () => {
        const tipoDni: ITipoDni = { id: 123 };
        expectedResult = service.addTipoDniToCollectionIfMissing([], tipoDni);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tipoDni);
      });

      it('should not add a TipoDni to an array that contains it', () => {
        const tipoDni: ITipoDni = { id: 123 };
        const tipoDniCollection: ITipoDni[] = [
          {
            ...tipoDni,
          },
          { id: 456 },
        ];
        expectedResult = service.addTipoDniToCollectionIfMissing(tipoDniCollection, tipoDni);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TipoDni to an array that doesn't contain it", () => {
        const tipoDni: ITipoDni = { id: 123 };
        const tipoDniCollection: ITipoDni[] = [{ id: 456 }];
        expectedResult = service.addTipoDniToCollectionIfMissing(tipoDniCollection, tipoDni);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tipoDni);
      });

      it('should add only unique TipoDni to an array', () => {
        const tipoDniArray: ITipoDni[] = [{ id: 123 }, { id: 456 }, { id: 34673 }];
        const tipoDniCollection: ITipoDni[] = [{ id: 123 }];
        expectedResult = service.addTipoDniToCollectionIfMissing(tipoDniCollection, ...tipoDniArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const tipoDni: ITipoDni = { id: 123 };
        const tipoDni2: ITipoDni = { id: 456 };
        expectedResult = service.addTipoDniToCollectionIfMissing([], tipoDni, tipoDni2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tipoDni);
        expect(expectedResult).toContain(tipoDni2);
      });

      it('should accept null and undefined values', () => {
        const tipoDni: ITipoDni = { id: 123 };
        expectedResult = service.addTipoDniToCollectionIfMissing([], null, tipoDni, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tipoDni);
      });

      it('should return initial array if no TipoDni is added', () => {
        const tipoDniCollection: ITipoDni[] = [{ id: 123 }];
        expectedResult = service.addTipoDniToCollectionIfMissing(tipoDniCollection, undefined, null);
        expect(expectedResult).toEqual(tipoDniCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
