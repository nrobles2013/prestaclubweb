
import { Component } from '@angular/core';

@Component({
  selector: 'app-recent-message',
  standalone: true,
  templateUrl: './recent-message.component.html',
})
export class RecentmessageComponent {
  constructor() { }

  // This is for Mymessages
  mymessages: any[] = [
    {
      useravatar: 'assets/images/users/user1.jpg',
      status: 'online',
      from: 'Pavan kumar',
      subject:
        'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
      time: '9:30 AM',
    },
    {
      useravatar: 'assets/images/users/user2.jpg',
      status: 'busy',
      from: 'Sonu Nigam',
      subject:
        'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
      time: '9:10 AM',
    },
    {
      useravatar: 'assets/images/users/user2.jpg',
      status: 'away',
      from: 'Arijit Sinh',
      subject:
        'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
      time: '9:08 AM',
    },
    {
      useravatar: 'assets/images/users/user4.jpg',
      status: 'offline',
      from: 'Pavan kumar',
      subject:
        'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
      time: '9:00 AM',
    },
    {
      useravatar: 'assets/images/users/user1.jpg',
      status: 'online',
      from: 'Pavan kumar',
      subject:
        'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
      time: '9:30 AM',
    },
    {
      useravatar: 'assets/images/users/user2.jpg',
      status: 'busy',
      from: 'Sonu Nigam',
      subject:
        'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
      time: '9:10 AM',
    },
    {
      useravatar: 'assets/images/users/user2.jpg',
      status: 'away',
      from: 'Arijit Sinh',
      subject:
        'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
      time: '9:08 AM',
    },
    {
      useravatar: 'assets/images/users/user4.jpg',
      status: 'offline',
      from: 'Pavan kumar',
      subject:
        'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
      time: '9:00 AM',
    },
    {
      useravatar: 'assets/images/users/user1.jpg',
      status: 'online',
      from: 'Pavan kumar',
      subject:
        'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
      time: '9:30 AM',
    },
  ];
}
