package com.eya.SpringSecEx.model;


import java.io.Serializable;

public class JwtResponse implements Serializable {
    private static final long serialVersionUID = 1L;

    private Users user;
    private String jwtToken;

    public JwtResponse() {
    }

    public JwtResponse(Users user, String jwtToken) {
        this.user = user;
        this.jwtToken = jwtToken;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public String getJwtToken() {
        return jwtToken;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }
}