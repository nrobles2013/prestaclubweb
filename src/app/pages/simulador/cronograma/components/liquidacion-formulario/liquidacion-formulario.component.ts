import { Component, Input } from '@angular/core';
import { NgIf,NgClass } from '@angular/common';

@Component({
  selector: 'app-liquidacion-formulario',
  standalone: true,
  imports: [NgIf,NgClass],
  templateUrl: './liquidacion-formulario.component.html',
  styleUrl: './liquidacion-formulario.component.scss'
})
export class LiquidacionFormularioComponent {
@Input() usingModal: boolean = false;
}
