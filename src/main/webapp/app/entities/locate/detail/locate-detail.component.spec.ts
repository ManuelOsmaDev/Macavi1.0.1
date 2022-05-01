import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LocateDetailComponent } from './locate-detail.component';

describe('Locate Management Detail Component', () => {
  let comp: LocateDetailComponent;
  let fixture: ComponentFixture<LocateDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocateDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ locate: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(LocateDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(LocateDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load locate on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.locate).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
