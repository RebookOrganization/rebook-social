package com.projects.rebook.repository;

import com.projects.rebook.model.ContactOwner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactOwnerRepository extends JpaRepository<ContactOwner, Long> {
    //
}
