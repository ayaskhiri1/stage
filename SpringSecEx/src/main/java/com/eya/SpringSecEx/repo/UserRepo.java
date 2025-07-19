package com.eya.SpringSecEx.repo;

import com.eya.SpringSecEx.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<Users,Integer> {
    Users findByUsername(String username);
    Users findByEmail(String email);
    Users findByPhoneNumber(String phoneNumber);

    @Query("""
           SELECT u FROM Users u
           WHERE  u.email        = :identifier
              OR u.phoneNumber  = :identifier
           """)
    Optional<Users> findByIdentifier(@Param("identifier") String identifier);
}
