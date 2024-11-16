package com.agrocare.agrocare.repository;

import com.agrocare.agrocare.model.Pests;
import java.util.List;

import com.agrocare.agrocare.model.Users;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PestRepository extends JpaRepository<Pests, Integer> {
    List<Pests> findAllByUserId(int userId, Sort id);

    Object countByUser(Users user);
}
