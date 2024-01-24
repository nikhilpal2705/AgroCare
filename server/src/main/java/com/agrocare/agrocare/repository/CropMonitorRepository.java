package com.agrocare.agrocare.repository;

import com.agrocare.agrocare.model.CropMonitor;
import com.agrocare.agrocare.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CropMonitorRepository extends JpaRepository<CropMonitor, Integer> {
    List<CropMonitor> findAllByUser(Users userFromHeader);

    @Modifying
    @Query("DELETE FROM CropMonitor cm WHERE cm.id = :cropMonitorId")
    void deleteMonitorById(@Param("cropMonitorId") int cropMonitorId);

    Object countByUser(Users user);
}
