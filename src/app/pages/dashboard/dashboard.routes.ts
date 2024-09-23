import { Routes } from '@angular/router'; 
import { CeoDashboardComponent } from './ceo-dashboard/ceo-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { roleGuard } from 'src/app/services/authentication/role.guard';
import { RedirectComponent } from '../commons/components/redirect/redirect.component';
export const DashboardRoutes: Routes = [
  {
    path: '', 
    children: [
      {
        path: 'ceo',
        component: CeoDashboardComponent,
        data: {
          title: 'Dashboard', 
          permittedRoles: ["CEO"],
        },
        canActivate: [roleGuard]
      }, 
      {
        path: 'user',
        component: UserDashboardComponent,
        data: {
          title: 'Dashboard', 
          permittedRoles: [2]
        },
        canActivate: [roleGuard]
      }
    ]
  }
];
