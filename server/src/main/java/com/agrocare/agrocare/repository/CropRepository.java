package com.agrocare.agrocare.repository;

import com.agrocare.agrocare.model.Crops;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CropRepository extends JpaRepository<Crops, Integer> {
}
