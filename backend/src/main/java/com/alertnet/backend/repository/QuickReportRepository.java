package com.alertnet.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.alertnet.backend.model.QuickReport;

public interface QuickReportRepository extends JpaRepository<QuickReport, Long> {
    // Additional query methods (if needed) can be defined here
}
