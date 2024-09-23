 
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FeatherModule } from 'angular-feather';
import { LoginService } from 'src/app/services/authentication/login.service';
import { AlertService } from 'src/app/services/global/alert.service';
import { NotificationService } from 'src/app/services/global/notification.service';
import { User, UserStore } from 'src/app/store/user.store';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ 
    NgbDropdownModule, 
    FeatherModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  readonly store = inject(UserStore);
  private _alertService = inject(AlertService);

  public userData = this.loginService.getUser();
  selectedTab: string = 'info';  
  newPassword: string = ''; 
  oldPassword: string = '';
  resetPasswordForm: FormGroup; 
  passwordVisible = false;
  newPasswordVisible = false;  
  user: any;

  constructor(
    private loginService: LoginService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
  ) { 
    this.resetPasswordForm = this.fb.group({
      oldPassword: ['', [Validators.required, this.validatorDigitos(8)]]
    });
   } 

  
  ngOnInit(): void {
    //this.user = this.store.users(); 
  }
  logout() {
    this.router.navigate(['/authentication/login']);
    
    window.location.reload();
  }

  modalOpenVC(modalCenter: any) {
    this.modalService.open(modalCenter, {
      centered: true,
    });
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
 
  async onSubmit(modal : any) {
    const confrm = await this._alertService.verAlertaConfirmacion();
    if(!confrm){
      return
    } 

    if(this.resetPasswordForm.get('newPassword')?.errors) {
      this.notificationService.showNotification('error', 'La nueva contraseña no cumple los requisitos');
    } 

    const r = {
      oldPassword: this.resetPasswordForm.value.oldPassword,
      newPassword: this.resetPasswordForm.value.newPassword,
      username: this.store.users()['username'],
    }

    this.loginService.changePassword(r) 
    .subscribe({
      next: (response) => {
        if (response) {
          this.notificationService.showNotification('success', 'La contraseña ha sido restablecida');
        }
      },
      error: (error) => {
        console.log(error.error.message);
        console.error('Error al restablecer la contraseña', error); 
        this.notificationService.showNotification('error', error.error.message);    
      }
    }); 
  }
 

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
  

  toggleNewPasswordVisibility() {
    this.newPasswordVisible = !this.newPasswordVisible;
  }

  get userStore() {
    let user : User; 
    user = this.store.users();
    return user;
  }

}
