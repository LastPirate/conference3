package com.waveaccess.conference3.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.waveaccess.conference3.domain.Event;

import com.waveaccess.conference3.repository.EventRepository;
import com.waveaccess.conference3.security.SecurityUtils;
import com.waveaccess.conference3.web.rest.errors.BadRequestAlertException;
import com.waveaccess.conference3.web.rest.util.HeaderUtil;
import com.waveaccess.conference3.web.rest.util.PaginationUtil;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.sql.Timestamp;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.TimeZone;

/**
 * REST controller for managing Event.
 */
@RestController
@RequestMapping("/api")
public class EventResource {

    private final Logger log = LoggerFactory.getLogger(EventResource.class);

    private static final String ENTITY_NAME = "event";

    private final EventRepository eventRepository;

    public EventResource(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    /**
     * POST  /events : Create a new event.
     *
     * @param event the event to create
     * @return the ResponseEntity with status 201 (Created) and with body the new event, or with status 400 (Bad Request) if the event has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */

    private ZonedDateTime currentStart, currentStop, pastStart, pastStop;
    private boolean isCorrect;

    @PostMapping("/events")
    @Timed
    public ResponseEntity<Event> createEvent(@Valid @RequestBody Event event) throws URISyntaxException {
        log.debug("REST request to save Event : {}", event);

        currentStart = event.getStart().withZoneSameInstant(ZoneId.of("Z"));
        currentStop = event.getEnd().withZoneSameInstant(ZoneId.of("Z"));

        if (event.getId() != null) throw new BadRequestAlertException("A new event cannot already have an ID", ENTITY_NAME, "idexists");
        if (currentStart.isAfter(currentStop)) throw new BadRequestAlertException("The start time can not be later than the end", ENTITY_NAME, "badstarttime");
        if (currentStart.isBefore(ZonedDateTime.now(ZoneId.of("Z")))) throw new BadRequestAlertException("The start time can not before current time", ENTITY_NAME, "startbefore");

        isCorrect = true;
        List<Event> all = eventRepository.findAllByRoom(event.getRoom().getId());

        for (Event partAll : all) {
            pastStart = partAll.getStart().withZoneSameInstant(ZoneId.of("Z"));
            pastStop = partAll.getEnd().withZoneSameInstant(ZoneId.of("Z"));

            if (pastStart.isAfter(currentStart) && pastStart.isBefore(currentStop) || pastStop.isAfter(currentStart) && pastStop.isBefore(currentStop) ||
                pastStop.isEqual(currentStop) || pastStop.isEqual(currentStart) || pastStart.isEqual(currentStart) || pastStart.isEqual(currentStop)) {
                isCorrect = false;
                break;
            }
        }
        if (isCorrect) {
            Event result = eventRepository.save(event);
            long maxID = eventRepository.getMaxVisitId() != null ? eventRepository.getMaxVisitId()+1 : 0;
            eventRepository.createPresenterVisit(SecurityUtils.getCurrentUserLogin(),event.getId(),maxID);
            return ResponseEntity.created(new URI("/api/events/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
                .body(result);
        } else throw new BadRequestAlertException("This room is busy at this time", ENTITY_NAME, "roomexists");
    }

    /**
     * PUT  /events : Updates an existing event.
     *
     * @param event the event to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated event,
     * or with status 400 (Bad Request) if the event is not valid,
     * or with status 500 (Internal Server Error) if the event couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/events")
    @Timed
    public ResponseEntity<Event> updateEvent(@Valid @RequestBody Event event) throws URISyntaxException {
        log.debug("REST request to update Event : {}", event);
        if (event.getId() == null) {
            return createEvent(event);
        }
        Event result = eventRepository.save(event);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, event.getId().toString()))
            .body(result);
    }

    /**
     * GET  /events : get all the events.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of events in body
     */
    @GetMapping("/events")
    @Timed
    public ResponseEntity<List<Event>> getAllEvents(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Events");
        Page<Event> page = eventRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/events");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/events/currentUser")
    @Timed
    public List<Event> getCurrentUserEvents() {
        log.debug("REST request to get all events of current user: {}", SecurityUtils.getCurrentUserLogin());
        List<Event> currentEvents = eventRepository.getCurrentUserEvents(SecurityUtils.getCurrentUserLogin());
        return currentEvents;
    }

    /**
     * GET  /events/:id : get the "id" event.
     *
     * @param id the id of the event to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the event, or with status 404 (Not Found)
     */
    @GetMapping("/events/{id}")
    @Timed
    public ResponseEntity<Event> getEvent(@PathVariable Long id) {
        log.debug("REST request to get Event : {}", id);
        Event event = eventRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(event));
    }

    /**
     * DELETE  /events/:id : delete the "id" event.
     *
     * @param id the id of the event to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/events/{id}")
    @Timed
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        log.debug("REST request to delete Event : {}", id);
        eventRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
