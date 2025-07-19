package com.eya.SpringSecEx.model;

import java.io.Serializable;

public class JwtRequest implements Serializable {
    private static final long serialVersionUID = 1L;

    private String identifier;   // username OR email OR phone
    private String userPassword;
    private String username;

    public JwtRequest() {}

    public JwtRequest(String identifier, String userPassword) {
        this.identifier = identifier;
        this.userPassword = userPassword;
    }

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
