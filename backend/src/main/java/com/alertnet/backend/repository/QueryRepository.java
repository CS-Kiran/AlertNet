package com.alertnet.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.alertnet.backend.model.Query;

@Repository
public interface QueryRepository extends JpaRepository<Query, Long> {
    // Additional query methods (if needed)
}
