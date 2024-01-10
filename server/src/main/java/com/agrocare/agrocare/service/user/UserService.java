package com.agrocare.agrocare.service.user;

import com.agrocare.agrocare.helper.Constants;
import com.agrocare.agrocare.model.Users;
import com.agrocare.agrocare.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Optional<Users> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<Users[]> fetchUserDetails(String email) {
        return userRepository.findByUsername(email);
    }

    public Users checkUserByUserId(int userId) {
        return this.userRepository.findById(userId).orElseThrow(() -> new UsernameNotFoundException(Constants.Messages.USER_ID_NOT_AVAILABLE));
    }
}
