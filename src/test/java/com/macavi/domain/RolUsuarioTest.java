package com.macavi.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.macavi.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class RolUsuarioTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RolUsuario.class);
        RolUsuario rolUsuario1 = new RolUsuario();
        rolUsuario1.setId(1L);
        RolUsuario rolUsuario2 = new RolUsuario();
        rolUsuario2.setId(rolUsuario1.getId());
        assertThat(rolUsuario1).isEqualTo(rolUsuario2);
        rolUsuario2.setId(2L);
        assertThat(rolUsuario1).isNotEqualTo(rolUsuario2);
        rolUsuario1.setId(null);
        assertThat(rolUsuario1).isNotEqualTo(rolUsuario2);
    }
}
