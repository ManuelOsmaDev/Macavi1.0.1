package com.macavi.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.macavi.IntegrationTest;
import com.macavi.domain.ProductoFactura;
import com.macavi.repository.ProductoFacturaRepository;
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
 * Integration tests for the {@link ProductoFacturaResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ProductoFacturaResourceIT {

    private static final String ENTITY_API_URL = "/api/producto-facturas";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ProductoFacturaRepository productoFacturaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProductoFacturaMockMvc;

    private ProductoFactura productoFactura;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProductoFactura createEntity(EntityManager em) {
        ProductoFactura productoFactura = new ProductoFactura();
        return productoFactura;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProductoFactura createUpdatedEntity(EntityManager em) {
        ProductoFactura productoFactura = new ProductoFactura();
        return productoFactura;
    }

    @BeforeEach
    public void initTest() {
        productoFactura = createEntity(em);
    }

    @Test
    @Transactional
    void createProductoFactura() throws Exception {
        int databaseSizeBeforeCreate = productoFacturaRepository.findAll().size();
        // Create the ProductoFactura
        restProductoFacturaMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(productoFactura))
            )
            .andExpect(status().isCreated());

        // Validate the ProductoFactura in the database
        List<ProductoFactura> productoFacturaList = productoFacturaRepository.findAll();
        assertThat(productoFacturaList).hasSize(databaseSizeBeforeCreate + 1);
        ProductoFactura testProductoFactura = productoFacturaList.get(productoFacturaList.size() - 1);
    }

    @Test
    @Transactional
    void createProductoFacturaWithExistingId() throws Exception {
        // Create the ProductoFactura with an existing ID
        productoFactura.setId(1L);

        int databaseSizeBeforeCreate = productoFacturaRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductoFacturaMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(productoFactura))
            )
            .andExpect(status().isBadRequest());

        // Validate the ProductoFactura in the database
        List<ProductoFactura> productoFacturaList = productoFacturaRepository.findAll();
        assertThat(productoFacturaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllProductoFacturas() throws Exception {
        // Initialize the database
        productoFacturaRepository.saveAndFlush(productoFactura);

        // Get all the productoFacturaList
        restProductoFacturaMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productoFactura.getId().intValue())));
    }

    @Test
    @Transactional
    void getProductoFactura() throws Exception {
        // Initialize the database
        productoFacturaRepository.saveAndFlush(productoFactura);

        // Get the productoFactura
        restProductoFacturaMockMvc
            .perform(get(ENTITY_API_URL_ID, productoFactura.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(productoFactura.getId().intValue()));
    }

    @Test
    @Transactional
    void getNonExistingProductoFactura() throws Exception {
        // Get the productoFactura
        restProductoFacturaMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewProductoFactura() throws Exception {
        // Initialize the database
        productoFacturaRepository.saveAndFlush(productoFactura);

        int databaseSizeBeforeUpdate = productoFacturaRepository.findAll().size();

        // Update the productoFactura
        ProductoFactura updatedProductoFactura = productoFacturaRepository.findById(productoFactura.getId()).get();
        // Disconnect from session so that the updates on updatedProductoFactura are not directly saved in db
        em.detach(updatedProductoFactura);

        restProductoFacturaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedProductoFactura.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedProductoFactura))
            )
            .andExpect(status().isOk());

        // Validate the ProductoFactura in the database
        List<ProductoFactura> productoFacturaList = productoFacturaRepository.findAll();
        assertThat(productoFacturaList).hasSize(databaseSizeBeforeUpdate);
        ProductoFactura testProductoFactura = productoFacturaList.get(productoFacturaList.size() - 1);
    }

    @Test
    @Transactional
    void putNonExistingProductoFactura() throws Exception {
        int databaseSizeBeforeUpdate = productoFacturaRepository.findAll().size();
        productoFactura.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProductoFacturaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, productoFactura.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(productoFactura))
            )
            .andExpect(status().isBadRequest());

        // Validate the ProductoFactura in the database
        List<ProductoFactura> productoFacturaList = productoFacturaRepository.findAll();
        assertThat(productoFacturaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchProductoFactura() throws Exception {
        int databaseSizeBeforeUpdate = productoFacturaRepository.findAll().size();
        productoFactura.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProductoFacturaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(productoFactura))
            )
            .andExpect(status().isBadRequest());

        // Validate the ProductoFactura in the database
        List<ProductoFactura> productoFacturaList = productoFacturaRepository.findAll();
        assertThat(productoFacturaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamProductoFactura() throws Exception {
        int databaseSizeBeforeUpdate = productoFacturaRepository.findAll().size();
        productoFactura.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProductoFacturaMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(productoFactura))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ProductoFactura in the database
        List<ProductoFactura> productoFacturaList = productoFacturaRepository.findAll();
        assertThat(productoFacturaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateProductoFacturaWithPatch() throws Exception {
        // Initialize the database
        productoFacturaRepository.saveAndFlush(productoFactura);

        int databaseSizeBeforeUpdate = productoFacturaRepository.findAll().size();

        // Update the productoFactura using partial update
        ProductoFactura partialUpdatedProductoFactura = new ProductoFactura();
        partialUpdatedProductoFactura.setId(productoFactura.getId());

        restProductoFacturaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedProductoFactura.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedProductoFactura))
            )
            .andExpect(status().isOk());

        // Validate the ProductoFactura in the database
        List<ProductoFactura> productoFacturaList = productoFacturaRepository.findAll();
        assertThat(productoFacturaList).hasSize(databaseSizeBeforeUpdate);
        ProductoFactura testProductoFactura = productoFacturaList.get(productoFacturaList.size() - 1);
    }

    @Test
    @Transactional
    void fullUpdateProductoFacturaWithPatch() throws Exception {
        // Initialize the database
        productoFacturaRepository.saveAndFlush(productoFactura);

        int databaseSizeBeforeUpdate = productoFacturaRepository.findAll().size();

        // Update the productoFactura using partial update
        ProductoFactura partialUpdatedProductoFactura = new ProductoFactura();
        partialUpdatedProductoFactura.setId(productoFactura.getId());

        restProductoFacturaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedProductoFactura.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedProductoFactura))
            )
            .andExpect(status().isOk());

        // Validate the ProductoFactura in the database
        List<ProductoFactura> productoFacturaList = productoFacturaRepository.findAll();
        assertThat(productoFacturaList).hasSize(databaseSizeBeforeUpdate);
        ProductoFactura testProductoFactura = productoFacturaList.get(productoFacturaList.size() - 1);
    }

    @Test
    @Transactional
    void patchNonExistingProductoFactura() throws Exception {
        int databaseSizeBeforeUpdate = productoFacturaRepository.findAll().size();
        productoFactura.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProductoFacturaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, productoFactura.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(productoFactura))
            )
            .andExpect(status().isBadRequest());

        // Validate the ProductoFactura in the database
        List<ProductoFactura> productoFacturaList = productoFacturaRepository.findAll();
        assertThat(productoFacturaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchProductoFactura() throws Exception {
        int databaseSizeBeforeUpdate = productoFacturaRepository.findAll().size();
        productoFactura.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProductoFacturaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(productoFactura))
            )
            .andExpect(status().isBadRequest());

        // Validate the ProductoFactura in the database
        List<ProductoFactura> productoFacturaList = productoFacturaRepository.findAll();
        assertThat(productoFacturaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamProductoFactura() throws Exception {
        int databaseSizeBeforeUpdate = productoFacturaRepository.findAll().size();
        productoFactura.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProductoFacturaMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(productoFactura))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ProductoFactura in the database
        List<ProductoFactura> productoFacturaList = productoFacturaRepository.findAll();
        assertThat(productoFacturaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteProductoFactura() throws Exception {
        // Initialize the database
        productoFacturaRepository.saveAndFlush(productoFactura);

        int databaseSizeBeforeDelete = productoFacturaRepository.findAll().size();

        // Delete the productoFactura
        restProductoFacturaMockMvc
            .perform(delete(ENTITY_API_URL_ID, productoFactura.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProductoFactura> productoFacturaList = productoFacturaRepository.findAll();
        assertThat(productoFacturaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
