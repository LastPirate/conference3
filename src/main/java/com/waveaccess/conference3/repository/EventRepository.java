package com.waveaccess.conference3.repository;

import com.waveaccess.conference3.domain.Event;
import com.waveaccess.conference3.domain.Room;
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

    @Query(value = "select * from event where id in (select event_id from visit where user_id =" +
        " (select id from jhi_user where login =:userLogin) and presenter_status=true)", nativeQuery = true)
    List<Event> getCurrentUserEvents(@Param("userLogin") String userLogin);

    List<Event> findEventsByRoom(Room room);
}
