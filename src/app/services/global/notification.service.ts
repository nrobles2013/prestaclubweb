import { Injectable, ApplicationRef, Injector, ComponentRef, createComponent } from '@angular/core';
import{ NotifierComponent } from "../../component/notifier/notifier.component";

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notifierComponentRef: ComponentRef<NotifierComponent> | null = null;

  constructor(private appRef: ApplicationRef, private injector: Injector) {}

  public showNotification(type: string, message: string): void {
    if (!this.notifierComponentRef) {
      this.notifierComponentRef = createComponent(NotifierComponent, {
        environmentInjector: this.appRef.injector,
      });

      this.appRef.attachView(this.notifierComponentRef.hostView);
      const domElem = (this.notifierComponentRef.hostView as any).rootNodes[0] as HTMLElement;
      document.body.appendChild(domElem);
    }

    this.notifierComponentRef.instance.showNotification(type, message);
  }

  public hideNotifications(): void {
    if (this.notifierComponentRef) {
      this.notifierComponentRef.instance.hideAllNotifications();
    }
  }
}
