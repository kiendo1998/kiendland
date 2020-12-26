package com.kiendland.propertyservice.service;

import com.kiendland.propertyservice.domain.Property;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Property}.
 */
public interface PropertyService {

    /**
     * Save a property.
     *
     * @param property the entity to save.
     * @return the persisted entity.
     */
    Property save(Property property);

    /**
     * Get all the properties.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Property> findAll(Pageable pageable);

    /**
     * Get all the properties with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    Page<Property> findAllWithEagerRelationships(Pageable pageable);


    /**
     * Get the "id" property.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Property> findOne(Long id);

    /**
     * Delete the "id" property.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
