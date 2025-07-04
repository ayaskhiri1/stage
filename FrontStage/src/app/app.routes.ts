import { Routes } from '@angular/router'; 
import { Admin } from './admin/admin';
import { Forbidden } from './forbidden/forbidden';
import { Home } from './home/home';
import { Login } from './login/login';
import { User } from './user/user';
import { authGuard, adminGuard } from './_auth/auth.service'; 


export const routes: Routes = [
  { path: 'home', component: Home }, 
  { path: 'admin', component: Admin, canActivate: [adminGuard] }, 
  { path: 'user', component: User, canActivate: [authGuard] }, 
  { path: 'login', component: Login },
  { path: 'forbidden', component: Forbidden },
  { path: '', redirectTo: '/home', pathMatch: 'full' } 
];