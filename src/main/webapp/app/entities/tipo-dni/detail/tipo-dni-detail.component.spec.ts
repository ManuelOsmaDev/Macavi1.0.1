import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TipoDniDetailComponent } from './tipo-dni-detail.component';

describe('TipoDni Management Detail Component', () => {
  let comp: TipoDniDetailComponent;
  let fixture: ComponentFixture<TipoDniDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoDniDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ tipoDni: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(TipoDniDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TipoDniDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load tipoDni on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.tipoDni).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
