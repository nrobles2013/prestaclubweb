import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import { FormsModule } from '@angular/forms';
import { NotificationService } from 'src/app/services/global/notification.service';
import { LoginService } from 'src/app/services/authentication/login.service';
import { SpinnerService } from "src/app/services/global/spinner.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, FeatherModule, FormsModule],
})
export class LoginComponent implements OnInit { 

  loginform = true;
  recoverform = false; 
  emailEnviado = false;
  passwordVisible = false;

  loginData = {
    "username": "",
    "password": "",
  };

  recoverData = {
    "email": "",
  };

  constructor(
    private notificationService: NotificationService,
    private loginService: LoginService,
    private spinnerService: SpinnerService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.loginService.logout();
  }

  ngOnInit(): void {}
  showRecoverForm() {
    this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
    this.recoverData.email = '';
    this.emailEnviado = false;
  }

  formSubmit() {  
    if((this.loginData.username == "" || this.loginData.username == null) && (this.loginData.password == "" || this.loginData.password == null)){
      this.notificationService.showNotification('error', 'Falta rellenar el campo usuario y el campo contraseña');
    }else
    if (this.loginData.username == "" || this.loginData.username == null) {
      this.notificationService.showNotification('error', 'Falta rellenar el campo usuario');
    } else 
    if (this.loginData.password == "" || this.loginData.password == null) {
      this.notificationService.showNotification('error', 'Falta rellenar el campo contraseña');
    } 
    
    this.loginService.generateToken(this.loginData).subscribe( 
      (response: any) => { 
        this.spinnerService.show();
        if (response.token) { 
          this.loginService.loginUser(response.token);
          this.loginService.getCurrentUser().subscribe((user: any) => {
            if(user.active){
              this.loginService.setUser(user);
              if(user.email == null){
                //window.location.href = '/profile';
                this.router.navigate(['profile']);
                this.loginService.loginStatusSubject.next(true);
              }else{
                //window.location.href = '/home';
                this.router.navigate(['reporte']);
                this.loginService.loginStatusSubject.next(true);
              } 

            }else{
              this.loginService.logout();
              this.notificationService.showNotification('error', 'Usuario inactivo');
            } 
            
          })
        }
        this.spinnerService.hide();
      },
      (error) => {
        this.spinnerService.hide();
        console.log(error);
        this.notificationService.showNotification('error','Credenciales incorrectas');
      }
      
    );
  }


  formSubmitResetPassword() {
    //verificar si el correo es correcto
    if (this.recoverData.email == "" || this.recoverData.email == null) {
      this.notificationService.showNotification('error', 'Falta rellenar el campo correo');
    } else {
      //verificar si el correo es correcto su formato
      if(this.recoverData.email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
        this.loginService.resetPassword(this.recoverData).subscribe(
          (response: any) => {
            if (response) {
              this.notificationService.showNotification('success', 'Se ha enviado un correo para restablecer la contraseña');
              this.emailEnviado = true;
            }
          },
          (error) => {
            this.notificationService.showNotification('error', error.error.message);
          }
        );
      }else{
        this.notificationService.showNotification('error', 'Formato de correo incorrecto');
      }    
    }
 
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
 
}
