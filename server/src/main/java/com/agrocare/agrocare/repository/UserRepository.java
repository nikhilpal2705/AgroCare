package com.agrocare.agrocare.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.agrocare.agrocare.model.Users;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Users, Integer> {

    Optional<Users> findByEmail(String email);

    boolean existsByEmail(String email);

    @Query("SELECT u.id, u.name, u.email, u.authorities, u.status FROM Users u WHERE u.email = :email")
    Optional<Users[]> findByUsername(String email);
}
