import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-user',
  imports: [DatePipe],
  templateUrl: './user.html',
  styleUrl: './user.css'
})
export class User {
  joinDate = new Date('2023-01-15');
}
