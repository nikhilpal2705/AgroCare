package com.agrocare.agrocare.repository;

import com.agrocare.agrocare.model.Crops;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CropRepository extends JpaRepository<Crops, Integer> {
}
