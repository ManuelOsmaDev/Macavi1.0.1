package com.macavi.web.rest;

import com.macavi.domain.TipoDni;
import com.macavi.repository.TipoDniRepository;
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
 * REST controller for managing {@link com.macavi.domain.TipoDni}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TipoDniResource {

    private final Logger log = LoggerFactory.getLogger(TipoDniResource.class);

    private static final String ENTITY_NAME = "tipoDni";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoDniRepository tipoDniRepository;

    public TipoDniResource(TipoDniRepository tipoDniRepository) {
        this.tipoDniRepository = tipoDniRepository;
    }

    /**
     * {@code POST  /tipo-dnis} : Create a new tipoDni.
     *
     * @param tipoDni the tipoDni to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoDni, or with status {@code 400 (Bad Request)} if the tipoDni has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tipo-dnis")
    public ResponseEntity<TipoDni> createTipoDni(@Valid @RequestBody TipoDni tipoDni) throws URISyntaxException {
        log.debug("REST request to save TipoDni : {}", tipoDni);
        if (tipoDni.getId() != null) {
            throw new BadRequestAlertException("A new tipoDni cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoDni result = tipoDniRepository.save(tipoDni);
        return ResponseEntity
            .created(new URI("/api/tipo-dnis/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipo-dnis/:id} : Updates an existing tipoDni.
     *
     * @param id the id of the tipoDni to save.
     * @param tipoDni the tipoDni to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoDni,
     * or with status {@code 400 (Bad Request)} if the tipoDni is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoDni couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tipo-dnis/{id}")
    public ResponseEntity<TipoDni> updateTipoDni(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody TipoDni tipoDni
    ) throws URISyntaxException {
        log.debug("REST request to update TipoDni : {}, {}", id, tipoDni);
        if (tipoDni.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tipoDni.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tipoDniRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        TipoDni result = tipoDniRepository.save(tipoDni);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tipoDni.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /tipo-dnis/:id} : Partial updates given fields of an existing tipoDni, field will ignore if it is null
     *
     * @param id the id of the tipoDni to save.
     * @param tipoDni the tipoDni to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoDni,
     * or with status {@code 400 (Bad Request)} if the tipoDni is not valid,
     * or with status {@code 404 (Not Found)} if the tipoDni is not found,
     * or with status {@code 500 (Internal Server Error)} if the tipoDni couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/tipo-dnis/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<TipoDni> partialUpdateTipoDni(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody TipoDni tipoDni
    ) throws URISyntaxException {
        log.debug("REST request to partial update TipoDni partially : {}, {}", id, tipoDni);
        if (tipoDni.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tipoDni.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tipoDniRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TipoDni> result = tipoDniRepository
            .findById(tipoDni.getId())
            .map(existingTipoDni -> {
                if (tipoDni.getNombreDni() != null) {
                    existingTipoDni.setNombreDni(tipoDni.getNombreDni());
                }

                return existingTipoDni;
            })
            .map(tipoDniRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tipoDni.getId().toString())
        );
    }

    /**
     * {@code GET  /tipo-dnis} : get all the tipoDnis.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoDnis in body.
     */
    @GetMapping("/tipo-dnis")
    public List<TipoDni> getAllTipoDnis() {
        log.debug("REST request to get all TipoDnis");
        return tipoDniRepository.findAll();
    }

    /**
     * {@code GET  /tipo-dnis/:id} : get the "id" tipoDni.
     *
     * @param id the id of the tipoDni to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoDni, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tipo-dnis/{id}")
    public ResponseEntity<TipoDni> getTipoDni(@PathVariable Long id) {
        log.debug("REST request to get TipoDni : {}", id);
        Optional<TipoDni> tipoDni = tipoDniRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tipoDni);
    }

    /**
     * {@code DELETE  /tipo-dnis/:id} : delete the "id" tipoDni.
     *
     * @param id the id of the tipoDni to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tipo-dnis/{id}")
    public ResponseEntity<Void> deleteTipoDni(@PathVariable Long id) {
        log.debug("REST request to delete TipoDni : {}", id);
        tipoDniRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
