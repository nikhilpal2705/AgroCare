package com.agrocare.agrocare.service.common;

import com.agrocare.agrocare.helper.Constants;
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
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String registerUser(Users user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepo.save(user);
        return Constants.Messages.REGISTRATION_SUCCESS_MESSAGE;
    }
    
    public boolean existsByEmail(String email) {
        return userRepo.existsByEmail(email);
    }

    public List<Users> getAllUsers() {
        return userRepo.findAll();
    }
}
