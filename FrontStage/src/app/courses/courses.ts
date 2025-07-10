import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-courses',
  imports: [CommonModule],
  templateUrl: './courses.html',
  styleUrl: './courses.css'
})
export class Courses {
  courses = [
    {
      id: 1,
      title: 'Angular Fundamentals',
      description: 'Learn the core concepts of Angular and build dynamic web apps.',
      category: 'Web Development',
      level: 'Beginner',
      image: 'images/angular.jpg',
      price: 0
    },
    {
      id: 2,
      title: 'Python for Data Science',
      description: 'Explore data analysis, visualization and machine learning with Python.',
      category: 'Data Science',
      level: 'Intermediate',
      image: 'images/python.jpg',
      price: 0
    },
    {
      id: 3,
      title: 'Cybersecurity Essentials',
      description: 'Understand threats, vulnerabilities and best practices to secure systems.',
      category: 'Security',
      level: 'Advanced',
      image: 'images/cyber.jpg',
      price: 0
    }
  ];
}
