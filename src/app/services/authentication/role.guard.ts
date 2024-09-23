import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);  
  const router = inject(Router);
  if(route.data['permittedRoles'].includes(loginService.getUserRole())){
    return true;
  }else{
    return router.createUrlTree(['/undefined']);
  }
};
