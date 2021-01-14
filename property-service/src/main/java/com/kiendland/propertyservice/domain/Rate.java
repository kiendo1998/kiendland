package com.kiendland.propertyservice.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Rate.
 */
@Entity
@Table(name = "rate")
public class Rate implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Min(value = 1)
    @Max(value = 5)
    @Column(name = "rate_point")
    private Integer ratePoint;

    @ManyToOne
    @JsonIgnoreProperties(value = "rates", allowSetters = true)
    private Property property;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getRatePoint() {
        return ratePoint;
    }

    public Rate ratePoint(Integer ratePoint) {
        this.ratePoint = ratePoint;
        return this;
    }

    public void setRatePoint(Integer ratePoint) {
        this.ratePoint = ratePoint;
    }

    public Property getProperty() {
        return property;
    }

    public Rate property(Property property) {
        this.property = property;
        return this;
    }

    public void setProperty(Property property) {
        this.property = property;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Rate)) {
            return false;
        }
        return id != null && id.equals(((Rate) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Rate{" +
            "id=" + getId() +
            ", ratePoint=" + getRatePoint() +
            "}";
    }
}
