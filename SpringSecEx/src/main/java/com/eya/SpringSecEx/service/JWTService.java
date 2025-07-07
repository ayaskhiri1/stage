package com.eya.SpringSecEx.service;

import com.eya.SpringSecEx.model.JwtRequest;
import com.eya.SpringSecEx.model.JwtResponse;
import com.eya.SpringSecEx.model.UserPrincipal;
import com.eya.SpringSecEx.model.Users;
import com.eya.SpringSecEx.repo.UserRepo;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JWTService {

    private final UserRepo userRepo;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public JWTService(UserRepo userRepo, AuthenticationManager authenticationManager) {
        this.userRepo = userRepo;
        this.authenticationManager = authenticationManager;
    }

    private final String secretKey = "SDF23sD5vQhXZ2+1fUHo4RJlh6kqHh3lPuJZgJ6H0FI=";

    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(String username, Map<String, Object> claims) {
        long expirationTime = 1000 * 60 * 60 * 30; // 30 heures
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", ((UserPrincipal) userDetails).getUser().getRoles());
        return generateToken(userDetails.getUsername(), claims);
    }


    public JwtResponse createJwtToken(JwtRequest jwtRequest) throws Exception {
        String userName = jwtRequest.getUserName();
        String userPassword = jwtRequest.getUserPassword();

        authenticate(userName, userPassword);

        final UserDetails userDetails = loadUserByUsername(userName);
        String newGeneratedToken = generateToken(userDetails);

        Users user = userRepo.findByUsername(userName);
        return new JwtResponse(user, newGeneratedToken);
    }

    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        Users user = userRepo.findByUsername(userName);
        if (user == null) {
            throw new UsernameNotFoundException("User not found: " + userName);
        }
        return new UserPrincipal(user);
    }

    private void authenticate(String userName, String userPassword) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userName, userPassword));
        } catch (DisabledException e) {
            throw new Exception("USER DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("BAD CREDENTIALS", e);
        }
    }

    public String extractUserName(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUserName(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}
