package com.macavi.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Cliente.
 */
@Entity
@Table(name = "cliente")
public class Cliente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(max = 60)
    @Column(name = "direcion", length = 60, nullable = false)
    private String direcion;

    @NotNull
    @Column(name = "telefono", nullable = false)
    private Integer telefono;

    @OneToMany(mappedBy = "cliente")
    @JsonIgnoreProperties(value = { "cliente", "usuario", "prodctofactura" }, allowSetters = true)
    private Set<Factura> facturas = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "clientes" }, allowSetters = true)
    private Locate locate;

    @ManyToOne
    @JsonIgnoreProperties(value = { "clientes", "facturas", "rolUsuarios", "tipodni" }, allowSetters = true)
    private Usuario usuario;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Cliente id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDirecion() {
        return this.direcion;
    }

    public Cliente direcion(String direcion) {
        this.setDirecion(direcion);
        return this;
    }

    public void setDirecion(String direcion) {
        this.direcion = direcion;
    }

    public Integer getTelefono() {
        return this.telefono;
    }

    public Cliente telefono(Integer telefono) {
        this.setTelefono(telefono);
        return this;
    }

    public void setTelefono(Integer telefono) {
        this.telefono = telefono;
    }

    public Set<Factura> getFacturas() {
        return this.facturas;
    }

    public void setFacturas(Set<Factura> facturas) {
        if (this.facturas != null) {
            this.facturas.forEach(i -> i.setCliente(null));
        }
        if (facturas != null) {
            facturas.forEach(i -> i.setCliente(this));
        }
        this.facturas = facturas;
    }

    public Cliente facturas(Set<Factura> facturas) {
        this.setFacturas(facturas);
        return this;
    }

    public Cliente addFactura(Factura factura) {
        this.facturas.add(factura);
        factura.setCliente(this);
        return this;
    }

    public Cliente removeFactura(Factura factura) {
        this.facturas.remove(factura);
        factura.setCliente(null);
        return this;
    }

    public Locate getLocate() {
        return this.locate;
    }

    public void setLocate(Locate locate) {
        this.locate = locate;
    }

    public Cliente locate(Locate locate) {
        this.setLocate(locate);
        return this;
    }

    public Usuario getUsuario() {
        return this.usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Cliente usuario(Usuario usuario) {
        this.setUsuario(usuario);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Cliente)) {
            return false;
        }
        return id != null && id.equals(((Cliente) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Cliente{" +
            "id=" + getId() +
            ", direcion='" + getDirecion() + "'" +
            ", telefono=" + getTelefono() +
            "}";
    }
}
