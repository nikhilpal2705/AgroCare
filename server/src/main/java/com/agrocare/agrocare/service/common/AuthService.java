package com.agrocare.agrocare.service.common;

import com.agrocare.agrocare.model.Users;
import com.agrocare.agrocare.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public Users findByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(()-> new RuntimeException("User not found"));
    }

}
