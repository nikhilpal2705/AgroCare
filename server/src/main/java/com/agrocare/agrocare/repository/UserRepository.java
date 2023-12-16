package com.agrocare.agrocare.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.agrocare.agrocare.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    
}
