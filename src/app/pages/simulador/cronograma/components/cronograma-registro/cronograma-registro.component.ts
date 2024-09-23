import { Component } from '@angular/core';

import { BusquedaOperDocComponent } from 'src/app/component/commons/busqueda-oper-doc/busqueda-oper-doc.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cronograma-registro',
  standalone: true,
  imports: [BusquedaOperDocComponent, CommonModule],
  templateUrl: './cronograma-registro.component.html',
  styleUrl: './cronograma-registro.component.scss'
})
export class CronogramaRegistroComponent {
  viewTable: boolean = false;

  manejarResultado(event: { tipo: string, valor: string }) {
    this.viewTable = true;
    console.log('Tipo de búsqueda:', event.tipo);
    console.log('Valor:', event.valor);
  }
}
