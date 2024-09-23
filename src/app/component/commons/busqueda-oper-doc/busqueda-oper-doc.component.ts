import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-busqueda-oper-doc',
  standalone: true,
  imports: [CommonModule, NgbModule, NgbPopoverModule, FormsModule],
  templateUrl: './busqueda-oper-doc.component.html',
  styleUrl: './busqueda-oper-doc.component.scss'
})
export class BusquedaOperDocComponent {
  @Output() resultadoBusqueda = new EventEmitter<{ tipo: string, valor: string }>();

  busquedaForm: FormGroup;
  esBusquedaPorOperacion = true;
  viewClientOperacion = false;
  viewClientDocument = false;

  nroOperacion = '';
  tipoDoc = 'dni';
  numeroDoc = '';

  constructor() {
 
  }

  cambiarBusqueda() {
    this.esBusquedaPorOperacion = !this.esBusquedaPorOperacion;
  }

  buscarDocumento() {
    if(this.numeroDoc === '') {
      return;
    }
    this.viewClientDocument = true; 
  }

  buscarOperacion() { 
    if(this.nroOperacion === '') {
      return;
    }
    this.viewClientOperacion = true;
    this.resultadoBusqueda.emit({ tipo: this.esBusquedaPorOperacion ? 'operacion' : 'documento', valor: this.nroOperacion });
  }
}
