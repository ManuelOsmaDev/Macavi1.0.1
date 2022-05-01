package com.macavi.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Rol.
 */
@Entity
@Table(name = "rol")
public class Rol implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(max = 20)
    @Column(name = "nombre_rol", length = 20, nullable = false, unique = true)
    private String nombreRol;

    @OneToMany(mappedBy = "rol")
    @JsonIgnoreProperties(value = { "rol", "usuarioRol" }, allowSetters = true)
    private Set<RolUsuario> rolUsuarios = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Rol id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreRol() {
        return this.nombreRol;
    }

    public Rol nombreRol(String nombreRol) {
        this.setNombreRol(nombreRol);
        return this;
    }

    public void setNombreRol(String nombreRol) {
        this.nombreRol = nombreRol;
    }

    public Set<RolUsuario> getRolUsuarios() {
        return this.rolUsuarios;
    }

    public void setRolUsuarios(Set<RolUsuario> rolUsuarios) {
        if (this.rolUsuarios != null) {
            this.rolUsuarios.forEach(i -> i.setRol(null));
        }
        if (rolUsuarios != null) {
            rolUsuarios.forEach(i -> i.setRol(this));
        }
        this.rolUsuarios = rolUsuarios;
    }

    public Rol rolUsuarios(Set<RolUsuario> rolUsuarios) {
        this.setRolUsuarios(rolUsuarios);
        return this;
    }

    public Rol addRolUsuario(RolUsuario rolUsuario) {
        this.rolUsuarios.add(rolUsuario);
        rolUsuario.setRol(this);
        return this;
    }

    public Rol removeRolUsuario(RolUsuario rolUsuario) {
        this.rolUsuarios.remove(rolUsuario);
        rolUsuario.setRol(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Rol)) {
            return false;
        }
        return id != null && id.equals(((Rol) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Rol{" +
            "id=" + getId() +
            ", nombreRol='" + getNombreRol() + "'" +
            "}";
    }
}
