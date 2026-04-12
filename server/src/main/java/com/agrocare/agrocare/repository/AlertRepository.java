package com.agrocare.agrocare.repository;

import com.agrocare.agrocare.model.Alert;
import com.agrocare.agrocare.model.Users;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlertRepository extends JpaRepository<Alert, Integer> {
    List<Alert> findAllByUser(Users user, Sort sort);

    List<Alert> findAllByUserAndIsRead(Users user, boolean isRead, Sort sort);

    long countByUserAndIsRead(Users user, boolean isRead);
}
