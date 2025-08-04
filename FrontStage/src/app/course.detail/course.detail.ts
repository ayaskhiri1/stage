import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CoursesService, Course } from '../_services/courses.service';
import { SafePipe } from '../_auth/safe.pipe';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.course = this.cs.getById(id);
    if (this.course?.video) {
      this.safeVideo = this.sanitizer.bypassSecurityTrustResourceUrl(this.course.video);
    }
  }

  enrollInCourse(): void {
    if (!this.course) {
      this.show('Course data not found.');
      return;
    }

    const userJson = localStorage.getItem('user');

    if (!userJson || userJson === '{}' || !JSON.parse(userJson).username) {
      this.show("Please login to enroll.");
      setTimeout(() => this.router.navigate(['/login']), 2000);
      return;
    }

    const user = JSON.parse(userJson);
    user.courses = [...(user.courses || [])];

    const alreadyEnrolled = user.courses.some((c: any) => c.id === this.course?.id);

    if (alreadyEnrolled) {
      this.show('You are already enrolled in this course.');
    } else {
      user.courses.push(this.course);
      localStorage.setItem('user', JSON.stringify(user));
      this.show(`You have successfully enrolled in "${this.course.title}"`);
    }
  }

  show(message: string): void {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => (this.showToast = false), 3000);
  }
}
