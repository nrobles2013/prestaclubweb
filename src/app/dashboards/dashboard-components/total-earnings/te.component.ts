import { Component } from '@angular/core';
@Component({
  selector: 'app-te',
  standalone: true,
  templateUrl: './te.component.html',
})
export class TotalEarningComponent {
  constructor() {}

  totalearnings: any[] = [
    {
      image: 'assets/images/users/user1.jpg',
      name: 'Andrew Simon',
      labelcolor: 'bg-info-subtle text-info',
      amount: '$2600',
    },
    {
      image: 'assets/images/users/user2.jpg',
      name: 'Daniel Kristeen',
      labelcolor: 'bg-success-subtle text-success',
      amount: '$2300',
    },
    {
      image: 'assets/images/users/user3.jpg',
      name: 'Dany John',
      labelcolor: 'bg-danger-subtle text-danger',
      amount: '$1200',
    },
    {
      image: 'assets/images/users/user4.jpg',
      name: 'Chris gyle',
      labelcolor: 'bg-warning-subtle text-warning',
      amount: '$4400',
    },
    {
      image: 'assets/images/users/user1.jpg',
      name: 'Jane Doe',
      labelcolor: 'bg-danger-subtle text-danger',
      amount: '$2500',
    },
  ];
}
