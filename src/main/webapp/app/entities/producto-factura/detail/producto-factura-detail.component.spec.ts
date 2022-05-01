import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProductoFacturaDetailComponent } from './producto-factura-detail.component';

describe('ProductoFactura Management Detail Component', () => {
  let comp: ProductoFacturaDetailComponent;
  let fixture: ComponentFixture<ProductoFacturaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductoFacturaDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ productoFactura: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ProductoFacturaDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ProductoFacturaDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load productoFactura on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.productoFactura).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
