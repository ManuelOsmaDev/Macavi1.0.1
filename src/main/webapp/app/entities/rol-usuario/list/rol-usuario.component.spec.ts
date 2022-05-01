import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { RolUsuarioService } from '../service/rol-usuario.service';

import { RolUsuarioComponent } from './rol-usuario.component';

describe('RolUsuario Management Component', () => {
  let comp: RolUsuarioComponent;
  let fixture: ComponentFixture<RolUsuarioComponent>;
  let service: RolUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RolUsuarioComponent],
    })
      .overrideTemplate(RolUsuarioComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RolUsuarioComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(RolUsuarioService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.rolUsuarios?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
