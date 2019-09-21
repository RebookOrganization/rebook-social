package com.projects.rebook.repository;

import com.projects.rebook.model.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByName(String name);

    @Query(value = "SELECT * FROM real_estate_db.user as t WHERE t.name LIKE %?1% ", nativeQuery = true)
    List<User> findByNameLike(String name);

    Optional<User> findById(Long id);

    Boolean existsByEmail(String email);
}
