package com.waveaccess.conference3.repository;

import com.waveaccess.conference3.domain.Visit;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data JPA repository for the Visit entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VisitRepository extends JpaRepository<Visit, Long> {

    @Query("select visit from Visit visit where visit.user.login = ?#{principal.username}")
    List<Visit> findByUserIsCurrentUser();

    @Modifying
    @Transactional
    @Query(value = "insert into visit values ( :maxID, true, (select id from jhi_user where login =:userLogin), :eventID)",nativeQuery = true)
    void createPresenterVisit(@Param("userLogin") String userLogin, @Param("eventID") Long eventID, @Param("maxID") Long maxID);

    Optional<Visit> findTopByOrderByIdDesc();
}
