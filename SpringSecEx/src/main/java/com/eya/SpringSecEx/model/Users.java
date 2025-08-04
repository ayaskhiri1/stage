package com.eya.SpringSecEx.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String roles = "ROLE_USER";

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String phoneNumber;

    @Column(nullable = false)
    private LocalDate dateOfBirth;

    @Column(nullable = false)
    private String governorate;

    @Column(nullable = false)
    private String className;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public Users() { }

    public Users(String username,
                 String email,
                 String password,
                 String roles,
                 String firstName,
                 String lastName,
                 String phoneNumber,
                 LocalDate dateOfBirth,
                 String governorate,
                 String className) {

        this.username   = username;
        this.email      = email;
        this.password   = password;
        this.roles      = (roles == null || roles.isBlank()) ? "ROLE_USER" : roles;
        this.firstName  = firstName;
        this.lastName   = lastName;
        this.phoneNumber = phoneNumber;
        this.dateOfBirth = dateOfBirth;
        this.governorate = governorate;
        this.className   = className;
    }

    public int getId()                       { return id; }
    public void setId(int id)                { this.id = id; }

    public String getUsername()              { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail()                 { return email; }
    public void setEmail(String email)       { this.email = email; }

    public String getPassword()              { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRoles()                 { return roles; }
    public void setRoles(String roles)       { this.roles = roles; }

    public String getFirstName()                 { return firstName; }
    public void setFirstName(String firstName)   { this.firstName = firstName; }

    public String getLastName()                  { return lastName; }
    public void setLastName(String lastName)     { this.lastName = lastName; }

    public String getPhoneNumber()               { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber){ this.phoneNumber = phoneNumber; }

    public LocalDate getDateOfBirth()            { return dateOfBirth; }
    public void setDateOfBirth(LocalDate dob)    { this.dateOfBirth = dob; }

    public String getGovernorate()               { return governorate; }
    public void setGovernorate(String governorate){ this.governorate = governorate; }

    public String getClassName()                 { return className; }
    public void setClassName(String className)   { this.className = className; }

    public LocalDateTime getCreatedAt()           { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }


    @Override
    public String toString() {
        return "Users{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", roles='" + roles + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", governorate='" + governorate + '\'' +
                ", className='" + className + '\'' +
                '}';
    }
}
