import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-certifications',
  imports: [CommonModule, RouterModule],
  templateUrl: './certifications.html',
  styleUrl: './certifications.css'
})
export class Certifications implements OnInit {
  certifications = [
    { title: 'Web Development Certificate', duration: '40h course' },
    { title: 'Cybersecurity Basics Certificate', duration: '25h course' },
    { title: 'AI & Machine Learning Specialist', duration: '60h course' }
  ];

  enrolledCertifications: string[] = [];
  showToast = false;
  toastMessage = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      this.enrolledCertifications = (user.certifications || []).map((c: any) => c.title);
    }
  }

  isEnrolled(title: string): boolean {
    return this.enrolledCertifications.includes(title);
  }

  enrollInCertification(title: string): void {
  const userJson = localStorage.getItem('user');

  if (!userJson || userJson === '{}' || !JSON.parse(userJson).username) {
    this.showToastMessage("Please login to enroll in a certification.");
    setTimeout(() => this.router.navigate(['/login']), 2000);
    return;
  }

  this.router.navigate(['/checkout-certification', title]);
}

  showToastMessage(message: string): void {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => this.showToast = false, 3000);
  }
}
