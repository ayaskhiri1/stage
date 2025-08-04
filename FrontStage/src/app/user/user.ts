import { Component, OnInit } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-user',
  templateUrl: './user.html',
  styleUrl: './user.css',
  imports: [CommonModule, RouterModule]
})
export class User implements OnInit {
  user: any = null;
  joinDate: Date | null = null;
  showToast = false;
  toastMessage = '';


  ngOnInit(): void {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      this.user = JSON.parse(userJson);
      if (this.user?.createdAt) {
        this.joinDate = new Date(this.user.createdAt);
      }
    }
  }
  download(cert: any): void {
    this.toastMessage = `📄 Downloading certificate: "${cert.title}" (${cert.duration})`;
    this.showToast = true;

    // Masquer le toast après 3 secondes
    setTimeout(() => this.showToast = false, 3000);
  }


}
