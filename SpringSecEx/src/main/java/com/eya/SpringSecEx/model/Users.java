package com.eya.SpringSecEx.model;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "users")
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Ajout pour auto-incrément ID
    private int id;

    @Column(nullable = false, unique = true) // username obligatoire et unique
    private String username;

    @Column(nullable = false)
    private String password;

    // Ici roles est un String, mais il vaut mieux gérer ça avec une collection (Set<String>) ou une entité Role séparée.
    // Pour l'instant, on laisse String mais on ajoute @Column pour expliciter la colonne
    @Column(nullable = false)
    private String roles;

    // Constructeur sans arguments requis par JPA
    public Users() {}

    // Constructeur pratique
    public Users(String username, String password, String roles) {
        this.username = username;
        this.password = password;
        this.roles = roles;
    }

    // Getters et setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRoles() { return roles; }
    public void setRoles(String roles) { this.roles = roles; }

    @Override
    public String toString() {
        return "Users{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='[PROTECTED]'" +  // On évite d'afficher le mot de passe en clair
                ", roles='" + roles + '\'' +
                '}';
    }
}
