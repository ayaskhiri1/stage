package com.eya.SpringSecEx.controller;

import com.eya.SpringSecEx.model.JwtRequest;
import com.eya.SpringSecEx.model.JwtResponse;
import com.eya.SpringSecEx.service.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class JwtController {

    @Autowired
    private JWTService jwtService;

    @PostMapping("/authenticate")
    public JwtResponse createJwtToken(@RequestBody JwtRequest jwtRequest) throws Exception {
        return jwtService.createJwtToken(jwtRequest);
    }
}
