import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ProductoFacturaService } from '../service/producto-factura.service';

import { ProductoFacturaComponent } from './producto-factura.component';

describe('ProductoFactura Management Component', () => {
  let comp: ProductoFacturaComponent;
  let fixture: ComponentFixture<ProductoFacturaComponent>;
  let service: ProductoFacturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ProductoFacturaComponent],
    })
      .overrideTemplate(ProductoFacturaComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProductoFacturaComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ProductoFacturaService);

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
    expect(comp.productoFacturas?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
