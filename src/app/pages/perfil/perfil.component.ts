import { Component, inject } from '@angular/core';
import { UserStore } from 'src/app/store/user.store';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { interval, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/global/notification.service';
import { LoginService } from 'src/app/services/authentication/login.service';
@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
   ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent {
  user: any;
  selectedTab: string = 'info';  
  newPassword: string = ''; 
  oldPassword: string = '';
  resetPasswordForm: FormGroup; 
  passwordVisible = false;
  newPasswordVisible = false; 
  readonly store = inject(UserStore);

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
      oldPassword: ['', [Validators.required, this.validatorDigitos(8)]]
    });
  }

  ngOnInit(): void {
    this.user = this.store.users();
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
      if(!this.resetPasswordForm.get('newPassword')?.errors) {
      }else{
        this.notificationService.showNotification('error', 'La nueva contraseña no cumple los requisitos');
      } 
  }
 

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
  

  toggleNewPasswordVisibility() {
    this.newPasswordVisible = !this.newPasswordVisible;
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
 
}
