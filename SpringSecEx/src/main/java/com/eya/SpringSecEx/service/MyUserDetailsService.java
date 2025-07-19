package com.eya.SpringSecEx.service;

import com.eya.SpringSecEx.model.UserPrincipal;
import com.eya.SpringSecEx.model.Users;
import com.eya.SpringSecEx.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service("myUserDetailsService")
@Primary
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepo repo;

    @Override
    public UserDetails loadUserByUsername(String identifier) throws UsernameNotFoundException {

        Users user = repo.findByIdentifier(identifier)
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                "User not found with identifier: " + identifier));

        return new UserPrincipal(user);
    }
}
