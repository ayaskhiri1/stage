import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ContactService } from '../_auth/contact.service'; 
import { HttpClientModule } from '@angular/common/http';


@Component({
  standalone: true,
  selector: 'app-contact',
  imports: [CommonModule, FormsModule, MatSnackBarModule, HttpClientModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class Contact {
  constructor(private snackBar: MatSnackBar, private contactService: ContactService) {}


  contact = {
    name: '',
    email: '',
    message: ''
  };

  onSubmit() {
    this.contactService.sendMessage(this.contact).subscribe({
      next: () => {
        this.snackBar.open('✅ Message sent successfully!', 'Close', { duration: 3000 });
        this.contact = { name: '', email: '', message: '' };
      },
      error: () => {
        this.snackBar.open('❌ Failed to send message. Try again.', 'Close', { duration: 3000 });
      }
    });
  }
}
