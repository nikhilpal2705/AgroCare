package com.agrocare.agrocare.repository;

import com.agrocare.agrocare.model.Farm;
import com.agrocare.agrocare.model.Users;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FarmRepository extends JpaRepository<Farm, Integer> {
    List<Farm> findAllByUser(Users user, Sort sort);

    List<Farm> findAllByUser(Users user);

    long countByUser(Users user);
}
