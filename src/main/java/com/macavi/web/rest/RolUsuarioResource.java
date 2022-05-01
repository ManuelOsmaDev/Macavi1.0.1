package com.macavi.web.rest;

import com.macavi.domain.RolUsuario;
import com.macavi.repository.RolUsuarioRepository;
import com.macavi.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.macavi.domain.RolUsuario}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class RolUsuarioResource {

    private final Logger log = LoggerFactory.getLogger(RolUsuarioResource.class);

    private static final String ENTITY_NAME = "rolUsuario";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RolUsuarioRepository rolUsuarioRepository;

    public RolUsuarioResource(RolUsuarioRepository rolUsuarioRepository) {
        this.rolUsuarioRepository = rolUsuarioRepository;
    }

    /**
     * {@code POST  /rol-usuarios} : Create a new rolUsuario.
     *
     * @param rolUsuario the rolUsuario to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new rolUsuario, or with status {@code 400 (Bad Request)} if the rolUsuario has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/rol-usuarios")
    public ResponseEntity<RolUsuario> createRolUsuario(@RequestBody RolUsuario rolUsuario) throws URISyntaxException {
        log.debug("REST request to save RolUsuario : {}", rolUsuario);
        if (rolUsuario.getId() != null) {
            throw new BadRequestAlertException("A new rolUsuario cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RolUsuario result = rolUsuarioRepository.save(rolUsuario);
        return ResponseEntity
            .created(new URI("/api/rol-usuarios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /rol-usuarios/:id} : Updates an existing rolUsuario.
     *
     * @param id the id of the rolUsuario to save.
     * @param rolUsuario the rolUsuario to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated rolUsuario,
     * or with status {@code 400 (Bad Request)} if the rolUsuario is not valid,
     * or with status {@code 500 (Internal Server Error)} if the rolUsuario couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/rol-usuarios/{id}")
    public ResponseEntity<RolUsuario> updateRolUsuario(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody RolUsuario rolUsuario
    ) throws URISyntaxException {
        log.debug("REST request to update RolUsuario : {}, {}", id, rolUsuario);
        if (rolUsuario.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, rolUsuario.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!rolUsuarioRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        RolUsuario result = rolUsuarioRepository.save(rolUsuario);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, rolUsuario.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /rol-usuarios/:id} : Partial updates given fields of an existing rolUsuario, field will ignore if it is null
     *
     * @param id the id of the rolUsuario to save.
     * @param rolUsuario the rolUsuario to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated rolUsuario,
     * or with status {@code 400 (Bad Request)} if the rolUsuario is not valid,
     * or with status {@code 404 (Not Found)} if the rolUsuario is not found,
     * or with status {@code 500 (Internal Server Error)} if the rolUsuario couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/rol-usuarios/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<RolUsuario> partialUpdateRolUsuario(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody RolUsuario rolUsuario
    ) throws URISyntaxException {
        log.debug("REST request to partial update RolUsuario partially : {}, {}", id, rolUsuario);
        if (rolUsuario.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, rolUsuario.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!rolUsuarioRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<RolUsuario> result = rolUsuarioRepository
            .findById(rolUsuario.getId())
            .map(existingRolUsuario -> {
                return existingRolUsuario;
            })
            .map(rolUsuarioRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, rolUsuario.getId().toString())
        );
    }

    /**
     * {@code GET  /rol-usuarios} : get all the rolUsuarios.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of rolUsuarios in body.
     */
    @GetMapping("/rol-usuarios")
    public List<RolUsuario> getAllRolUsuarios() {
        log.debug("REST request to get all RolUsuarios");
        return rolUsuarioRepository.findAll();
    }

    /**
     * {@code GET  /rol-usuarios/:id} : get the "id" rolUsuario.
     *
     * @param id the id of the rolUsuario to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the rolUsuario, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/rol-usuarios/{id}")
    public ResponseEntity<RolUsuario> getRolUsuario(@PathVariable Long id) {
        log.debug("REST request to get RolUsuario : {}", id);
        Optional<RolUsuario> rolUsuario = rolUsuarioRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(rolUsuario);
    }

    /**
     * {@code DELETE  /rol-usuarios/:id} : delete the "id" rolUsuario.
     *
     * @param id the id of the rolUsuario to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/rol-usuarios/{id}")
    public ResponseEntity<Void> deleteRolUsuario(@PathVariable Long id) {
        log.debug("REST request to delete RolUsuario : {}", id);
        rolUsuarioRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
