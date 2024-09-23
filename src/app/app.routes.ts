import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component'; 
import { authGuard } from './services/authentication/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { ForgotPasswordComponent } from './pages/commons/components/forgot-password/forgot-password.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

export const routes: Routes = [

  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'simulador',
        loadChildren: () =>
          import('./pages/simulador/simulador.routes').then(
            (m) => m.SimuladorRoutes
          ), 
        
      }, 
      {
        path: 'perfil',
        component: PerfilComponent,
      },
      {
        path: 'home',
        component: HomeComponent, 
      },
      
    ],
    canActivate: [authGuard],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
      },
      {
        path: 'reset-password',
        component: ForgotPasswordComponent
      },
    ],
  }, 
  {
    path: '**',
    redirectTo: 'home', 
  },
];
