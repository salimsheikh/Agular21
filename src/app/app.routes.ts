import { Routes } from '@angular/router';
import { Login } from './core/features/auth/login/login';
import { AdminLayout } from './core/shared/layouts/admin-layout/admin-layout';
import { Dashboard } from './core/features/dashboard/dashboard';
import { Locations } from './core/features/locations/locations/locations';
import { Photos } from './core/features/photos/photos/photos';
import { Users } from './core/features/users/users/users';
import { Prices } from './core/features/prices/prices/prices';
import { Unauthorized } from './core/error-pages/unauthorized/unauthorized';
import { Forbidden } from './core/error-pages/forbidden/forbidden';
import { ServerError } from './core/error-pages/server-error/server-error';
import { ServerDown } from './core/error-pages/server-down/server-down';
import { NotFound } from './core/error-pages/not-found/not-found';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [

  // Auth
  {
    path: 'login',
    component: Login
  },

  // Admin layout
  {
    path: '',
    canActivate: [authGuard],
    component: AdminLayout,
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'locations', component: Locations },
      { path: 'photos', component: Photos },
      { path: 'users', component: Users },
      { path: 'prices', component: Prices },
      // default admin route
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // Not found
  { path: '401', component: Unauthorized },
  { path: '403', component: Forbidden },
  { path: '500', component: ServerError },
  { path: 'server-down', component: ServerDown },
  { path: '**', component: NotFound }
];

