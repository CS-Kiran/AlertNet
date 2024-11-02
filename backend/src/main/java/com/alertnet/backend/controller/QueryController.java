package com.alertnet.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.alertnet.backend.model.Query;
import com.alertnet.backend.service.QueryService;

import java.util.List;

@RestController
@RequestMapping("/api/queries")
@CrossOrigin(origins = "http://localhost:5173")
public class QueryController {

    @Autowired
    private QueryService queryService;

    @PostMapping
    public ResponseEntity<Query> createQuery(@RequestBody Query query) {
        Query createdQuery = queryService.createQuery(query);
        return ResponseEntity.ok(createdQuery);
    }

    @PutMapping("/{queryId}")
    public ResponseEntity<Query> updateQuery(
        @PathVariable Long queryId,
        @RequestBody Query updatedQuery) {
        
        try {
            Query updatedQueryResponse = queryService.updateQuery(queryId, updatedQuery);
            return ResponseEntity.ok(updatedQueryResponse);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/sender/{senderId}")
    public ResponseEntity<List<Query>> getQueriesBySenderId(@PathVariable Long senderId) {
        List<Query> queries = queryService.getQueriesBySenderId(senderId);
        if (queries.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(queries);
    }

    // New method to get all queries
    @GetMapping
    public ResponseEntity<List<Query>> getAllQueries() {
        List<Query> queries = queryService.getAllQueries();
        return ResponseEntity.ok(queries);
    }
}