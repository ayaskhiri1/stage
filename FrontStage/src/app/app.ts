import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';


import { Header } from './header/header';
import { Admin } from './admin/admin';
import { User } from './user/user';
import { Home } from './home/home';
import { Login } from './login/login';
import { Forbidden } from './forbidden/forbidden';

import { routes } from './app.routes';
import { AuthService } from './_auth/auth.service';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [Header, RouterOutlet],
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.css']
})
export class App {
  title = 'FrontStage';
}

@NgModule({
  declarations: [
    
  ],
  imports: [
    BrowserModule,
    Header,
    Admin,
    App,
    User,
    Home,
    Login,
    Forbidden,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService],
  bootstrap: [App]
})
export class AppModule { }
