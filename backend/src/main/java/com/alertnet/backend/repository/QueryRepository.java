package com.alertnet.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.alertnet.backend.model.Query;

@Repository
public interface QueryRepository extends JpaRepository<Query, Long> {
    List<Query> findBySenderId(Long senderId);
}
