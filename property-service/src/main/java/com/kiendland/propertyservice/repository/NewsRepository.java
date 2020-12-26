package com.kiendland.propertyservice.repository;

import com.kiendland.propertyservice.domain.News;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the News entity.
 */
@Repository
public interface NewsRepository extends JpaRepository<News, Long> {

    @Query(value = "select distinct news from News news left join fetch news.tags left join fetch news.categories",
        countQuery = "select count(distinct news) from News news")
    Page<News> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct news from News news left join fetch news.tags left join fetch news.categories")
    List<News> findAllWithEagerRelationships();

    @Query("select news from News news left join fetch news.tags left join fetch news.categories where news.id =:id")
    Optional<News> findOneWithEagerRelationships(@Param("id") Long id);
}
