import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../_auth/auth.service';
import { RouterModule } from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-profile',
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
})
export class Profile implements OnInit{
    user: any = null;
    joinDate: Date | null = null;


    constructor(private authService: AuthService) {}

    ngOnInit(): void {
    this.user = this.authService.getCurrentUser(); 
   

  }

}
