import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CronogramaFormularioComponent } from '../../components/cronograma-formulario/cronograma-formulario.component';
import { NgStyle } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';

@Component({
  selector: 'app-modal-add-cronograma',
  standalone: true,
  imports: [
    CronogramaFormularioComponent,
    NgStyle,
    NgScrollbarModule
  ],
  templateUrl: './modal-add-cronograma.component.html',
  styleUrl: './modal-add-cronograma.component.scss'
})
export class ModalAddCronogramaComponent { 
  @Input() numOperacion: string = '';
  @Input() modalVisible: boolean = false; 
  @Output() result: EventEmitter<any> = new EventEmitter<any>();
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  viewButton: boolean = false;
  closeModal() {
    this.close.emit();
  }

  submit() { 
    const result = { data: 'some data', generar:true };
    this.result.emit(result);
    this.closeModal();
  }
}
