import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { RolUsuarioService } from '../service/rol-usuario.service';
import { IRolUsuario, RolUsuario } from '../rol-usuario.model';
import { IRol } from 'app/entities/rol/rol.model';
import { RolService } from 'app/entities/rol/service/rol.service';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';

import { RolUsuarioUpdateComponent } from './rol-usuario-update.component';

describe('RolUsuario Management Update Component', () => {
  let comp: RolUsuarioUpdateComponent;
  let fixture: ComponentFixture<RolUsuarioUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let rolUsuarioService: RolUsuarioService;
  let rolService: RolService;
  let usuarioService: UsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [RolUsuarioUpdateComponent],
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
      .overrideTemplate(RolUsuarioUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RolUsuarioUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    rolUsuarioService = TestBed.inject(RolUsuarioService);
    rolService = TestBed.inject(RolService);
    usuarioService = TestBed.inject(UsuarioService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Rol query and add missing value', () => {
      const rolUsuario: IRolUsuario = { id: 456 };
      const rol: IRol = { id: 24904 };
      rolUsuario.rol = rol;

      const rolCollection: IRol[] = [{ id: 23128 }];
      jest.spyOn(rolService, 'query').mockReturnValue(of(new HttpResponse({ body: rolCollection })));
      const additionalRols = [rol];
      const expectedCollection: IRol[] = [...additionalRols, ...rolCollection];
      jest.spyOn(rolService, 'addRolToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ rolUsuario });
      comp.ngOnInit();

      expect(rolService.query).toHaveBeenCalled();
      expect(rolService.addRolToCollectionIfMissing).toHaveBeenCalledWith(rolCollection, ...additionalRols);
      expect(comp.rolsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Usuario query and add missing value', () => {
      const rolUsuario: IRolUsuario = { id: 456 };
      const usuarioRol: IUsuario = { id: 79665 };
      rolUsuario.usuarioRol = usuarioRol;

      const usuarioCollection: IUsuario[] = [{ id: 95365 }];
      jest.spyOn(usuarioService, 'query').mockReturnValue(of(new HttpResponse({ body: usuarioCollection })));
      const additionalUsuarios = [usuarioRol];
      const expectedCollection: IUsuario[] = [...additionalUsuarios, ...usuarioCollection];
      jest.spyOn(usuarioService, 'addUsuarioToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ rolUsuario });
      comp.ngOnInit();

      expect(usuarioService.query).toHaveBeenCalled();
      expect(usuarioService.addUsuarioToCollectionIfMissing).toHaveBeenCalledWith(usuarioCollection, ...additionalUsuarios);
      expect(comp.usuariosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const rolUsuario: IRolUsuario = { id: 456 };
      const rol: IRol = { id: 51456 };
      rolUsuario.rol = rol;
      const usuarioRol: IUsuario = { id: 35029 };
      rolUsuario.usuarioRol = usuarioRol;

      activatedRoute.data = of({ rolUsuario });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(rolUsuario));
      expect(comp.rolsSharedCollection).toContain(rol);
      expect(comp.usuariosSharedCollection).toContain(usuarioRol);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<RolUsuario>>();
      const rolUsuario = { id: 123 };
      jest.spyOn(rolUsuarioService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ rolUsuario });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: rolUsuario }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(rolUsuarioService.update).toHaveBeenCalledWith(rolUsuario);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<RolUsuario>>();
      const rolUsuario = new RolUsuario();
      jest.spyOn(rolUsuarioService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ rolUsuario });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: rolUsuario }));
      saveSubject.complete();

      // THEN
      expect(rolUsuarioService.create).toHaveBeenCalledWith(rolUsuario);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<RolUsuario>>();
      const rolUsuario = { id: 123 };
      jest.spyOn(rolUsuarioService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ rolUsuario });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(rolUsuarioService.update).toHaveBeenCalledWith(rolUsuario);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackRolById', () => {
      it('Should return tracked Rol primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackRolById(0, entity);
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
  });
});
