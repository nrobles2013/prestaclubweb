import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-input-groups',
  standalone: true,
  imports: [NgbDropdownModule],
  templateUrl: './input-groups.component.html',
  styleUrls: ['./input-groups.component.css']
})
export class InputgroupsComponent {}
