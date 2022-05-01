package com.macavi.repository;

import com.macavi.domain.ProductoFactura;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ProductoFactura entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductoFacturaRepository extends JpaRepository<ProductoFactura, Long> {}
