package com.waveaccess.conference3.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Event.
 */
@Entity
@Table(name = "event")
public class Event implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "jhi_start", nullable = false)
    private ZonedDateTime start;

    @NotNull
    @Column(name = "jhi_end", nullable = false)
    private ZonedDateTime end;

    @OneToMany(mappedBy = "event")
    @JsonIgnore
    private Set<Visit> visits = new HashSet<>();

    @ManyToOne
    private Room room;

    @ManyToOne
    private Presentation presentation;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getStart() {
        return start;
    }

    public Event start(ZonedDateTime start) {
        this.start = start;
        return this;
    }

    public void setStart(ZonedDateTime start) {
        this.start = start;
    }

    public ZonedDateTime getEnd() {
        return end;
    }

    public Event end(ZonedDateTime end) {
        this.end = end;
        return this;
    }

    public void setEnd(ZonedDateTime end) {
        this.end = end;
    }

    public Set<Visit> getVisits() {
        return visits;
    }

    public Event visits(Set<Visit> visits) {
        this.visits = visits;
        return this;
    }

    public Event addVisit(Visit visit) {
        this.visits.add(visit);
        visit.setEvent(this);
        return this;
    }

    public Event removeVisit(Visit visit) {
        this.visits.remove(visit);
        visit.setEvent(null);
        return this;
    }

    public void setVisits(Set<Visit> visits) {
        this.visits = visits;
    }

    public Room getRoom() {
        return room;
    }

    public Event room(Room room) {
        this.room = room;
        return this;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public Presentation getPresentation() {
        return presentation;
    }

    public Event presentation(Presentation presentation) {
        this.presentation = presentation;
        return this;
    }

    public void setPresentation(Presentation presentation) {
        this.presentation = presentation;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Event event = (Event) o;
        if (event.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), event.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Event{" +
            "id=" + getId() +
            ", start='" + getStart() + "'" +
            ", end='" + getEnd() + "'" +
            "}";
    }
}
