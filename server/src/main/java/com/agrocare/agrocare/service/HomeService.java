package com.agrocare.agrocare.service;

import com.agrocare.agrocare.model.Users;
import com.agrocare.agrocare.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class HomeService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepo;

    public Users registerUser(Users user) {
        user.setUpdatedAt(Instant.now().toString());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }
    
    public boolean existsByEmail(String email) {
        return userRepo.existsByEmail(email);
    }

    public List<Users> getAllUsers() {
        return userRepo.findAll();
    }
}
