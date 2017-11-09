package com.waveaccess.conference3.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.waveaccess.conference3.domain.Visit;

import com.waveaccess.conference3.repository.VisitRepository;
import com.waveaccess.conference3.web.rest.errors.BadRequestAlertException;
import com.waveaccess.conference3.web.rest.util.HeaderUtil;
import com.waveaccess.conference3.web.rest.util.PaginationUtil;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Visit.
 */
@RestController
@RequestMapping("/api")
public class VisitResource {

    private final Logger log = LoggerFactory.getLogger(VisitResource.class);

    private static final String ENTITY_NAME = "visit";

    private final VisitRepository visitRepository;

    public VisitResource(VisitRepository visitRepository) {
        this.visitRepository = visitRepository;
    }

    /**
     * POST  /visits : Create a new visit.
     *
     * @param visit the visit to create
     * @return the ResponseEntity with status 201 (Created) and with body the new visit, or with status 400 (Bad Request) if the visit has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/visits")
    @Timed
    public ResponseEntity<Visit> createVisit(@RequestBody Visit visit) throws URISyntaxException {
        log.debug("REST request to save Visit : {}", visit);
        if (visit.getId() != null) throw new BadRequestAlertException("A new visit cannot already have an ID", ENTITY_NAME, "idexists");
        for (Visit buffer : visitRepository.findByUserIsCurrentUser()) {
            if (visit.getEvent().getId().equals(buffer.getEvent().getId())) throw new BadRequestAlertException("User already subscribed to this event", ENTITY_NAME, "subscribed");
        }
        Visit result = visitRepository.save(visit);
        return ResponseEntity.created(new URI("/api/visits/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /visits : Updates an existing visit.
     *
     * @param visit the visit to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated visit,
     * or with status 400 (Bad Request) if the visit is not valid,
     * or with status 500 (Internal Server Error) if the visit couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/visits")
    @Timed
    public ResponseEntity<Visit> updateVisit(@RequestBody Visit visit) throws URISyntaxException {
        log.debug("REST request to update Visit : {}", visit);
        if (visit.getId() == null) {
            return createVisit(visit);
        }
        Visit result = visitRepository.save(visit);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, visit.getId().toString()))
            .body(result);
    }

    /**
     * GET  /visits : get all the visits.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of visits in body
     */
    @GetMapping("/visits")
    @Timed
    public ResponseEntity<List<Visit>> getAllVisits(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Visits");
        Page<Visit> page = visitRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/visits");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /visits/:id : get the "id" visit.
     *
     * @param id the id of the visit to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the visit, or with status 404 (Not Found)
     */
    @GetMapping("/visits/{id}")
    @Timed
    public ResponseEntity<Visit> getVisit(@PathVariable Long id) {
        log.debug("REST request to get Visit : {}", id);
        Visit visit = visitRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(visit));
    }

    /**
     * DELETE  /visits/:id : delete the "id" visit.
     *
     * @param id the id of the visit to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/visits/{id}")
    @Timed
    public ResponseEntity<Void> deleteVisit(@PathVariable Long id) {
        log.debug("REST request to delete Visit : {}", id);
        visitRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
