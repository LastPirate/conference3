package com.waveaccess.conference3.repository;

import com.waveaccess.conference3.domain.Presentation;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Presentation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PresentationRepository extends JpaRepository<Presentation, Long> {

}
