import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { LocateService } from '../service/locate.service';
import { ILocate, Locate } from '../locate.model';

import { LocateUpdateComponent } from './locate-update.component';

describe('Locate Management Update Component', () => {
  let comp: LocateUpdateComponent;
  let fixture: ComponentFixture<LocateUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let locateService: LocateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [LocateUpdateComponent],
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
      .overrideTemplate(LocateUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LocateUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    locateService = TestBed.inject(LocateService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const locate: ILocate = { id: 456 };

      activatedRoute.data = of({ locate });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(locate));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Locate>>();
      const locate = { id: 123 };
      jest.spyOn(locateService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ locate });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: locate }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(locateService.update).toHaveBeenCalledWith(locate);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Locate>>();
      const locate = new Locate();
      jest.spyOn(locateService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ locate });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: locate }));
      saveSubject.complete();

      // THEN
      expect(locateService.create).toHaveBeenCalledWith(locate);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Locate>>();
      const locate = { id: 123 };
      jest.spyOn(locateService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ locate });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(locateService.update).toHaveBeenCalledWith(locate);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
