package com.waveaccess.conference3.repository;

import com.waveaccess.conference3.domain.Event;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


/**
 * Spring Data JPA repository for the Event entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    @Query(value = "select max(id) from visit", nativeQuery = true)
    Long getMaxVisitId();

    @Query(value = "select * from event where id in (select event_id from visit where user_id =" +
        " (select id from jhi_user where login =:userLogin) and presenter_status=true)", nativeQuery = true)
    List<Event> getCurrentUserEvents(@Param("userLogin") String userLogin);

    @Modifying
    @Transactional
    @Query(value = "insert into visit values ( :maxID, true, (select id from jhi_user where login =:userLogin), :eventID)",nativeQuery = true)
    void createPresenterVisit(@Param("userLogin") String userLogin,@Param("eventID") Long eventID, @Param("maxID") Long maxID);

}
