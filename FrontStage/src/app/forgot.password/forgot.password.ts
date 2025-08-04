import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PasswordResetService } from '../_services/password-reset.service';

@Component({
  standalone: true,
  selector: 'app-forgot.password',
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot.password.html',
  styleUrl: './forgot.password.css'
})
export class ForgotPassword {
  email: string = '';
  message: string = '';

  constructor(private resetService: PasswordResetService) { }


  onSubmit() {
    this.resetService.sendResetLink(this.email).subscribe({
      next: () => {
        this.message = '✅ Un lien de réinitialisation a été envoyé.';
      },
      error: () => {
        this.message = '❌ Une erreur est survenue.';
      }
    });
  }
  

}
