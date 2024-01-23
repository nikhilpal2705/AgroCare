package com.agrocare.agrocare.repository;

import com.agrocare.agrocare.model.CropMonitor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CropMonitorRepository extends JpaRepository<CropMonitor, Integer> {
}
