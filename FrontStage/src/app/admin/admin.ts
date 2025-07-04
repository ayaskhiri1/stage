import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin {
   currentTime: string;

  constructor() {
    this.currentTime = new Date().toLocaleTimeString();

}
}
