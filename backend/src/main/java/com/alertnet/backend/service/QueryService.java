package com.alertnet.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alertnet.backend.model.Query;
import com.alertnet.backend.repository.QueryRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class QueryService {

    @Autowired
    private QueryRepository queryRepository;

    public Query createQuery(Query query) {
        query.setCreatedAt(LocalDateTime.now());
        query.setUpdatedAt(LocalDateTime.now());
        query.setStatus("Pending");
        return queryRepository.save(query);
    }

    public Query updateQuery(Long queryId, Query updatedQuery) throws Exception {
        Optional<Query> optionalQuery = queryRepository.findById(queryId);
        if (optionalQuery.isPresent()) {
            Query query = optionalQuery.get();
            query.setMessage(updatedQuery.getMessage());
            query.setQueryType(updatedQuery.getQueryType());
            query.setStatus(updatedQuery.getStatus());
            query.setAdminResponse(updatedQuery.getAdminResponse());
            query.setUpdatedAt(LocalDateTime.now());
            return queryRepository.save(query);
        } else {
            throw new Exception("Query with ID " + queryId + " not found.");
        }
    }
    
    public List<Query> getAllQueries() {
        return queryRepository.findAll();
    }
}
