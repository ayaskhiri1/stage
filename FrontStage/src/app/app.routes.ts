import { Routes } from '@angular/router';

import { Home } from './home/home';
import { Admin } from './admin/admin';
import { User } from './user/user';
import { Courses } from './courses/courses';

import { Users } from './users/users';

import { Contact } from './contact/contact';
import { Forbidden } from './forbidden/forbidden';
import { About } from './about/about';

import { authGuard } from './_auth/auth.guard';
import { adminGuard } from './_auth/admin.guard';
import { GuestGuard } from './_auth/guest.guard';

import { CourseDetail } from './course.detail/course.detail';

import { Profile } from './profile/profile';

import { ForgotPassword } from './forgot.password/forgot.password';

import { Checkout } from './checkout/checkout';
import { CheckoutCertif } from './checkout-certif/checkout-certif';

import { PaymentSuccess } from './payment-success/payment-success';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'admin', component: Admin, canActivate: [adminGuard] },
  { path: 'user', component: User, canActivate: [authGuard] },
  
  { path: 'users', component: Users, canActivate: [authGuard] },

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


  {
    path: 'certifications',
    loadComponent: () =>
      import('./certifications/certifications').then(m => m.Certifications)
  },
  {
    path: 'instructors',
    loadComponent: () =>
      import('./instructors/instructors').then(m => m.Instructors)
  },

  { path: 'profile', component: Profile },
  { path: 'forgot-password', component: ForgotPassword },

  { path: 'checkout/:id', component: Checkout },

  {
    path: 'checkout-certification/:title',
    component: CheckoutCertif
  },

  { path: 'payment-success', component: PaymentSuccess },
  
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }  // optionnel : route 404
];
