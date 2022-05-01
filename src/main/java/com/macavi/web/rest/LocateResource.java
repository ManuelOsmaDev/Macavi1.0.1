package com.macavi.web.rest;

import com.macavi.domain.Locate;
import com.macavi.repository.LocateRepository;
import com.macavi.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.macavi.domain.Locate}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class LocateResource {

    private final Logger log = LoggerFactory.getLogger(LocateResource.class);

    private static final String ENTITY_NAME = "locate";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LocateRepository locateRepository;

    public LocateResource(LocateRepository locateRepository) {
        this.locateRepository = locateRepository;
    }

    /**
     * {@code POST  /locates} : Create a new locate.
     *
     * @param locate the locate to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new locate, or with status {@code 400 (Bad Request)} if the locate has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/locates")
    public ResponseEntity<Locate> createLocate(@Valid @RequestBody Locate locate) throws URISyntaxException {
        log.debug("REST request to save Locate : {}", locate);
        if (locate.getId() != null) {
            throw new BadRequestAlertException("A new locate cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Locate result = locateRepository.save(locate);
        return ResponseEntity
            .created(new URI("/api/locates/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /locates/:id} : Updates an existing locate.
     *
     * @param id the id of the locate to save.
     * @param locate the locate to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated locate,
     * or with status {@code 400 (Bad Request)} if the locate is not valid,
     * or with status {@code 500 (Internal Server Error)} if the locate couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/locates/{id}")
    public ResponseEntity<Locate> updateLocate(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Locate locate
    ) throws URISyntaxException {
        log.debug("REST request to update Locate : {}, {}", id, locate);
        if (locate.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, locate.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!locateRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Locate result = locateRepository.save(locate);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, locate.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /locates/:id} : Partial updates given fields of an existing locate, field will ignore if it is null
     *
     * @param id the id of the locate to save.
     * @param locate the locate to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated locate,
     * or with status {@code 400 (Bad Request)} if the locate is not valid,
     * or with status {@code 404 (Not Found)} if the locate is not found,
     * or with status {@code 500 (Internal Server Error)} if the locate couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/locates/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Locate> partialUpdateLocate(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Locate locate
    ) throws URISyntaxException {
        log.debug("REST request to partial update Locate partially : {}, {}", id, locate);
        if (locate.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, locate.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!locateRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Locate> result = locateRepository
            .findById(locate.getId())
            .map(existingLocate -> {
                if (locate.getCiudad() != null) {
                    existingLocate.setCiudad(locate.getCiudad());
                }
                if (locate.getDepartamento() != null) {
                    existingLocate.setDepartamento(locate.getDepartamento());
                }
                if (locate.getPais() != null) {
                    existingLocate.setPais(locate.getPais());
                }

                return existingLocate;
            })
            .map(locateRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, locate.getId().toString())
        );
    }

    /**
     * {@code GET  /locates} : get all the locates.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of locates in body.
     */
    @GetMapping("/locates")
    public List<Locate> getAllLocates() {
        log.debug("REST request to get all Locates");
        return locateRepository.findAll();
    }

    /**
     * {@code GET  /locates/:id} : get the "id" locate.
     *
     * @param id the id of the locate to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the locate, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/locates/{id}")
    public ResponseEntity<Locate> getLocate(@PathVariable Long id) {
        log.debug("REST request to get Locate : {}", id);
        Optional<Locate> locate = locateRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(locate);
    }

    /**
     * {@code DELETE  /locates/:id} : delete the "id" locate.
     *
     * @param id the id of the locate to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/locates/{id}")
    public ResponseEntity<Void> deleteLocate(@PathVariable Long id) {
        log.debug("REST request to delete Locate : {}", id);
        locateRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
