package com.kiendland.propertyservice.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Category.
 */
@Entity
@Table(name = "category")
public class Category implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "image")
    private String image;

    @ManyToMany(mappedBy = "categories")
    @JsonIgnore
    private Set<Property> properties = new HashSet<>();

    @ManyToMany(mappedBy = "categories")
    @JsonIgnore
    private Set<News> news = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Category name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public Category image(String image) {
        this.image = image;
        return this;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Set<Property> getProperties() {
        return properties;
    }

    public Category properties(Set<Property> properties) {
        this.properties = properties;
        return this;
    }

    public Category addProperty(Property property) {
        this.properties.add(property);
        property.getCategories().add(this);
        return this;
    }

    public Category removeProperty(Property property) {
        this.properties.remove(property);
        property.getCategories().remove(this);
        return this;
    }

    public void setProperties(Set<Property> properties) {
        this.properties = properties;
    }

    public Set<News> getNews() {
        return news;
    }

    public Category news(Set<News> news) {
        this.news = news;
        return this;
    }

    public Category addNews(News news) {
        this.news.add(news);
        news.getCategories().add(this);
        return this;
    }

    public Category removeNews(News news) {
        this.news.remove(news);
        news.getCategories().remove(this);
        return this;
    }

    public void setNews(Set<News> news) {
        this.news = news;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Category)) {
            return false;
        }
        return id != null && id.equals(((Category) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Category{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", image='" + getImage() + "'" +
            "}";
    }
}
