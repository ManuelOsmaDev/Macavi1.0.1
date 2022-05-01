package com.macavi.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;

/**
 * A RolUsuario.
 */
@Entity
@Table(name = "rol_usuario")
public class RolUsuario implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties(value = { "rolUsuarios" }, allowSetters = true)
    private Rol rol;

    @ManyToOne
    @JsonIgnoreProperties(value = { "clientes", "facturas", "rolUsuarios", "tipodni" }, allowSetters = true)
    private Usuario usuarioRol;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public RolUsuario id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Rol getRol() {
        return this.rol;
    }

    public void setRol(Rol rol) {
        this.rol = rol;
    }

    public RolUsuario rol(Rol rol) {
        this.setRol(rol);
        return this;
    }

    public Usuario getUsuarioRol() {
        return this.usuarioRol;
    }

    public void setUsuarioRol(Usuario usuario) {
        this.usuarioRol = usuario;
    }

    public RolUsuario usuarioRol(Usuario usuario) {
        this.setUsuarioRol(usuario);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RolUsuario)) {
            return false;
        }
        return id != null && id.equals(((RolUsuario) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "RolUsuario{" +
            "id=" + getId() +
            "}";
    }
}
