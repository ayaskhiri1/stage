import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CoursesService, Course } from '../_services/courses.service';
import { SafePipe } from '../_auth/safe.pipe';
import { AuthService } from '../_auth/auth.service';

@Component({
  standalone: true,
  selector: 'app-course.detail',
  imports: [CommonModule, RouterModule, SafePipe],
  templateUrl: './course.detail.html',
  styleUrl: './course.detail.css'
})
export class CourseDetail implements OnInit {
  course?: Course;
  safeVideo?: SafeResourceUrl;
  toastMessage = '';
  showToast = false;

  constructor(
    private route: ActivatedRoute,
    private cs: CoursesService,
    private sanitizer: DomSanitizer,
    private router: Router,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.course = this.cs.getById(id);

    if (this.course?.video) {
      this.safeVideo = this.sanitizer.bypassSecurityTrustResourceUrl(this.course.video);
    }
  }
/*
  enrollInCourse(): void {
    if (!this.course) {
      this.show('Course data not found.');
      return;
    }

    // Vérification connexion via AuthService
    if (!this.auth.isLoggedIn()) {
      this.show('Please login to enroll.');
      setTimeout(() => this.router.navigate(['/login']), 2000);
      return;
    }

    const user = this.auth.getCurrentUser();
    if (!user) {
      this.show('User data not found.');
      return;
    }

    user.courses = [...(user.courses || [])];
    const alreadyEnrolled = user.courses.some((c: any) => c.id === this.course?.id);

    if (alreadyEnrolled) {
      this.show('You are already enrolled in this course.');
    } else {
      user.courses.push(this.course);
      localStorage.setItem('user', JSON.stringify(user));
      this.show(`You have successfully enrolled in "${this.course.title}"`);
    }
  }*/

  private show(message: string): void {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => (this.showToast = false), 3000);
  }
  upgradeCourse(): void {
  if (!this.auth.isLoggedIn()) {
    this.show('Please login to upgrade.');
    setTimeout(() => this.router.navigate(['/login']), 2000);
    return;
  }

  this.router.navigate(['/checkout', this.course?.id]);
}

goToCheckout(): void {
  if (!this.auth.isLoggedIn()) {
    this.show('Please login to enroll.');
    setTimeout(() => this.router.navigate(['/login']), 2000);
    return;
  }
  this.router.navigate(['/checkout', this.course?.id]);
}


}
