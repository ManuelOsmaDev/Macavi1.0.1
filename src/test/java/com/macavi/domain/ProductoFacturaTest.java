package com.macavi.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.macavi.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ProductoFacturaTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProductoFactura.class);
        ProductoFactura productoFactura1 = new ProductoFactura();
        productoFactura1.setId(1L);
        ProductoFactura productoFactura2 = new ProductoFactura();
        productoFactura2.setId(productoFactura1.getId());
        assertThat(productoFactura1).isEqualTo(productoFactura2);
        productoFactura2.setId(2L);
        assertThat(productoFactura1).isNotEqualTo(productoFactura2);
        productoFactura1.setId(null);
        assertThat(productoFactura1).isNotEqualTo(productoFactura2);
    }
}
