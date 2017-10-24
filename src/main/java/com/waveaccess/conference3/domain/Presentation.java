package com.waveaccess.conference3.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Presentation.
 */
@Entity
@Table(name = "presentation")
public class Presentation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "discription")
    private String discription;

    @OneToMany(mappedBy = "presentation")
    @JsonIgnore
    private Set<Event> events = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Presentation title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDiscription() {
        return discription;
    }

    public Presentation discription(String discription) {
        this.discription = discription;
        return this;
    }

    public void setDiscription(String discription) {
        this.discription = discription;
    }

    public Set<Event> getEvents() {
        return events;
    }

    public Presentation events(Set<Event> events) {
        this.events = events;
        return this;
    }

    public Presentation addEvent(Event event) {
        this.events.add(event);
        event.setPresentation(this);
        return this;
    }

    public Presentation removeEvent(Event event) {
        this.events.remove(event);
        event.setPresentation(null);
        return this;
    }

    public void setEvents(Set<Event> events) {
        this.events = events;
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
        Presentation presentation = (Presentation) o;
        if (presentation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), presentation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Presentation{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", discription='" + getDiscription() + "'" +
            "}";
    }
}
