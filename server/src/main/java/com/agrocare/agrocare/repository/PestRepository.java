package com.agrocare.agrocare.repository;

import com.agrocare.agrocare.model.Pests;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PestRepository extends JpaRepository<Pests, Integer> {
    List<Pests> findAllByUserId(int userId);
}
