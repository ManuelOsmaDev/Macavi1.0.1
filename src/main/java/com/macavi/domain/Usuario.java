package com.macavi.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Usuario.
 */
@Entity
@Table(name = "usuario")
public class Usuario implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(max = 100)
    @Column(name = "email", length = 100, nullable = false)
    private String email;

    @NotNull
    @Size(max = 100)
    @Column(name = "login_usuario", length = 100, nullable = false)
    private String loginUsuario;

    @NotNull
    @Size(max = 30)
    @Column(name = "nombre", length = 30, nullable = false)
    private String nombre;

    @NotNull
    @Size(max = 90)
    @Column(name = "tipo_dni", length = 90, nullable = false)
    private String tipoDni;

    @NotNull
    @Size(max = 100)
    @Column(name = "password", length = 100, nullable = false)
    private String password;

    @OneToMany(mappedBy = "usuario")
    @JsonIgnoreProperties(value = { "facturas", "locate", "usuario" }, allowSetters = true)
    private Set<Cliente> clientes = new HashSet<>();

    @OneToMany(mappedBy = "usuario")
    @JsonIgnoreProperties(value = { "cliente", "usuario", "prodctofactura" }, allowSetters = true)
    private Set<Factura> facturas = new HashSet<>();

    @OneToMany(mappedBy = "usuarioRol")
    @JsonIgnoreProperties(value = { "rol", "usuarioRol" }, allowSetters = true)
    private Set<RolUsuario> rolUsuarios = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "usuarios" }, allowSetters = true)
    private TipoDni tipodni;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Usuario id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return this.email;
    }

    public Usuario email(String email) {
        this.setEmail(email);
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLoginUsuario() {
        return this.loginUsuario;
    }

    public Usuario loginUsuario(String loginUsuario) {
        this.setLoginUsuario(loginUsuario);
        return this;
    }

    public void setLoginUsuario(String loginUsuario) {
        this.loginUsuario = loginUsuario;
    }

    public String getNombre() {
        return this.nombre;
    }

    public Usuario nombre(String nombre) {
        this.setNombre(nombre);
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getTipoDni() {
        return this.tipoDni;
    }

    public Usuario tipoDni(String tipoDni) {
        this.setTipoDni(tipoDni);
        return this;
    }

    public void setTipoDni(String tipoDni) {
        this.tipoDni = tipoDni;
    }

    public String getPassword() {
        return this.password;
    }

    public Usuario password(String password) {
        this.setPassword(password);
        return this;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Cliente> getClientes() {
        return this.clientes;
    }

    public void setClientes(Set<Cliente> clientes) {
        if (this.clientes != null) {
            this.clientes.forEach(i -> i.setUsuario(null));
        }
        if (clientes != null) {
            clientes.forEach(i -> i.setUsuario(this));
        }
        this.clientes = clientes;
    }

    public Usuario clientes(Set<Cliente> clientes) {
        this.setClientes(clientes);
        return this;
    }

    public Usuario addCliente(Cliente cliente) {
        this.clientes.add(cliente);
        cliente.setUsuario(this);
        return this;
    }

    public Usuario removeCliente(Cliente cliente) {
        this.clientes.remove(cliente);
        cliente.setUsuario(null);
        return this;
    }

    public Set<Factura> getFacturas() {
        return this.facturas;
    }

    public void setFacturas(Set<Factura> facturas) {
        if (this.facturas != null) {
            this.facturas.forEach(i -> i.setUsuario(null));
        }
        if (facturas != null) {
            facturas.forEach(i -> i.setUsuario(this));
        }
        this.facturas = facturas;
    }

    public Usuario facturas(Set<Factura> facturas) {
        this.setFacturas(facturas);
        return this;
    }

    public Usuario addFactura(Factura factura) {
        this.facturas.add(factura);
        factura.setUsuario(this);
        return this;
    }

    public Usuario removeFactura(Factura factura) {
        this.facturas.remove(factura);
        factura.setUsuario(null);
        return this;
    }

    public Set<RolUsuario> getRolUsuarios() {
        return this.rolUsuarios;
    }

    public void setRolUsuarios(Set<RolUsuario> rolUsuarios) {
        if (this.rolUsuarios != null) {
            this.rolUsuarios.forEach(i -> i.setUsuarioRol(null));
        }
        if (rolUsuarios != null) {
            rolUsuarios.forEach(i -> i.setUsuarioRol(this));
        }
        this.rolUsuarios = rolUsuarios;
    }

    public Usuario rolUsuarios(Set<RolUsuario> rolUsuarios) {
        this.setRolUsuarios(rolUsuarios);
        return this;
    }

    public Usuario addRolUsuario(RolUsuario rolUsuario) {
        this.rolUsuarios.add(rolUsuario);
        rolUsuario.setUsuarioRol(this);
        return this;
    }

    public Usuario removeRolUsuario(RolUsuario rolUsuario) {
        this.rolUsuarios.remove(rolUsuario);
        rolUsuario.setUsuarioRol(null);
        return this;
    }

    public TipoDni getTipodni() {
        return this.tipodni;
    }

    public void setTipodni(TipoDni tipoDni) {
        this.tipodni = tipoDni;
    }

    public Usuario tipodni(TipoDni tipoDni) {
        this.setTipodni(tipoDni);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Usuario)) {
            return false;
        }
        return id != null && id.equals(((Usuario) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Usuario{" +
            "id=" + getId() +
            ", email='" + getEmail() + "'" +
            ", loginUsuario='" + getLoginUsuario() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", tipoDni='" + getTipoDni() + "'" +
            ", password='" + getPassword() + "'" +
            "}";
    }
}
