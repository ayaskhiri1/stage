import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../_auth/auth.service'; 

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-checkout-certif',
  templateUrl: './checkout-certif.html',
  styleUrls: ['./checkout-certif.css']
})
export class CheckoutCertif implements OnInit {
  certification?: { title: string; duration: string };
  
  certifications = [
    { title: 'Web Development Certificate', duration: '40h course' },
    { title: 'Cybersecurity Basics Certificate', duration: '25h course' },
    { title: 'AI & Machine Learning Specialist', duration: '60h course' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    const title = this.route.snapshot.paramMap.get('title')!;
    this.certification = this.certifications.find(c => c.title === title);

    if (!this.certification) {
      this.router.navigate(['/certifications']);
    }
  }

  processPayment(): void {
    if (!this.certification) return;

    const user = this.auth.getCurrentUser();
    if (user) {
      const alreadyEnrolled = (user.certifications || [])
        .some((c: any) => c.title === this.certification?.title);

      if (!alreadyEnrolled) {
        user.certifications = [...(user.certifications || []), this.certification];
        localStorage.setItem('user', JSON.stringify(user));
      }
    }

    alert(`✅ Payment successful! You are now enrolled in "${this.certification.title}".`);
    this.router.navigate(['/user']); 
  }

  cancel(): void {
    this.router.navigate(['/certifications']);
  }
}
