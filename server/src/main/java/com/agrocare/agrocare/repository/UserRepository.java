package com.agrocare.agrocare.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.agrocare.agrocare.model.Users;

@Repository
public interface UserRepository extends JpaRepository<Users, Integer> {

    public Users findByEmail(String email);
}
