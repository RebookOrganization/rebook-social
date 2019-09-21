package com.projects.rebook.repository;

import com.projects.rebook.model.PropertyProject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PropertyProjectRepository extends JpaRepository<PropertyProject, Long> {
}
