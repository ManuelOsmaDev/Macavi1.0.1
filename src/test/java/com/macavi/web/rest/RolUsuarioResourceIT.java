package com.macavi.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.macavi.IntegrationTest;
import com.macavi.domain.RolUsuario;
import com.macavi.repository.RolUsuarioRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link RolUsuarioResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class RolUsuarioResourceIT {

    private static final String ENTITY_API_URL = "/api/rol-usuarios";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private RolUsuarioRepository rolUsuarioRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRolUsuarioMockMvc;

    private RolUsuario rolUsuario;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RolUsuario createEntity(EntityManager em) {
        RolUsuario rolUsuario = new RolUsuario();
        return rolUsuario;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RolUsuario createUpdatedEntity(EntityManager em) {
        RolUsuario rolUsuario = new RolUsuario();
        return rolUsuario;
    }

    @BeforeEach
    public void initTest() {
        rolUsuario = createEntity(em);
    }

    @Test
    @Transactional
    void createRolUsuario() throws Exception {
        int databaseSizeBeforeCreate = rolUsuarioRepository.findAll().size();
        // Create the RolUsuario
        restRolUsuarioMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(rolUsuario)))
            .andExpect(status().isCreated());

        // Validate the RolUsuario in the database
        List<RolUsuario> rolUsuarioList = rolUsuarioRepository.findAll();
        assertThat(rolUsuarioList).hasSize(databaseSizeBeforeCreate + 1);
        RolUsuario testRolUsuario = rolUsuarioList.get(rolUsuarioList.size() - 1);
    }

    @Test
    @Transactional
    void createRolUsuarioWithExistingId() throws Exception {
        // Create the RolUsuario with an existing ID
        rolUsuario.setId(1L);

        int databaseSizeBeforeCreate = rolUsuarioRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restRolUsuarioMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(rolUsuario)))
            .andExpect(status().isBadRequest());

        // Validate the RolUsuario in the database
        List<RolUsuario> rolUsuarioList = rolUsuarioRepository.findAll();
        assertThat(rolUsuarioList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllRolUsuarios() throws Exception {
        // Initialize the database
        rolUsuarioRepository.saveAndFlush(rolUsuario);

        // Get all the rolUsuarioList
        restRolUsuarioMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rolUsuario.getId().intValue())));
    }

    @Test
    @Transactional
    void getRolUsuario() throws Exception {
        // Initialize the database
        rolUsuarioRepository.saveAndFlush(rolUsuario);

        // Get the rolUsuario
        restRolUsuarioMockMvc
            .perform(get(ENTITY_API_URL_ID, rolUsuario.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(rolUsuario.getId().intValue()));
    }

    @Test
    @Transactional
    void getNonExistingRolUsuario() throws Exception {
        // Get the rolUsuario
        restRolUsuarioMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewRolUsuario() throws Exception {
        // Initialize the database
        rolUsuarioRepository.saveAndFlush(rolUsuario);

        int databaseSizeBeforeUpdate = rolUsuarioRepository.findAll().size();

        // Update the rolUsuario
        RolUsuario updatedRolUsuario = rolUsuarioRepository.findById(rolUsuario.getId()).get();
        // Disconnect from session so that the updates on updatedRolUsuario are not directly saved in db
        em.detach(updatedRolUsuario);

        restRolUsuarioMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedRolUsuario.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedRolUsuario))
            )
            .andExpect(status().isOk());

        // Validate the RolUsuario in the database
        List<RolUsuario> rolUsuarioList = rolUsuarioRepository.findAll();
        assertThat(rolUsuarioList).hasSize(databaseSizeBeforeUpdate);
        RolUsuario testRolUsuario = rolUsuarioList.get(rolUsuarioList.size() - 1);
    }

    @Test
    @Transactional
    void putNonExistingRolUsuario() throws Exception {
        int databaseSizeBeforeUpdate = rolUsuarioRepository.findAll().size();
        rolUsuario.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRolUsuarioMockMvc
            .perform(
                put(ENTITY_API_URL_ID, rolUsuario.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(rolUsuario))
            )
            .andExpect(status().isBadRequest());

        // Validate the RolUsuario in the database
        List<RolUsuario> rolUsuarioList = rolUsuarioRepository.findAll();
        assertThat(rolUsuarioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchRolUsuario() throws Exception {
        int databaseSizeBeforeUpdate = rolUsuarioRepository.findAll().size();
        rolUsuario.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRolUsuarioMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(rolUsuario))
            )
            .andExpect(status().isBadRequest());

        // Validate the RolUsuario in the database
        List<RolUsuario> rolUsuarioList = rolUsuarioRepository.findAll();
        assertThat(rolUsuarioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamRolUsuario() throws Exception {
        int databaseSizeBeforeUpdate = rolUsuarioRepository.findAll().size();
        rolUsuario.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRolUsuarioMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(rolUsuario)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the RolUsuario in the database
        List<RolUsuario> rolUsuarioList = rolUsuarioRepository.findAll();
        assertThat(rolUsuarioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateRolUsuarioWithPatch() throws Exception {
        // Initialize the database
        rolUsuarioRepository.saveAndFlush(rolUsuario);

        int databaseSizeBeforeUpdate = rolUsuarioRepository.findAll().size();

        // Update the rolUsuario using partial update
        RolUsuario partialUpdatedRolUsuario = new RolUsuario();
        partialUpdatedRolUsuario.setId(rolUsuario.getId());

        restRolUsuarioMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedRolUsuario.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedRolUsuario))
            )
            .andExpect(status().isOk());

        // Validate the RolUsuario in the database
        List<RolUsuario> rolUsuarioList = rolUsuarioRepository.findAll();
        assertThat(rolUsuarioList).hasSize(databaseSizeBeforeUpdate);
        RolUsuario testRolUsuario = rolUsuarioList.get(rolUsuarioList.size() - 1);
    }

    @Test
    @Transactional
    void fullUpdateRolUsuarioWithPatch() throws Exception {
        // Initialize the database
        rolUsuarioRepository.saveAndFlush(rolUsuario);

        int databaseSizeBeforeUpdate = rolUsuarioRepository.findAll().size();

        // Update the rolUsuario using partial update
        RolUsuario partialUpdatedRolUsuario = new RolUsuario();
        partialUpdatedRolUsuario.setId(rolUsuario.getId());

        restRolUsuarioMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedRolUsuario.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedRolUsuario))
            )
            .andExpect(status().isOk());

        // Validate the RolUsuario in the database
        List<RolUsuario> rolUsuarioList = rolUsuarioRepository.findAll();
        assertThat(rolUsuarioList).hasSize(databaseSizeBeforeUpdate);
        RolUsuario testRolUsuario = rolUsuarioList.get(rolUsuarioList.size() - 1);
    }

    @Test
    @Transactional
    void patchNonExistingRolUsuario() throws Exception {
        int databaseSizeBeforeUpdate = rolUsuarioRepository.findAll().size();
        rolUsuario.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRolUsuarioMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, rolUsuario.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(rolUsuario))
            )
            .andExpect(status().isBadRequest());

        // Validate the RolUsuario in the database
        List<RolUsuario> rolUsuarioList = rolUsuarioRepository.findAll();
        assertThat(rolUsuarioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchRolUsuario() throws Exception {
        int databaseSizeBeforeUpdate = rolUsuarioRepository.findAll().size();
        rolUsuario.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRolUsuarioMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(rolUsuario))
            )
            .andExpect(status().isBadRequest());

        // Validate the RolUsuario in the database
        List<RolUsuario> rolUsuarioList = rolUsuarioRepository.findAll();
        assertThat(rolUsuarioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamRolUsuario() throws Exception {
        int databaseSizeBeforeUpdate = rolUsuarioRepository.findAll().size();
        rolUsuario.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRolUsuarioMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(rolUsuario))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the RolUsuario in the database
        List<RolUsuario> rolUsuarioList = rolUsuarioRepository.findAll();
        assertThat(rolUsuarioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteRolUsuario() throws Exception {
        // Initialize the database
        rolUsuarioRepository.saveAndFlush(rolUsuario);

        int databaseSizeBeforeDelete = rolUsuarioRepository.findAll().size();

        // Delete the rolUsuario
        restRolUsuarioMockMvc
            .perform(delete(ENTITY_API_URL_ID, rolUsuario.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RolUsuario> rolUsuarioList = rolUsuarioRepository.findAll();
        assertThat(rolUsuarioList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
