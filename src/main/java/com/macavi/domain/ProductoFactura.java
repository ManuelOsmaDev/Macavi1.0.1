package com.macavi.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * A ProductoFactura.
 */
@Entity
@Table(name = "producto_factura")
public class ProductoFactura implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @OneToMany(mappedBy = "prodctofactura")
    @JsonIgnoreProperties(value = { "cliente", "usuario", "prodctofactura" }, allowSetters = true)
    private Set<Factura> facturas = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "productoFacturas" }, allowSetters = true)
    private Producto producto;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ProductoFactura id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Factura> getFacturas() {
        return this.facturas;
    }

    public void setFacturas(Set<Factura> facturas) {
        if (this.facturas != null) {
            this.facturas.forEach(i -> i.setProdctofactura(null));
        }
        if (facturas != null) {
            facturas.forEach(i -> i.setProdctofactura(this));
        }
        this.facturas = facturas;
    }

    public ProductoFactura facturas(Set<Factura> facturas) {
        this.setFacturas(facturas);
        return this;
    }

    public ProductoFactura addFactura(Factura factura) {
        this.facturas.add(factura);
        factura.setProdctofactura(this);
        return this;
    }

    public ProductoFactura removeFactura(Factura factura) {
        this.facturas.remove(factura);
        factura.setProdctofactura(null);
        return this;
    }

    public Producto getProducto() {
        return this.producto;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }

    public ProductoFactura producto(Producto producto) {
        this.setProducto(producto);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProductoFactura)) {
            return false;
        }
        return id != null && id.equals(((ProductoFactura) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProductoFactura{" +
            "id=" + getId() +
            "}";
    }
}
