import { Component, Input, OnInit } from '@angular/core';
import {  RouterLink , RouterOutlet,Router, ActivatedRoute, NavigationEnd } from '@angular/router'; 
import { NgClass,NgFor } from '@angular/common';
import { filter } from 'rxjs';
import { ROUTES } from './cronograma-items';
import { ModalAddCronogramaComponent } from './modals/modal-add-cronograma/modal-add-cronograma.component';
import { ModalCalculateComponent } from './modals/modal-calculate/modal-calculate.component';
import { PrevisualizarCronogramaComponent } from './components/previsualizar-cronograma/previsualizar-cronograma.component';
import { BusquedaOperDocComponent } from 'src/app/component/commons/busqueda-oper-doc/busqueda-oper-doc.component';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule } from '@angular/forms';
import { SoloNumerosDirective } from 'src/app/directives/solo-numeros.directive';
import { CronogramaService } from './services/cronograma.service';
import { NotificationService } from 'src/app/services/global/notification.service';
import { trigger, style, transition, animate } from '@angular/animations';
import { TableComponent } from 'src/app/component/table/table.component';

@Component({
  selector: 'app-cronograma',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    NgClass,
    NgFor,
    ModalCalculateComponent,
    PrevisualizarCronogramaComponent,
    BusquedaOperDocComponent,
    NgIf,
    ModalAddCronogramaComponent, 
    FormsModule,
    TableComponent,
    SoloNumerosDirective,
    CommonModule
  ],
  templateUrl: './cronograma.component.html',
  styleUrl: './cronograma.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class CronogramaComponent implements OnInit { 
  @Input() id: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() control: FormControl = new FormControl();
  modalVisible: boolean = false;
  tipoBusqueda: string = 'documento';
  tipoDocumento: string = '1';
  numeroDocumento: string = ''; 
  dataCronograma = [];
  listaOperaciones = [];
  operacion: Object = {};
  verSeccionOperacion: boolean = false;
  tableFields = [
    { key: 'id', name: 'Id'},
    { key: 'numOperacion', name: 'N° Operacion'},
    { key: 'nroFirmantes', name: 'N° Firmantes'}
  ];
  listaLiquidacionCostosTransaccion = [];
  pageSize = 2;
  totalItems = 0;
  currentPage = 1;
  cargando = false;
  private _numeroOperacionSeleccionado: string = '';
  constructor( 
    private cronogramaService: CronogramaService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {   

  } 

  //Getters y Setters

  get numeroOperacionSeleccionado(): string {
    return this._numeroOperacionSeleccionado;
  }

  set numeroOperacionSeleccionado(value: string) { 
    this._numeroOperacionSeleccionado = value;
    this.onNumeroOperacionSeleccionadoChange(value); 
    this.getListaLiquidacionCostosTransaccion();
  }

  limpiar() {
    this.numeroDocumento = '';
    this.verSeccionOperacion = false;
    this.listaOperaciones = [];
  }
  

  //Funciones


  onNumeroOperacionSeleccionadoChange(value: string) { 
    this.operacion = this.listaOperaciones.find(item => item.id == value);
  } 

  buscar() {
    // verificar que no este vacío
    if(this.numeroDocumento == '') {
      return;
    }

    const busqueda = {
      tipoBusqueda: this.tipoBusqueda,
    }

    if(this.tipoBusqueda == 'documento') {
      busqueda['numeroDocumento'] = this.numeroDocumento;
      busqueda['tipoDocumento'] = this.tipoDocumento;
    }

    if(this.tipoBusqueda == 'operacion') {
      const num = Number(this.numeroDocumento);
      busqueda['numeroOperacion'] = num;
    } 

    this.cronogramaService.getOperacionesByDocument(busqueda).subscribe(
      (response: any) => {
        this.verSeccionOperacion = false;
        if(response.length > 0) {
          this.listaOperaciones = response;
          this.numeroOperacionSeleccionado = response[0].id;
          this.verSeccionOperacion = true;
        }else{
          this.verSeccionOperacion = false;
          this.listaOperaciones = [];
          this.notificationService.showNotification('error', 'No se encontraron resultados');
        }
        
      },
      (error) => {
        console.log(error);
      }
    )
  } 
  agregarSimulacion() {
    this.modalVisible = true;
  }



  //Funciones para el modal
  closeModal() {
    this.modalVisible = false;  
  } 

  handleDataFromModal(data: any) {
    if(data.generar){
      this.dataCronograma.push({
      
      });
    }  
  }


  getListaLiquidacionCostosTransaccion(ctx = null) { 
    if(!this.operacion['numero_operacion']) {
      return null;
    }
    const r = {
      numOperacion: this.operacion['numero_operacion'],
      pageSize: ctx? ctx.pageSize : this.pageSize,
      pageNumber: ctx? ctx.pageNumber : 1
    }
    this.cargando = true;
    this.cronogramaService.getLiquidacionCostosTransaccion(r)
    .subscribe((resp: any) => {
      if(resp){
        this.listaLiquidacionCostosTransaccion = resp.data;
        this.totalItems = resp.total;
        this.pageSize = resp.pageSize;
        this.currentPage = resp.pageNumber;
      }else{
        this.listaLiquidacionCostosTransaccion = [];
        this.totalItems = 0;
      }

    }),
    (error) => {
      console.log(error);
      this.listaLiquidacionCostosTransaccion = [];
    }

    this.cargando = false;
  }
 



  tableItems = [
    { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
    { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com' },
    { firstName: 'James', lastName: 'Brown', email: 'james.brown@example.com' }
  ];
}
