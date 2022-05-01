package com.macavi.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.ZonedDateTime;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Factura.
 */
@Entity
@Table(name = "factura")
public class Factura implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(max = 500)
    @Column(name = "descripcion", length = 500, nullable = false)
    private String descripcion;

    @NotNull
    @Column(name = "fecha_fact", nullable = false)
    private ZonedDateTime fechaFact;

    @NotNull
    @Column(name = "fecha_venc", nullable = false)
    private ZonedDateTime fechaVenc;

    @NotNull
    @Size(max = 10)
    @Column(name = "tipo_pago", length = 10, nullable = false)
    private String tipoPago;

    @Column(name = "total_factura")
    private Double totalFactura;

    @ManyToOne
    @JsonIgnoreProperties(value = { "facturas", "locate", "usuario" }, allowSetters = true)
    private Cliente cliente;

    @ManyToOne
    @JsonIgnoreProperties(value = { "clientes", "facturas", "rolUsuarios", "tipodni" }, allowSetters = true)
    private Usuario usuario;

    @ManyToOne
    @JsonIgnoreProperties(value = { "facturas", "producto" }, allowSetters = true)
    private ProductoFactura prodctofactura;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Factura id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public Factura descripcion(String descripcion) {
        this.setDescripcion(descripcion);
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public ZonedDateTime getFechaFact() {
        return this.fechaFact;
    }

    public Factura fechaFact(ZonedDateTime fechaFact) {
        this.setFechaFact(fechaFact);
        return this;
    }

    public void setFechaFact(ZonedDateTime fechaFact) {
        this.fechaFact = fechaFact;
    }

    public ZonedDateTime getFechaVenc() {
        return this.fechaVenc;
    }

    public Factura fechaVenc(ZonedDateTime fechaVenc) {
        this.setFechaVenc(fechaVenc);
        return this;
    }

    public void setFechaVenc(ZonedDateTime fechaVenc) {
        this.fechaVenc = fechaVenc;
    }

    public String getTipoPago() {
        return this.tipoPago;
    }

    public Factura tipoPago(String tipoPago) {
        this.setTipoPago(tipoPago);
        return this;
    }

    public void setTipoPago(String tipoPago) {
        this.tipoPago = tipoPago;
    }

    public Double getTotalFactura() {
        return this.totalFactura;
    }

    public Factura totalFactura(Double totalFactura) {
        this.setTotalFactura(totalFactura);
        return this;
    }

    public void setTotalFactura(Double totalFactura) {
        this.totalFactura = totalFactura;
    }

    public Cliente getCliente() {
        return this.cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Factura cliente(Cliente cliente) {
        this.setCliente(cliente);
        return this;
    }

    public Usuario getUsuario() {
        return this.usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Factura usuario(Usuario usuario) {
        this.setUsuario(usuario);
        return this;
    }

    public ProductoFactura getProdctofactura() {
        return this.prodctofactura;
    }

    public void setProdctofactura(ProductoFactura productoFactura) {
        this.prodctofactura = productoFactura;
    }

    public Factura prodctofactura(ProductoFactura productoFactura) {
        this.setProdctofactura(productoFactura);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Factura)) {
            return false;
        }
        return id != null && id.equals(((Factura) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Factura{" +
            "id=" + getId() +
            ", descripcion='" + getDescripcion() + "'" +
            ", fechaFact='" + getFechaFact() + "'" +
            ", fechaVenc='" + getFechaVenc() + "'" +
            ", tipoPago='" + getTipoPago() + "'" +
            ", totalFactura=" + getTotalFactura() +
            "}";
    }
}
