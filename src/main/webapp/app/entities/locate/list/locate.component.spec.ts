import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { LocateService } from '../service/locate.service';

import { LocateComponent } from './locate.component';

describe('Locate Management Component', () => {
  let comp: LocateComponent;
  let fixture: ComponentFixture<LocateComponent>;
  let service: LocateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [LocateComponent],
    })
      .overrideTemplate(LocateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LocateComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(LocateService);

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
    expect(comp.locates?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
