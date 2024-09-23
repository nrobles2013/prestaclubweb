import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotifierModule } from 'angular-notifier';
import { NotifierComponent } from "./component/notifier/notifier.component";
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { UserStore } from './store/user.store';
import { TipoCambioStore } from './store/tipo-cambio.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NotifierComponent, NotifierModule, SpinnerComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  readonly userStore = inject(UserStore);
  readonly tipoCambioStore = inject(TipoCambioStore);

  title = 'Monster Angular Admin Template';

  ngOnInit() {
    this.userStore.GET_USER_ACTIVE(0);
    this.tipoCambioStore.GET_TIPO_CAMBIO(0);
  }
}
