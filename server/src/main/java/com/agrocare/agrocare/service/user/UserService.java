package com.agrocare.agrocare.service.user;

import com.agrocare.agrocare.configuration.jwt.JwtHelper;
import com.agrocare.agrocare.configuration.jwt_pojo.JwtResponse;
import com.agrocare.agrocare.configuration.jwt_pojo.UserResponse;
import com.agrocare.agrocare.helper.Constants;
import com.agrocare.agrocare.model.Users;
import com.agrocare.agrocare.pojo.CustomResponse;
import com.agrocare.agrocare.repository.UserRepository;
import com.agrocare.agrocare.service.common.CommonService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CommonService commonService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtHelper helper;

    @Autowired
    private UserDetailsService userDetailsService;

    public Optional<Users> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Users checkUserByUserId(int userId) {
        return this.userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException(Constants.Messages.USER_ID_NOT_AVAILABLE));
    }

    public CustomResponse getUserByEmailAddress(String email) {
        return new CustomResponse(this.userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(Constants.Messages.USER_ID_NOT_AVAILABLE)));
    }

    public CustomResponse updateUserPassword(String password, HttpServletRequest request) {
        Users user = commonService.getUserFromHeader(request);
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
        return new CustomResponse(true, Constants.Messages.PASSWORD_UPDATED);
    }

    public CustomResponse updateProfile(Users user, HttpServletRequest request) {
        // Update user profile
        Users userFromHeader = commonService.getUserFromHeader(request);
        userFromHeader.setName(user.getName());
        userFromHeader.setEmail(user.getEmail());
        Users updatedUser = userRepository.save(userFromHeader);

        // Fetch user details by email
        UserDetails userDetails = userDetailsService.loadUserByUsername(updatedUser.getEmail());

        UserResponse userResponse = new UserResponse(updatedUser.getId(), updatedUser.getName(), updatedUser.getEmail(),
                updatedUser.getAuthorities(), updatedUser.getStatus());
        String token = this.helper.generateToken(userDetails);
        return new CustomResponse(true, new JwtResponse(token, userResponse), Constants.Messages.PROFILE_UPDATED);
    }
}
