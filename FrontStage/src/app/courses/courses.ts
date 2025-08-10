import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { CoursesService, Course } from '../_services/courses.service';

import { AuthService } from '../_auth/auth.service';

@Component({
  standalone: true,
  selector: 'app-courses',
  imports: [CommonModule, RouterModule],
  templateUrl: './courses.html',
  styleUrl: './courses.css'
})

export class Courses {
  courses: Course[];

  constructor(private cs: CoursesService, public auth: AuthService) {
    this.courses = cs.getAll();
  }
}

