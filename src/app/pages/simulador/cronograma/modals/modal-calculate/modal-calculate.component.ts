import { Component, Input, Output, EventEmitter, } from '@angular/core';
import { NgStyle } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { LiquidacionFormularioComponent } from '../../components/liquidacion-formulario/liquidacion-formulario.component';

@Component({
  selector: 'app-modal-calculate',
  standalone: true,
  imports: [ NgStyle, NgScrollbarModule, LiquidacionFormularioComponent],
  templateUrl: './modal-calculate.component.html',
  styleUrl: './modal-calculate.component.scss'
})
export class ModalCalculateComponent {
  @Input() tipo: string = '';
  @Input() modalVisible: boolean = false;   
  @Output() result: EventEmitter<any> = new EventEmitter<any>();
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
 

  constructor() { }

  ngOnInit(): void {
  }
 

  closeModal() {
    this.close.emit();
  }

  submit() {
    // Retornar un JSON al componente padre
    const result = { tipo: this.tipo, data: 'some data', generar:true };
    this.result.emit(result);
    this.closeModal();
  }
}
