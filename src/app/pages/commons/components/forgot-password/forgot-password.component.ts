import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from 'src/app/services/global/notification.service';
import { LoginService } from 'src/app/services/authentication/login.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule , ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  token: string | null = null;
  passwordVisible = false;
  confirmPasswordVisible = false;
  fechaExpiracion: string = '';
  tiempoRestante: string = '';
  minutos: string = '00';
  segundos: string = '00';
  alerta: boolean = false;
  verReloj: boolean = false;
  private countdownSubscription: Subscription | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private loginService: LoginService
  ) {
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, this.validatorMayuscula(), this.validatorMinuscula(), this.validatorNumber(), this.validatorDigitos(8)]], 
    });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token'); 
    this.verificarToken();
  }

  validatorMayuscula() {
    return (control: any) => {
      const value = control.value; 
      const hasUpperCase = /[A-Z]/.test(value);

      return hasUpperCase ? null : { mayuscula: true }
    };
  }

  validatorMinuscula() {
    return (control: any) => {
      const value = control.value;   
      const hasLowerCase = /[a-z]/.test(value);

      return hasLowerCase ? null : { minuscula: true }
    };
  }

  validatorNumber() {
    return (control: any) => {
      const value = control.value;   
      const hasNumber = /\d/.test(value);

      return hasNumber ? null : { numero: true }
    };
  }

  validatorDigitos(cantidad : number) {
    return (control: any) => {
      const value = control.value;   
      const hasDigitos = value.length >= cantidad;

      return hasDigitos ? null : { digitos: true }
    };
  }
 
  onSubmit() {
    if (this.token) { 
      if(!this.resetPasswordForm.get('newPassword')?.errors) {
        this.loginService.restablecerPassword( this.resetPasswordForm.value.newPassword, this.token) 
        .subscribe({
          next: (response) => {
            // Manejar la respuesta del servidor
            if (response) {
              this.notificationService.showNotification('success', 'La contraseña ha sido restablecida');
            }
            this.router.navigate(['/authentication/login']); // Redirige al usuario o muestra un mensaje de éxitos
          },
          error: (error) => {
            // Manejar errores
            console.log(error.error.message);
            console.error('Error al restablecer la contraseña', error); 
            this.notificationService.showNotification('error', error.error.message);    
          }
        });
      }else{
        this.notificationService.showNotification('error', 'La nueva contraseña no cumple los requisitos');
      }
    }else{
      this.notificationService.showNotification('error', 'El token no es valido');
    } 
  }
 

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
  
  verificarToken() {
    if (this.token) {
      this.loginService.verificarToken(this.token).subscribe(
        (response) => {
          if (!response['valid']) { 
            this.retornarHome('error', response['mensaje']);
          }else
          {
            this.fechaExpiracion = response['expiracion'];
            this.iniciarCuentaRegresiva();
          }
        },
        (error) => {
          this.notificationService.showNotification('error', error['message']);
        }
      );
    }
  }

  iniciarCuentaRegresiva() {
    const expirationDate = new Date(this.fechaExpiracion).getTime();

    this.countdownSubscription = interval(1000).subscribe(() => {
      const now = new Date().getTime(); 
      const distance = expirationDate - now;

      if (distance < 0) {
        this.retornarHome('error', 'El token ha expirado');
        this.detenerCuentaRegresiva(); 
        return;
      }
 
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      this.minutos = this.padZero(minutes);
      this.segundos = this.padZero(seconds);
      this.alerta = distance <= 10000;
      this.verReloj = true;
    });
  }

  retornarHome( tipoMensaje : string , mensaje : string) {
    this.detenerCuentaRegresiva();
    this.router.navigate(['/home']);
    this.notificationService.showNotification(tipoMensaje, mensaje);
  }

  detenerCuentaRegresiva() {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
      this.countdownSubscription = null;
    }
  }

  padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}
