package com.eya.SpringSecEx.model;

public class Signup {
        private String username;
        private String email;
        private String password;
        private String roles;

        public Signup(String username, String email, String password, String roles) {
            super();
        }
        public String getUsername() {
            return username;
        }
        public void setUsername(String username) {
            this.username = username;
        }
        public String getEmail() {
            return email;
        }
        public void setEmail(String email) {
            this.email = email;
        }
        public String getPassword() {
            return password;
        }
        public void setPassword(String password) {
            this.password = password;
        }
        public String getRoles() {
            return roles;
        }
        public void setRoles(String roles) {
            this.roles = roles;
        }

}
