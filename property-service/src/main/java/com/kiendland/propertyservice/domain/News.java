package com.kiendland.propertyservice.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A News.
 */
@Entity
@Table(name = "news")
public class News implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @NotNull
    @Size(min = 20, max = 10000)
    @Column(name = "content", length = 10000, nullable = false)
    private String content;

    @Column(name = "publish_date")
    private LocalDate publishDate;

    @Column(name = "images")
    private String images;

    @Column(name = "title_image")
    private String titleImage;

    @ManyToMany
    @JoinTable(name = "news_tag",
               joinColumns = @JoinColumn(name = "news_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "tag_id", referencedColumnName = "id"))
    private Set<Tag> tags = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "news_category",
               joinColumns = @JoinColumn(name = "news_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "category_id", referencedColumnName = "id"))
    private Set<Category> categories = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public News title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public News content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDate getPublishDate() {
        return publishDate;
    }

    public News publishDate(LocalDate publishDate) {
        this.publishDate = publishDate;
        return this;
    }

    public void setPublishDate(LocalDate publishDate) {
        this.publishDate = publishDate;
    }

    public String getImages() {
        return images;
    }

    public News images(String images) {
        this.images = images;
        return this;
    }

    public void setImages(String images) {
        this.images = images;
    }

    public String getTitleImage() {
        return titleImage;
    }

    public News titleImage(String titleImage) {
        this.titleImage = titleImage;
        return this;
    }

    public void setTitleImage(String titleImage) {
        this.titleImage = titleImage;
    }

    public Set<Tag> getTags() {
        return tags;
    }

    public News tags(Set<Tag> tags) {
        this.tags = tags;
        return this;
    }

    public News addTag(Tag tag) {
        this.tags.add(tag);
        tag.getNews().add(this);
        return this;
    }

    public News removeTag(Tag tag) {
        this.tags.remove(tag);
        tag.getNews().remove(this);
        return this;
    }

    public void setTags(Set<Tag> tags) {
        this.tags = tags;
    }

    public Set<Category> getCategories() {
        return categories;
    }

    public News categories(Set<Category> categories) {
        this.categories = categories;
        return this;
    }

    public News addCategory(Category category) {
        this.categories.add(category);
        category.getNews().add(this);
        return this;
    }

    public News removeCategory(Category category) {
        this.categories.remove(category);
        category.getNews().remove(this);
        return this;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof News)) {
            return false;
        }
        return id != null && id.equals(((News) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "News{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", content='" + getContent() + "'" +
            ", publishDate='" + getPublishDate() + "'" +
            ", images='" + getImages() + "'" +
            ", titleImage='" + getTitleImage() + "'" +
            "}";
    }
}
