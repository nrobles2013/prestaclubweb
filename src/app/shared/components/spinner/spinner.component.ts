import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/services/global/spinner.service';
import { NgIf } from '@angular/common'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [NgIf,CommonModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent implements OnInit {
  isLoading$ = this.spinnerService.isLoading$;
  constructor(private spinnerService: SpinnerService) { }
  
  ngOnInit(): void { }
}
