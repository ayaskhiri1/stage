package com.eya.SpringSecEx.model;

import jakarta.persistence.*;

@Entity
@Table(name = "contact_messages")
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;

    @Column(length = 1000)
    private String message;

    public Long getId() {return id;}
    public void setId(Long id) {this.id = id;}
    public String getName() {return name;}
    public void setName(String name) {this.name = name;}
    public String getEmail() {return email;}
    public void setEmail(String email) {this.email = email;}
    public String getMessage() {return message;}
    public void setMessage(String message) {this.message = message;}

}
