package com.eya.SpringSecEx.service;

import com.eya.SpringSecEx.model.Users;
import com.eya.SpringSecEx.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.util.Optional;
import java.util.UUID;

@Service
public class PasswordResetService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JavaMailSender mailSender;

    @Value("${MAIL_PASSWORD}")
    private String mailPassword;

    // ✅ Test du chargement du mot de passe de messagerie
    @PostConstruct
    public void debugMailPassword() {
        System.out.println("Loaded mail password: " + (mailPassword != null ? "OK" : "MISSING"));
    }

    // ✅ Envoi automatique d’un e-mail de test au démarrage
    @PostConstruct
    public void testMail() {
        try {
            SimpleMailMessage testMessage = new SimpleMailMessage();
            testMessage.setTo("aya.skhiri@eniso.u-sousse.tn");
            testMessage.setSubject("Test automatique Spring Boot");
            testMessage.setText("✅ Ceci est un test d'envoi d'e-mail depuis Spring Boot.");
            mailSender.send(testMessage);
            System.out.println("✅ E-mail de test envoyé avec succès !");
        } catch (Exception e) {
            System.out.println("❌ Erreur lors de l'envoi de l'e-mail de test : " + e.getMessage());
            e.printStackTrace();
        }
    }

    // ✅ Fonction normale d’envoi du lien de réinitialisation
    public void sendResetLink(String email) {
        Optional<Users> userOpt = Optional.ofNullable(userRepo.findByEmail(email));

        if (userOpt.isPresent()) {
            String token = UUID.randomUUID().toString();
            // TODO: Sauvegarder le token si nécessaire

            String resetUrl = "http://localhost:4200/reset-password?token=" + token;

            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setTo(email);
            mail.setSubject("Réinitialisation de mot de passe");
            mail.setText("Cliquez sur le lien suivant pour réinitialiser votre mot de passe :\n" + resetUrl);

            System.out.println("Sending reset email to: " + email);
            mailSender.send(mail);
            System.out.println("Reset email sent.");
        }

        // Pas d’erreur si l’e-mail n’existe pas (bonne pratique)
    }
}
