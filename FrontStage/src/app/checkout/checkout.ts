import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService, Course } from '../_services/courses.service';
import { AuthService } from '../_auth/auth.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout implements OnInit {
  course?: Course;
  price: number = 49.99;
  alreadyEnrolled: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private cs: CoursesService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.course = this.cs.getById(id);

    if (!this.course) {
      this.router.navigate(['/courses']);
      return;
    }

    const user = this.auth.getCurrentUser();
    this.alreadyEnrolled = (user?.courses || []).some((c: any) => c.id === this.course?.id);
  }

  processPayment(): void {
    if (!this.course) return;

    if (this.alreadyEnrolled) {
      alert(`⚠ You are already enrolled in "${this.course.title}".`);
      return;
    }

    const user = this.auth.getCurrentUser();
    if (user) {
      user.courses = [...(user.courses || []), this.course];
      localStorage.setItem('user', JSON.stringify(user));
    }

    alert(`✅ Payment successful! You now have full access to "${this.course.title}".`);
    this.router.navigate(['/course', this.course.id]);
  }

  cancel(): void {
    this.router.navigate(['/courses']);
  }
}
