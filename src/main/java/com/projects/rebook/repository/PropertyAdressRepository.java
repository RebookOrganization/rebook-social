package com.projects.rebook.repository;

import com.projects.rebook.model.PropertyAddress;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PropertyAdressRepository extends JpaRepository<PropertyAddress, Long> {

  @Query(value = "SELECT * FROM property_address as t WHERE t.summary LIKE %?1% ", nativeQuery = true)
  List<PropertyAddress> findAllBySummary(String address);
}
