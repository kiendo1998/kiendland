package com.kiendland.propertyservice.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Property.
 */
@Entity
@Table(name = "property")
public class Property implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @NotNull
    @Column(name = "price", nullable = false)
    private Double price;

    @NotNull
    @Column(name = "featured", nullable = false)
    private Boolean featured;

    @NotNull
    @Column(name = "purpose", nullable = false)
    private String purpose;

    @Column(name = "type")
    private String type;

    @Column(name = "project")
    private String project;

    @Column(name = "address")
    private String address;

    @Column(name = "area")
    private Double area;

    @Column(name = "description")
    private String description;

    @Column(name = "latitude")
    private String latitude;

    @Column(name = "longitude")
    private String longitude;

    @Column(name = "images")
    private String images;

    @Column(name = "create_by")
    private String createBy;

    @Column(name = "title_image")
    private String titleImage;

    @Column(name = "bed_room")
    private Integer bedRoom;

    @Column(name = "bath_room")
    private Integer bathRoom;

    @ManyToMany
    @JoinTable(name = "property_tag",
               joinColumns = @JoinColumn(name = "property_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "tag_id", referencedColumnName = "id"))
    private Set<Tag> tags = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "property_category",
               joinColumns = @JoinColumn(name = "property_id", referencedColumnName = "id"),
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

    public Property title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Double getPrice() {
        return price;
    }

    public Property price(Double price) {
        this.price = price;
        return this;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Boolean isFeatured() {
        return featured;
    }

    public Property featured(Boolean featured) {
        this.featured = featured;
        return this;
    }

    public void setFeatured(Boolean featured) {
        this.featured = featured;
    }

    public String getPurpose() {
        return purpose;
    }

    public Property purpose(String purpose) {
        this.purpose = purpose;
        return this;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public String getType() {
        return type;
    }

    public Property type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getProject() {
        return project;
    }

    public Property project(String project) {
        this.project = project;
        return this;
    }

    public void setProject(String project) {
        this.project = project;
    }

    public String getAddress() {
        return address;
    }

    public Property address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Double getArea() {
        return area;
    }

    public Property area(Double area) {
        this.area = area;
        return this;
    }

    public void setArea(Double area) {
        this.area = area;
    }

    public String getDescription() {
        return description;
    }

    public Property description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLatitude() {
        return latitude;
    }

    public Property latitude(String latitude) {
        this.latitude = latitude;
        return this;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getLongitude() {
        return longitude;
    }

    public Property longitude(String longitude) {
        this.longitude = longitude;
        return this;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public String getImages() {
        return images;
    }

    public Property images(String images) {
        this.images = images;
        return this;
    }

    public void setImages(String images) {
        this.images = images;
    }

    public String getCreateBy() {
        return createBy;
    }

    public Property createBy(String createBy) {
        this.createBy = createBy;
        return this;
    }

    public void setCreateBy(String createBy) {
        this.createBy = createBy;
    }

    public String getTitleImage() {
        return titleImage;
    }

    public Property titleImage(String titleImage) {
        this.titleImage = titleImage;
        return this;
    }

    public void setTitleImage(String titleImage) {
        this.titleImage = titleImage;
    }

    public Integer getBedRoom() {
        return bedRoom;
    }

    public Property bedRoom(Integer bedRoom) {
        this.bedRoom = bedRoom;
        return this;
    }

    public void setBedRoom(Integer bedRoom) {
        this.bedRoom = bedRoom;
    }

    public Integer getBathRoom() {
        return bathRoom;
    }

    public Property bathRoom(Integer bathRoom) {
        this.bathRoom = bathRoom;
        return this;
    }

    public void setBathRoom(Integer bathRoom) {
        this.bathRoom = bathRoom;
    }

    public Set<Tag> getTags() {
        return tags;
    }

    public Property tags(Set<Tag> tags) {
        this.tags = tags;
        return this;
    }

    public Property addTag(Tag tag) {
        this.tags.add(tag);
        tag.getProperties().add(this);
        return this;
    }

    public Property removeTag(Tag tag) {
        this.tags.remove(tag);
        tag.getProperties().remove(this);
        return this;
    }

    public void setTags(Set<Tag> tags) {
        this.tags = tags;
    }

    public Set<Category> getCategories() {
        return categories;
    }

    public Property categories(Set<Category> categories) {
        this.categories = categories;
        return this;
    }

    public Property addCategory(Category category) {
        this.categories.add(category);
        category.getProperties().add(this);
        return this;
    }

    public Property removeCategory(Category category) {
        this.categories.remove(category);
        category.getProperties().remove(this);
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
        if (!(o instanceof Property)) {
            return false;
        }
        return id != null && id.equals(((Property) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Property{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", price=" + getPrice() +
            ", featured='" + isFeatured() + "'" +
            ", purpose='" + getPurpose() + "'" +
            ", type='" + getType() + "'" +
            ", project='" + getProject() + "'" +
            ", address='" + getAddress() + "'" +
            ", area=" + getArea() +
            ", description='" + getDescription() + "'" +
            ", latitude='" + getLatitude() + "'" +
            ", longitude='" + getLongitude() + "'" +
            ", images='" + getImages() + "'" +
            ", createBy='" + getCreateBy() + "'" +
            ", titleImage='" + getTitleImage() + "'" +
            ", bedRoom=" + getBedRoom() +
            ", bathRoom=" + getBathRoom() +
            "}";
    }
}
