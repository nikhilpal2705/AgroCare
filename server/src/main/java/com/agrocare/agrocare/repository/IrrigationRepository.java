package com.agrocare.agrocare.repository;

import com.agrocare.agrocare.model.Inventory;
import com.agrocare.agrocare.model.Irrigation;
import com.agrocare.agrocare.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IrrigationRepository extends JpaRepository<Irrigation, Integer> {
    List<Irrigation> findAllByUser(Users userFromHeader);
}
