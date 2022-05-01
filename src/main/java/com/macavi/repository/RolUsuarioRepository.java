package com.macavi.repository;

import com.macavi.domain.RolUsuario;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the RolUsuario entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RolUsuarioRepository extends JpaRepository<RolUsuario, Long> {}
