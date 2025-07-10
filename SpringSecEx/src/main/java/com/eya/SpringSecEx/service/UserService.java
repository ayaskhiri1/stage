package com.eya.SpringSecEx.service;

import com.eya.SpringSecEx.model.Users;
import com.eya.SpringSecEx.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Users register(Users user) {
        if (userRepo.findByUsername(user.getUsername()) != null) {
            throw new RuntimeException("Username already exists!");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    public String verify(Users user) {
        try {
            Authentication authentication = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
            );

            if (authentication.isAuthenticated()) {
                Users foundUser = userRepo.findByUsername(user.getUsername());

                if (foundUser == null) {
                    throw new BadCredentialsException("User not found");
                }

                Map<String, Object> claims = Map.of("role", foundUser.getRoles());
                return jwtService.generateToken(foundUser.getUsername(), claims);
            } else {
                throw new BadCredentialsException("Authentication failed");
            }

        } catch (Exception e) {
            // Important : relancer une exception pour que Spring renvoie un code 401/403
            throw new BadCredentialsException("Invalid username or password");
        }
    }
}
