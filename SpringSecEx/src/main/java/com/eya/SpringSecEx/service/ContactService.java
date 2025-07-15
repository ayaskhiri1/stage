package com.eya.SpringSecEx.service;

import com.eya.SpringSecEx.model.Contact;
import com.eya.SpringSecEx.repo.ContactRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContactService {

    @Autowired
    private ContactRepo contactRepo;

    public Contact saveMessage(Contact contact) {
        return contactRepo.save(contact);
    }
}