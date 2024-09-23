import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/authentication/login.service';

@Component({
  selector: 'app-redirect',
  standalone: true,
  imports: [],
  templateUrl: './redirect.component.html',
  styleUrl: './redirect.component.scss'
})
export class RedirectComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.redirectBasedOnRole();
  }

  private redirectBasedOnRole() {
    const isLoggednIn = this.loginService.isLoggednIn(); // Comprueba si el usuario está autenticado
    if(!isLoggednIn) {
      this.router.navigate(['/authentication/login']);
    }else{
      const userRole = this.loginService.getUserRole(); // Obtén el rol del usuario

      if (userRole === 'CEO') {
        this.router.navigate(['/dashboard/ceo']);
      } else if (userRole === 'user') {
        this.router.navigate(['/dashboard/user']);
      } else {
        this.router.navigate(['/']);
      }
    } 
  }

}
