package com.projects.rebook.repository;

import com.projects.rebook.model.Share;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ShareRepository extends JpaRepository<Share, Long> {

  @Query(value = "SELECT * FROM share AS t WHERE t.news_item_id = ?1", nativeQuery = true)
  List<Share> findByNewItemId(Long newsItemId);
}
