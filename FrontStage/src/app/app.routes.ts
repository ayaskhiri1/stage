import { Routes } from '@angular/router';

import { Home } from './home/home';
import { Admin } from './admin/admin';
import { User } from './user/user';
import { Courses } from './courses/courses';
import { Signup } from './signup/signup';
import { Login } from './login/login';
import { Contact } from './contact/contact';
import { Forbidden } from './forbidden/forbidden';

import { authGuard } from './_auth/auth.guard';
import { adminGuard } from './_auth/admin.guard';
import { GuestGuard } from './_auth/guest.guard';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'admin', component: Admin, canActivate: [adminGuard] },
  { path: 'user', component: User, canActivate: [authGuard] },
  { path: 'courses', component: Courses },
  { path: 'signup', component: Signup, canActivate: [GuestGuard] },
  { path: 'login', component: Login, canActivate: [GuestGuard] },
  { path: 'contact', component: Contact },
  { path: 'forbidden', component: Forbidden },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }  // optionnel : route 404
];
