import { Injectable } from '@angular/core';

export interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  level: string;
  image: string;
  price: number;
  video: string;              // ➜ URL YouTube ou autre
  links: { label: string; url: string }[];
}

@Injectable({ providedIn: 'root' })
export class CoursesService {

  private courses: Course[] = [
    {
      id: 1,
      title: 'Angular Fundamentals',
      description: 'Learn the core concepts of Angular and build dynamic web apps.',
      category: 'Web Development',
      level: 'Beginner',
      image: 'images/angular.jpg',
      price: 0,
      video: 'https://www.youtube.com/embed/2OHbjep_WjQ',
      links: [
        { label: 'Official Docs', url: 'https://angular.io/docs' },
        { label: 'Cheat Sheet', url: 'https://angular.io/guide/cheatsheet' }
      ]
    },
    {
      id: 2,
      title: 'Python for Data Science',
      description: 'Explore data analysis, visualization and machine learning with Python.',
      category: 'Data Science',
      level: 'Intermediate',
      image: 'images/python.jpg',
      price: 0,
      video: 'https://www.youtube.com/embed/r-uOLxNrNk8',
      links: [
        { label: 'NumPy Documentation', url: 'https://numpy.org/doc/' },
        { label: 'pandas User Guide', url: 'https://pandas.pydata.org/docs/' },
        { label: 'scikit-learn', url: 'https://scikit-learn.org/' }
      ]
    },
    {
      id: 3,
      title: 'Cybersecurity Essentials',
      description: 'Understand threats, vulnerabilities and best practices to secure systems.',
      category: 'Security',
      level: 'Advanced',
      image: 'images/cyber.jpg',
      price: 0,
      video: 'https://www.youtube.com/embed/inWWhr5tnEA',
      links: [
        { label: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/' },
        { label: 'Kali Linux Tools', url: 'https://tools.kali.org/' },
        { label: 'MITRE ATT&CK', url: 'https://attack.mitre.org/' }
      ]
    }
  
    // … autres cours
  ];

  getAll() {
    return this.courses;
  }

  getById(id: number) {
    return this.courses.find(c => c.id === id);
  }
}
