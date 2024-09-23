import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiquidacionFormularioComponent } from '../liquidacion-formulario/liquidacion-formulario.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-previsualizar-cronograma',
  standalone: true,
  imports: [LiquidacionFormularioComponent,CommonModule,NgScrollbarModule,NgbDropdownModule],
  templateUrl: './previsualizar-cronograma.component.html',
  styleUrl: './previsualizar-cronograma.component.scss'
})
export class PrevisualizarCronogramaComponent {
  @Input() fechaDesembolso: Date;
  selectedTab: string = 'liquidacion'; 
  fechaGeneracion: Date = new Date();

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
}
