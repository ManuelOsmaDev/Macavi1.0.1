import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { TipoDniService } from '../service/tipo-dni.service';

import { TipoDniComponent } from './tipo-dni.component';

describe('TipoDni Management Component', () => {
  let comp: TipoDniComponent;
  let fixture: ComponentFixture<TipoDniComponent>;
  let service: TipoDniService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TipoDniComponent],
    })
      .overrideTemplate(TipoDniComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TipoDniComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(TipoDniService);

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
    expect(comp.tipoDnis?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
