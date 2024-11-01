package com.alertnet.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.alertnet.backend.model.QuickReport;

public interface QuickReportRepository extends JpaRepository<QuickReport, Long> {
	List<QuickReport> findByquickReportId(Long quickReportId);
}
