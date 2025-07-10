package com.eya.SpringSecEx.controller;

import com.eya.SpringSecEx.model.JwtRequest;
import com.eya.SpringSecEx.model.JwtResponse;
import com.eya.SpringSecEx.model.Users;
import com.eya.SpringSecEx.service.JWTService;
import com.eya.SpringSecEx.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JWTService jwtService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Users user) {
        try {
            Users savedUser = userService.register(user);
            return ResponseEntity.ok(savedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Registration failed: " + e.getMessage());
        }
    }

    @GetMapping("/forAdmin")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public String forAdmin() {
        return "This URL is only accessible to admin";
    }

    @GetMapping("/forUser")
    @PreAuthorize("hasAnyAuthority('ROLE_ETUDIANT','ROLE_USER')")
    public String forUser() {
        return "This URL is only accessible to user";
    }
}
