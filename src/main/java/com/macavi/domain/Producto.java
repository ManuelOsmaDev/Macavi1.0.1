package com.macavi.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Producto.
 */
@Entity
@Table(name = "producto")
public class Producto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "cantidad_producto")
    private Integer cantidadProducto;

    @NotNull
    @Size(max = 100)
    @Column(name = "descripcion_prodcuto", length = 100, nullable = false)
    private String descripcionProdcuto;

    @NotNull
    @Size(max = 20)
    @Column(name = "estilo", length = 20, nullable = false)
    private String estilo;

    @NotNull
    @Size(max = 20)
    @Column(name = "genero", length = 20, nullable = false)
    private String genero;

    @NotNull
    @Size(max = 20)
    @Column(name = "marca", length = 20, nullable = false)
    private String marca;

    @Column(name = "porcentaje_iva")
    private Float porcentajeIva;

    @Column(name = "talla")
    private Integer talla;

    @OneToMany(mappedBy = "producto")
    @JsonIgnoreProperties(value = { "facturas", "producto" }, allowSetters = true)
    private Set<ProductoFactura> productoFacturas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Producto id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCantidadProducto() {
        return this.cantidadProducto;
    }

    public Producto cantidadProducto(Integer cantidadProducto) {
        this.setCantidadProducto(cantidadProducto);
        return this;
    }

    public void setCantidadProducto(Integer cantidadProducto) {
        this.cantidadProducto = cantidadProducto;
    }

    public String getDescripcionProdcuto() {
        return this.descripcionProdcuto;
    }

    public Producto descripcionProdcuto(String descripcionProdcuto) {
        this.setDescripcionProdcuto(descripcionProdcuto);
        return this;
    }

    public void setDescripcionProdcuto(String descripcionProdcuto) {
        this.descripcionProdcuto = descripcionProdcuto;
    }

    public String getEstilo() {
        return this.estilo;
    }

    public Producto estilo(String estilo) {
        this.setEstilo(estilo);
        return this;
    }

    public void setEstilo(String estilo) {
        this.estilo = estilo;
    }

    public String getGenero() {
        return this.genero;
    }

    public Producto genero(String genero) {
        this.setGenero(genero);
        return this;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public String getMarca() {
        return this.marca;
    }

    public Producto marca(String marca) {
        this.setMarca(marca);
        return this;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public Float getPorcentajeIva() {
        return this.porcentajeIva;
    }

    public Producto porcentajeIva(Float porcentajeIva) {
        this.setPorcentajeIva(porcentajeIva);
        return this;
    }

    public void setPorcentajeIva(Float porcentajeIva) {
        this.porcentajeIva = porcentajeIva;
    }

    public Integer getTalla() {
        return this.talla;
    }

    public Producto talla(Integer talla) {
        this.setTalla(talla);
        return this;
    }

    public void setTalla(Integer talla) {
        this.talla = talla;
    }

    public Set<ProductoFactura> getProductoFacturas() {
        return this.productoFacturas;
    }

    public void setProductoFacturas(Set<ProductoFactura> productoFacturas) {
        if (this.productoFacturas != null) {
            this.productoFacturas.forEach(i -> i.setProducto(null));
        }
        if (productoFacturas != null) {
            productoFacturas.forEach(i -> i.setProducto(this));
        }
        this.productoFacturas = productoFacturas;
    }

    public Producto productoFacturas(Set<ProductoFactura> productoFacturas) {
        this.setProductoFacturas(productoFacturas);
        return this;
    }

    public Producto addProductoFactura(ProductoFactura productoFactura) {
        this.productoFacturas.add(productoFactura);
        productoFactura.setProducto(this);
        return this;
    }

    public Producto removeProductoFactura(ProductoFactura productoFactura) {
        this.productoFacturas.remove(productoFactura);
        productoFactura.setProducto(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Producto)) {
            return false;
        }
        return id != null && id.equals(((Producto) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Producto{" +
            "id=" + getId() +
            ", cantidadProducto=" + getCantidadProducto() +
            ", descripcionProdcuto='" + getDescripcionProdcuto() + "'" +
            ", estilo='" + getEstilo() + "'" +
            ", genero='" + getGenero() + "'" +
            ", marca='" + getMarca() + "'" +
            ", porcentajeIva=" + getPorcentajeIva() +
            ", talla=" + getTalla() +
            "}";
    }
}
