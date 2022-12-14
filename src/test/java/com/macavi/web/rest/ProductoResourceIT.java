package com.macavi.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.macavi.IntegrationTest;
import com.macavi.domain.Producto;
import com.macavi.repository.ProductoRepository;
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
 * Integration tests for the {@link ProductoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ProductoResourceIT {

    private static final Integer DEFAULT_CANTIDAD_PRODUCTO = 1;
    private static final Integer UPDATED_CANTIDAD_PRODUCTO = 2;

    private static final String DEFAULT_DESCRIPCION_PRODCUTO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION_PRODCUTO = "BBBBBBBBBB";

    private static final String DEFAULT_ESTILO = "AAAAAAAAAA";
    private static final String UPDATED_ESTILO = "BBBBBBBBBB";

    private static final String DEFAULT_GENERO = "AAAAAAAAAA";
    private static final String UPDATED_GENERO = "BBBBBBBBBB";

    private static final String DEFAULT_MARCA = "AAAAAAAAAA";
    private static final String UPDATED_MARCA = "BBBBBBBBBB";

    private static final Float DEFAULT_PORCENTAJE_IVA = 1F;
    private static final Float UPDATED_PORCENTAJE_IVA = 2F;

    private static final Integer DEFAULT_TALLA = 1;
    private static final Integer UPDATED_TALLA = 2;

    private static final String ENTITY_API_URL = "/api/productos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProductoMockMvc;

    private Producto producto;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Producto createEntity(EntityManager em) {
        Producto producto = new Producto()
            .cantidadProducto(DEFAULT_CANTIDAD_PRODUCTO)
            .descripcionProdcuto(DEFAULT_DESCRIPCION_PRODCUTO)
            .estilo(DEFAULT_ESTILO)
            .genero(DEFAULT_GENERO)
            .marca(DEFAULT_MARCA)
            .porcentajeIva(DEFAULT_PORCENTAJE_IVA)
            .talla(DEFAULT_TALLA);
        return producto;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Producto createUpdatedEntity(EntityManager em) {
        Producto producto = new Producto()
            .cantidadProducto(UPDATED_CANTIDAD_PRODUCTO)
            .descripcionProdcuto(UPDATED_DESCRIPCION_PRODCUTO)
            .estilo(UPDATED_ESTILO)
            .genero(UPDATED_GENERO)
            .marca(UPDATED_MARCA)
            .porcentajeIva(UPDATED_PORCENTAJE_IVA)
            .talla(UPDATED_TALLA);
        return producto;
    }

    @BeforeEach
    public void initTest() {
        producto = createEntity(em);
    }

    @Test
    @Transactional
    void createProducto() throws Exception {
        int databaseSizeBeforeCreate = productoRepository.findAll().size();
        // Create the Producto
        restProductoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(producto)))
            .andExpect(status().isCreated());

        // Validate the Producto in the database
        List<Producto> productoList = productoRepository.findAll();
        assertThat(productoList).hasSize(databaseSizeBeforeCreate + 1);
        Producto testProducto = productoList.get(productoList.size() - 1);
        assertThat(testProducto.getCantidadProducto()).isEqualTo(DEFAULT_CANTIDAD_PRODUCTO);
        assertThat(testProducto.getDescripcionProdcuto()).isEqualTo(DEFAULT_DESCRIPCION_PRODCUTO);
        assertThat(testProducto.getEstilo()).isEqualTo(DEFAULT_ESTILO);
        assertThat(testProducto.getGenero()).isEqualTo(DEFAULT_GENERO);
        assertThat(testProducto.getMarca()).isEqualTo(DEFAULT_MARCA);
        assertThat(testProducto.getPorcentajeIva()).isEqualTo(DEFAULT_PORCENTAJE_IVA);
        assertThat(testProducto.getTalla()).isEqualTo(DEFAULT_TALLA);
    }

    @Test
    @Transactional
    void createProductoWithExistingId() throws Exception {
        // Create the Producto with an existing ID
        producto.setId(1L);

        int databaseSizeBeforeCreate = productoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(producto)))
            .andExpect(status().isBadRequest());

        // Validate the Producto in the database
        List<Producto> productoList = productoRepository.findAll();
        assertThat(productoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkDescripcionProdcutoIsRequired() throws Exception {
        int databaseSizeBeforeTest = productoRepository.findAll().size();
        // set the field null
        producto.setDescripcionProdcuto(null);

        // Create the Producto, which fails.

        restProductoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(producto)))
            .andExpect(status().isBadRequest());

        List<Producto> productoList = productoRepository.findAll();
        assertThat(productoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkEstiloIsRequired() throws Exception {
        int databaseSizeBeforeTest = productoRepository.findAll().size();
        // set the field null
        producto.setEstilo(null);

        // Create the Producto, which fails.

        restProductoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(producto)))
            .andExpect(status().isBadRequest());

        List<Producto> productoList = productoRepository.findAll();
        assertThat(productoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkGeneroIsRequired() throws Exception {
        int databaseSizeBeforeTest = productoRepository.findAll().size();
        // set the field null
        producto.setGenero(null);

        // Create the Producto, which fails.

        restProductoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(producto)))
            .andExpect(status().isBadRequest());

        List<Producto> productoList = productoRepository.findAll();
        assertThat(productoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkMarcaIsRequired() throws Exception {
        int databaseSizeBeforeTest = productoRepository.findAll().size();
        // set the field null
        producto.setMarca(null);

        // Create the Producto, which fails.

        restProductoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(producto)))
            .andExpect(status().isBadRequest());

        List<Producto> productoList = productoRepository.findAll();
        assertThat(productoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllProductos() throws Exception {
        // Initialize the database
        productoRepository.saveAndFlush(producto);

        // Get all the productoList
        restProductoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(producto.getId().intValue())))
            .andExpect(jsonPath("$.[*].cantidadProducto").value(hasItem(DEFAULT_CANTIDAD_PRODUCTO)))
            .andExpect(jsonPath("$.[*].descripcionProdcuto").value(hasItem(DEFAULT_DESCRIPCION_PRODCUTO)))
            .andExpect(jsonPath("$.[*].estilo").value(hasItem(DEFAULT_ESTILO)))
            .andExpect(jsonPath("$.[*].genero").value(hasItem(DEFAULT_GENERO)))
            .andExpect(jsonPath("$.[*].marca").value(hasItem(DEFAULT_MARCA)))
            .andExpect(jsonPath("$.[*].porcentajeIva").value(hasItem(DEFAULT_PORCENTAJE_IVA.doubleValue())))
            .andExpect(jsonPath("$.[*].talla").value(hasItem(DEFAULT_TALLA)));
    }

    @Test
    @Transactional
    void getProducto() throws Exception {
        // Initialize the database
        productoRepository.saveAndFlush(producto);

        // Get the producto
        restProductoMockMvc
            .perform(get(ENTITY_API_URL_ID, producto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(producto.getId().intValue()))
            .andExpect(jsonPath("$.cantidadProducto").value(DEFAULT_CANTIDAD_PRODUCTO))
            .andExpect(jsonPath("$.descripcionProdcuto").value(DEFAULT_DESCRIPCION_PRODCUTO))
            .andExpect(jsonPath("$.estilo").value(DEFAULT_ESTILO))
            .andExpect(jsonPath("$.genero").value(DEFAULT_GENERO))
            .andExpect(jsonPath("$.marca").value(DEFAULT_MARCA))
            .andExpect(jsonPath("$.porcentajeIva").value(DEFAULT_PORCENTAJE_IVA.doubleValue()))
            .andExpect(jsonPath("$.talla").value(DEFAULT_TALLA));
    }

    @Test
    @Transactional
    void getNonExistingProducto() throws Exception {
        // Get the producto
        restProductoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewProducto() throws Exception {
        // Initialize the database
        productoRepository.saveAndFlush(producto);

        int databaseSizeBeforeUpdate = productoRepository.findAll().size();

        // Update the producto
        Producto updatedProducto = productoRepository.findById(producto.getId()).get();
        // Disconnect from session so that the updates on updatedProducto are not directly saved in db
        em.detach(updatedProducto);
        updatedProducto
            .cantidadProducto(UPDATED_CANTIDAD_PRODUCTO)
            .descripcionProdcuto(UPDATED_DESCRIPCION_PRODCUTO)
            .estilo(UPDATED_ESTILO)
            .genero(UPDATED_GENERO)
            .marca(UPDATED_MARCA)
            .porcentajeIva(UPDATED_PORCENTAJE_IVA)
            .talla(UPDATED_TALLA);

        restProductoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedProducto.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedProducto))
            )
            .andExpect(status().isOk());

        // Validate the Producto in the database
        List<Producto> productoList = productoRepository.findAll();
        assertThat(productoList).hasSize(databaseSizeBeforeUpdate);
        Producto testProducto = productoList.get(productoList.size() - 1);
        assertThat(testProducto.getCantidadProducto()).isEqualTo(UPDATED_CANTIDAD_PRODUCTO);
        assertThat(testProducto.getDescripcionProdcuto()).isEqualTo(UPDATED_DESCRIPCION_PRODCUTO);
        assertThat(testProducto.getEstilo()).isEqualTo(UPDATED_ESTILO);
        assertThat(testProducto.getGenero()).isEqualTo(UPDATED_GENERO);
        assertThat(testProducto.getMarca()).isEqualTo(UPDATED_MARCA);
        assertThat(testProducto.getPorcentajeIva()).isEqualTo(UPDATED_PORCENTAJE_IVA);
        assertThat(testProducto.getTalla()).isEqualTo(UPDATED_TALLA);
    }

    @Test
    @Transactional
    void putNonExistingProducto() throws Exception {
        int databaseSizeBeforeUpdate = productoRepository.findAll().size();
        producto.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProductoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, producto.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(producto))
            )
            .andExpect(status().isBadRequest());

        // Validate the Producto in the database
        List<Producto> productoList = productoRepository.findAll();
        assertThat(productoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchProducto() throws Exception {
        int databaseSizeBeforeUpdate = productoRepository.findAll().size();
        producto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProductoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(producto))
            )
            .andExpect(status().isBadRequest());

        // Validate the Producto in the database
        List<Producto> productoList = productoRepository.findAll();
        assertThat(productoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamProducto() throws Exception {
        int databaseSizeBeforeUpdate = productoRepository.findAll().size();
        producto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProductoMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(producto)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Producto in the database
        List<Producto> productoList = productoRepository.findAll();
        assertThat(productoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateProductoWithPatch() throws Exception {
        // Initialize the database
        productoRepository.saveAndFlush(producto);

        int databaseSizeBeforeUpdate = productoRepository.findAll().size();

        // Update the producto using partial update
        Producto partialUpdatedProducto = new Producto();
        partialUpdatedProducto.setId(producto.getId());

        partialUpdatedProducto
            .cantidadProducto(UPDATED_CANTIDAD_PRODUCTO)
            .descripcionProdcuto(UPDATED_DESCRIPCION_PRODCUTO)
            .marca(UPDATED_MARCA)
            .talla(UPDATED_TALLA);

        restProductoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedProducto.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedProducto))
            )
            .andExpect(status().isOk());

        // Validate the Producto in the database
        List<Producto> productoList = productoRepository.findAll();
        assertThat(productoList).hasSize(databaseSizeBeforeUpdate);
        Producto testProducto = productoList.get(productoList.size() - 1);
        assertThat(testProducto.getCantidadProducto()).isEqualTo(UPDATED_CANTIDAD_PRODUCTO);
        assertThat(testProducto.getDescripcionProdcuto()).isEqualTo(UPDATED_DESCRIPCION_PRODCUTO);
        assertThat(testProducto.getEstilo()).isEqualTo(DEFAULT_ESTILO);
        assertThat(testProducto.getGenero()).isEqualTo(DEFAULT_GENERO);
        assertThat(testProducto.getMarca()).isEqualTo(UPDATED_MARCA);
        assertThat(testProducto.getPorcentajeIva()).isEqualTo(DEFAULT_PORCENTAJE_IVA);
        assertThat(testProducto.getTalla()).isEqualTo(UPDATED_TALLA);
    }

    @Test
    @Transactional
    void fullUpdateProductoWithPatch() throws Exception {
        // Initialize the database
        productoRepository.saveAndFlush(producto);

        int databaseSizeBeforeUpdate = productoRepository.findAll().size();

        // Update the producto using partial update
        Producto partialUpdatedProducto = new Producto();
        partialUpdatedProducto.setId(producto.getId());

        partialUpdatedProducto
            .cantidadProducto(UPDATED_CANTIDAD_PRODUCTO)
            .descripcionProdcuto(UPDATED_DESCRIPCION_PRODCUTO)
            .estilo(UPDATED_ESTILO)
            .genero(UPDATED_GENERO)
            .marca(UPDATED_MARCA)
            .porcentajeIva(UPDATED_PORCENTAJE_IVA)
            .talla(UPDATED_TALLA);

        restProductoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedProducto.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedProducto))
            )
            .andExpect(status().isOk());

        // Validate the Producto in the database
        List<Producto> productoList = productoRepository.findAll();
        assertThat(productoList).hasSize(databaseSizeBeforeUpdate);
        Producto testProducto = productoList.get(productoList.size() - 1);
        assertThat(testProducto.getCantidadProducto()).isEqualTo(UPDATED_CANTIDAD_PRODUCTO);
        assertThat(testProducto.getDescripcionProdcuto()).isEqualTo(UPDATED_DESCRIPCION_PRODCUTO);
        assertThat(testProducto.getEstilo()).isEqualTo(UPDATED_ESTILO);
        assertThat(testProducto.getGenero()).isEqualTo(UPDATED_GENERO);
        assertThat(testProducto.getMarca()).isEqualTo(UPDATED_MARCA);
        assertThat(testProducto.getPorcentajeIva()).isEqualTo(UPDATED_PORCENTAJE_IVA);
        assertThat(testProducto.getTalla()).isEqualTo(UPDATED_TALLA);
    }

    @Test
    @Transactional
    void patchNonExistingProducto() throws Exception {
        int databaseSizeBeforeUpdate = productoRepository.findAll().size();
        producto.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProductoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, producto.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(producto))
            )
            .andExpect(status().isBadRequest());

        // Validate the Producto in the database
        List<Producto> productoList = productoRepository.findAll();
        assertThat(productoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchProducto() throws Exception {
        int databaseSizeBeforeUpdate = productoRepository.findAll().size();
        producto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProductoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(producto))
            )
            .andExpect(status().isBadRequest());

        // Validate the Producto in the database
        List<Producto> productoList = productoRepository.findAll();
        assertThat(productoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamProducto() throws Exception {
        int databaseSizeBeforeUpdate = productoRepository.findAll().size();
        producto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProductoMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(producto)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Producto in the database
        List<Producto> productoList = productoRepository.findAll();
        assertThat(productoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteProducto() throws Exception {
        // Initialize the database
        productoRepository.saveAndFlush(producto);

        int databaseSizeBeforeDelete = productoRepository.findAll().size();

        // Delete the producto
        restProductoMockMvc
            .perform(delete(ENTITY_API_URL_ID, producto.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Producto> productoList = productoRepository.findAll();
        assertThat(productoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
