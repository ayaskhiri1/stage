import { Routes } from '@angular/router';

import { Home } from './home/home';
import { Admin } from './admin/admin';
import { User } from './user/user';
import { Courses } from './courses/courses';

import { Signup } from './signup/signup';

import { Login } from './login/login';
import { Contact } from './contact/contact';
import { Forbidden } from './forbidden/forbidden';
import { About } from './about/about';

import { authGuard } from './_auth/auth.guard';
import { adminGuard } from './_auth/admin.guard';
import { GuestGuard } from './_auth/guest.guard';

import { CourseDetail } from './course.detail/course.detail';


export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'admin', component: Admin, canActivate: [adminGuard] },
  { path: 'user', component: User, canActivate: [authGuard] },
{
  path: 'signup',
  canActivate: [GuestGuard],
  loadComponent: () =>
    import('./signup/signup').then(m => m.Signup)
},
{
  path: 'login',
  canActivate: [GuestGuard],
  loadComponent: () =>
    import('./login/login').then(m => m.Login)
}
,
  { path: 'contact', component: Contact },
  { path: 'about', component: About },
  { path: 'forbidden', component: Forbidden },

  { path: 'courses', component: Courses },
  { path: 'courses/:id', component: CourseDetail },


  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }  // optionnel : route 404
];
