import { CommonModule } from '@angular/common'; 
import { Component, EventEmitter, inject, OnInit, Output, TemplateRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbAccordionModule, NgbCarouselModule, NgbDatepickerModule, NgbDropdownModule, NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { FeatherModule } from 'angular-feather';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ProfileComponent } from 'src/app/component/profile/profile.component';
import { options } from 'src/app/config';
import { LoginService } from 'src/app/services/authentication/login.service';
import { TipoCambio, TipoCambioStore } from 'src/app/store/tipo-cambio.store';

declare var $: any;

@Component({
  selector: 'app-vertical-navigation',
  standalone: true,
  imports: [
    NgbDropdownModule,
    CommonModule,
    FeatherModule,
    NgbAccordionModule,
    NgbCarouselModule,
    NgbDatepickerModule,
    NgScrollbarModule, RouterModule,
    ProfileComponent
  ],
  templateUrl: './vertical-navigation.component.html',
  styleUrl: './vertical-navigation.component.scss'
})
export class VerticalNavigationComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  readonly store = inject(TipoCambioStore);
  public tipoCambio: TipoCambio[] = [];
  themeOptions = options;

  openEnd(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { position: 'end' });
	}

  private offcanvasService = inject(NgbOffcanvas);
	closeResult = '';

  public showSearch = false;

  items = ['Apps'];

  // This is for Notifications
  notifications: any[] = [
    {
      btn: 'danger',
      icon: 'grid',
      title: 'Luanch Admin',
      subject: 'Just see the my new admin!',
      time: '9:30 AM',
    },
    {
      btn: 'primary',
      icon: 'calendar',
      title: 'Event today',
      subject: 'Just a reminder that you have event',
      time: '9:15 AM',
    },
    {
      btn: 'secondary',
      icon: 'settings',
      title: 'Settings',
      subject: 'You can customize this template as you want',
      time: '9:30 AM',
    },
    {
      btn: 'warning',
      icon: 'layout',
      title: 'Launch Admin',
      subject: 'Just see the my new admin!',
      time: '9:30 AM',
    },
    {
      btn: 'primary',
      icon: 'clock',
      title: 'Event today',
      subject: 'Just a reminder that you have event',
      time: '8:15 AM',
    },
  ];

  // This is for Mymessages
  mymessages: any[] = [
    {
      useravatar: 'assets/images/users/user3.jpg',
      status: 'online',
      from: 'Mathew Anderson',
      subject: 'Just see the my admin!',
      time: '9:30 AM',
    },
    {
      useravatar: 'assets/images/users/user2.jpg',
      status: 'busy',
      from: 'Bianca Anderson',
      subject: 'Just a reminder that you have event',
      time: '9:10 AM',
    },
    {
      useravatar: 'assets/images/users/user4.jpg',
      status: 'away',
      from: 'Andrew Johnson',
      subject: 'You can customize this template as you want',
      time: '9:08 AM',
    },
    {
      useravatar: 'assets/images/users/user5.jpg',
      status: 'offline',
      from: 'Mark Strokes',
      subject: 'Just see the my admin!',
      time: '9:00 AM',
    },
    {
      useravatar: 'assets/images/users/user3.jpg',
      status: 'online',
      from: 'Mathew Anderson',
      subject: 'Just see the my admin!',
      time: '9:30 AM',
    },
    {
      useravatar: 'assets/images/users/user2.jpg',
      status: 'busy',
      from: 'Bianca Anderson',
      subject: 'Just a reminder that you have event',
      time: '9:10 AM',
    },
    {
      useravatar: 'assets/images/users/user4.jpg',
      status: 'away',
      from: 'Andrew Johnson',
      subject: 'You can customize this template as you want',
      time: '9:08 AM',
    },
    {
      useravatar: 'assets/images/users/user5.jpg',
      status: 'offline',
      from: 'Mark Strokes',
      subject: 'Just see the my admin!',
      time: '9:00 AM',
    },
  ];

  appLinks: any[] = [
    {
      icon: 'message-square',
      title: 'Chat Application',
      subtext: 'New messages arrived',
      path: "/apps/chat",
      color: 'primary'
    },
    {
      icon: 'file-text',
      title: 'Invoice App',
      subtext: 'Get latest invoice',
      path: "/apps/invoice",
      color: 'secondary'
    },
    {
      icon: 'phone',
      title: 'Contact Application',
      subtext: '2 Unsaved Contacts',
      path: "/apps/contact",
      color: 'warning'
    },
    {
      icon: 'mail',
      title: 'Email Application',
      subtext: 'Get new emails',
      path: "/apps/mail/inbox",
      color: 'danger'
    },
    {
      icon: 'user',
      title: 'User Profile',
      subtext: 'learn more information',
      path: "/apps/users",
      color: 'success'
    },
    {
      icon: 'calendar',
      title: 'Calendar App',
      subtext: 'Get dates',
      path: "/apps/fullcalendar",
      color: 'primary'
    },
    {
      icon: 'phone',
      title: 'Contact List Table',
      subtext: 'Add new contact',
      path: "/apps/contact-list",
      color: 'secondary'
    },
    {
      icon: 'edit',
      title: 'Notes Application',
      subtext: 'To-do and Daily tasks',
      path: "/apps/notes",
      color: 'warning'
    }
  ] 
 

  constructor(
    private modalService: NgbModal, 
    private loginService: LoginService,
  ) {
 
  }

ngOnInit(): void { 
}
 
  get tipoCambioStore() {
    let tc : TipoCambio = this.store.tipoCambio();
    return tc;
  }

  logout() {
    this.loginService.logout();
    window.location.reload();
  }
}
