package com.agrocare.agrocare.repository;

import com.agrocare.agrocare.model.Crops;
import com.agrocare.agrocare.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.List;

@Repository
public interface CropRepository extends JpaRepository<Crops, Integer> {
    List<Crops> findAllByUserId(int userId);

    Object countByUser(Users user);


}
