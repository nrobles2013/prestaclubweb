import { Component } from '@angular/core';
import { NgScrollbarModule } from 'ngx-scrollbar';

@Component({
  selector: 'app-recent-comment',
  standalone: true,
  imports: [NgScrollbarModule],
  templateUrl: './recent-comment.component.html',
})
export class RecentcommentComponent {
  constructor() { }

  recentcomments: any[] = [
    {
      image: 'assets/images/users/user1.jpg',
      name: 'James Anderson',
      comment:
        'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
      date: 'April 14, 2024',
      status: 'Pending',
      labelcolor: 'bg-info-subtle text-info',
    },
    {
      image: 'assets/images/users/user2.jpg',
      name: 'Michael Jorden',
      comment:
        'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
      date: 'April 14, 2024',
      status: 'Approved',
      labelcolor: 'bg-success-subtle text-success',
    },
    {
      image: 'assets/images/users/user4.jpg',
      name: 'Johnathan Doeting',
      comment:
        'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
      date: 'April 14, 2024',
      status: 'Rejected',
      labelcolor: 'bg-danger-subtle text-danger',
    },
    {
      image: 'assets/images/users/user1.jpg',
      name: 'James Anderson',
      comment:
        'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
      date: 'April 14, 2024',
      status: 'Pending',
      labelcolor: 'bg-info-subtle text-info',
    },
  ];
}
