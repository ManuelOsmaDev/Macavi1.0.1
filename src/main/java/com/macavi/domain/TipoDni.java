package com.macavi.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A TipoDni.
 */
@Entity
@Table(name = "tipo_dni")
public class TipoDni implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(max = 20)
    @Column(name = "nombre_dni", length = 20, nullable = false, unique = true)
    private String nombreDni;

    @OneToMany(mappedBy = "tipodni")
    @JsonIgnoreProperties(value = { "clientes", "facturas", "rolUsuarios", "tipodni" }, allowSetters = true)
    private Set<Usuario> usuarios = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public TipoDni id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreDni() {
        return this.nombreDni;
    }

    public TipoDni nombreDni(String nombreDni) {
        this.setNombreDni(nombreDni);
        return this;
    }

    public void setNombreDni(String nombreDni) {
        this.nombreDni = nombreDni;
    }

    public Set<Usuario> getUsuarios() {
        return this.usuarios;
    }

    public void setUsuarios(Set<Usuario> usuarios) {
        if (this.usuarios != null) {
            this.usuarios.forEach(i -> i.setTipodni(null));
        }
        if (usuarios != null) {
            usuarios.forEach(i -> i.setTipodni(this));
        }
        this.usuarios = usuarios;
    }

    public TipoDni usuarios(Set<Usuario> usuarios) {
        this.setUsuarios(usuarios);
        return this;
    }

    public TipoDni addUsuario(Usuario usuario) {
        this.usuarios.add(usuario);
        usuario.setTipodni(this);
        return this;
    }

    public TipoDni removeUsuario(Usuario usuario) {
        this.usuarios.remove(usuario);
        usuario.setTipodni(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TipoDni)) {
            return false;
        }
        return id != null && id.equals(((TipoDni) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TipoDni{" +
            "id=" + getId() +
            ", nombreDni='" + getNombreDni() + "'" +
            "}";
    }
}
