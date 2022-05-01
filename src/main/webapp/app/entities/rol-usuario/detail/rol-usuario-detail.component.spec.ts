import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RolUsuarioDetailComponent } from './rol-usuario-detail.component';

describe('RolUsuario Management Detail Component', () => {
  let comp: RolUsuarioDetailComponent;
  let fixture: ComponentFixture<RolUsuarioDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RolUsuarioDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ rolUsuario: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(RolUsuarioDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(RolUsuarioDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load rolUsuario on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.rolUsuario).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
