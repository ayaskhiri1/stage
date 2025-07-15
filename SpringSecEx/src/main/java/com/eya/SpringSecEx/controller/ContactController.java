package com.eya.SpringSecEx.controller;

import com.eya.SpringSecEx.model.Contact;
import com.eya.SpringSecEx.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:4200")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @PostMapping
    public ResponseEntity<?> receiveMessage(@RequestBody Contact contact) {
        Contact saved = contactService.saveMessage(contact);
        return ResponseEntity.ok(saved);
    }
}
