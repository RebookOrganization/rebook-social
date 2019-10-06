package com.projects.rebook.repository;

import com.projects.rebook.model.NewsItem;
import com.projects.rebook.model.PropertyAddress;
import com.projects.rebook.model.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NewsItemRepository extends JpaRepository<NewsItem, Long> {

    Optional<NewsItem> findById(Long id);

    List<NewsItem> findAllByUser(User user);

    @Query(value = "SELECT * FROM news_item as t where t.property_address_id = ?1", nativeQuery = true)
    NewsItem findByPropertyAddress(long propertyAddress);

    @Query(value = "SELECT * FROM news_item as t where t.posted_milisec > ?1 and t.posted_milisec <= ?2", nativeQuery = true)
    List<NewsItem> findAllByPostedDate(long dateFrom, long dateTo);

    @Query(value = "SELECT * FROM news_item as t where t.posted_milisec = ?1", nativeQuery = true)
    List<NewsItem> findAllByPostedMilisec(long milisec);

    @Query(value = "SELECT * FROM (SELECT * FROM news_item ORDER BY id DESC LIMIT 20) sub ORDER BY id ASC", nativeQuery = true)
    List<NewsItem> findLastNRowsInPartition(String partition);

    @Query(value = "INSERT INTO `news_item`+?2 () values () ", nativeQuery = true)
    void saveToPartition(String partition);

}
