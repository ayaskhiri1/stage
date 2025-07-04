package com.eya.SpringSecEx.model;

import java.io.Serializable;


    public class JwtRequest implements Serializable {
        private static final long serialVersionUID = 1L;

        private String userName;
        private String userPassword;

        public JwtRequest() {
        }

        public JwtRequest(String userName, String userPassword) {
            this.userName = userName;
            this.userPassword = userPassword;
        }

        public String getUserName() {
            return userName;
        }

        public void setUserName(String userName) {
            this.userName = userName;
        }

        public String getUserPassword() {
            return userPassword;
        }

        public void setUserPassword(String userPassword) {
            this.userPassword = userPassword;
        }
}
