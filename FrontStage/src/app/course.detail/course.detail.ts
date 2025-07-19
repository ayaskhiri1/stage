import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CoursesService, Course } from '../_services/courses.service';

import { SafePipe } from '../_auth/safe.pipe';

@Component({
  standalone: true,
  selector: 'app-course.detail',
  imports: [CommonModule, RouterModule,SafePipe],
  templateUrl: './course.detail.html',
  styleUrl: './course.detail.css'
})

export class CourseDetail implements OnInit {
  course?: Course;
  safeVideo?: SafeResourceUrl;

  constructor(
    private route: ActivatedRoute,
    private cs: CoursesService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.course = this.cs.getById(id);
    if (this.course?.video) {
      this.safeVideo = this.sanitizer.bypassSecurityTrustResourceUrl(this.course.video);
    }
  }
}
