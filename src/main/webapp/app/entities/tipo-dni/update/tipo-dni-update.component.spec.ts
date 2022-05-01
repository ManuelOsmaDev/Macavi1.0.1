import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TipoDniService } from '../service/tipo-dni.service';
import { ITipoDni, TipoDni } from '../tipo-dni.model';

import { TipoDniUpdateComponent } from './tipo-dni-update.component';

describe('TipoDni Management Update Component', () => {
  let comp: TipoDniUpdateComponent;
  let fixture: ComponentFixture<TipoDniUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let tipoDniService: TipoDniService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TipoDniUpdateComponent],
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
      .overrideTemplate(TipoDniUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TipoDniUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    tipoDniService = TestBed.inject(TipoDniService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const tipoDni: ITipoDni = { id: 456 };

      activatedRoute.data = of({ tipoDni });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(tipoDni));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<TipoDni>>();
      const tipoDni = { id: 123 };
      jest.spyOn(tipoDniService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoDni });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tipoDni }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(tipoDniService.update).toHaveBeenCalledWith(tipoDni);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<TipoDni>>();
      const tipoDni = new TipoDni();
      jest.spyOn(tipoDniService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoDni });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tipoDni }));
      saveSubject.complete();

      // THEN
      expect(tipoDniService.create).toHaveBeenCalledWith(tipoDni);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<TipoDni>>();
      const tipoDni = { id: 123 };
      jest.spyOn(tipoDniService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoDni });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(tipoDniService.update).toHaveBeenCalledWith(tipoDni);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
