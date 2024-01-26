package com.agrocare.agrocare.repository;

import com.agrocare.agrocare.model.Irrigation;
import com.agrocare.agrocare.model.Users;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IrrigationRepository extends JpaRepository<Irrigation, Integer> {
    List<Irrigation> findAllByUser(Users userFromHeader, Sort id);

    @Query(value = "SELECT * FROM irrigation WHERE user = :userId AND DATE(scheduledDate) BETWEEN DATE(:startDate )AND DATE(:endDate) ORDER BY scheduledDate DESC", nativeQuery = true)
    List<Irrigation> findIrrigationsInDateRange(@Param("userId") int userId,
                                                @Param("startDate") String startDate,
                                                @Param("endDate") String endDate);
}
