import { Component, Input } from '@angular/core';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { BusquedaOperDocComponent } from 'src/app/component/commons/busqueda-oper-doc/busqueda-oper-doc.component';
import { ModalCalculateComponent } from '../../modals/modal-calculate/modal-calculate.component';
import { PrevisualizarCronogramaComponent } from '../previsualizar-cronograma/previsualizar-cronograma.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Operacion } from 'src/app/models/operacion.model';
import { LiquidacionCostosTransaccion } from 'src/app/models/liquidacion-costos-transaccion.model';
import { CronogramaService } from '../../services/cronograma.service';
import { SoloNumerosDirective } from 'src/app/directives/solo-numeros.directive';



@Component({
  selector: 'app-cronograma-formulario',
  standalone: true,
  imports: [ 
    BusquedaOperDocComponent,
    ModalCalculateComponent,
    PrevisualizarCronogramaComponent,
    NgIf, 
    NgFor,
    FormsModule,
    CommonModule,
    NgbModule,
    SoloNumerosDirective
  ],
  templateUrl: './cronograma-formulario.component.html',
  styleUrl: './cronograma-formulario.component.scss'
})
export class CronogramaFormularioComponent { 
  @Input() numOperacion: string = '';
  
  currentStep: number = 1;
  operacion: Operacion = {} as Operacion;
  liquidacionCostosTransaccion: LiquidacionCostosTransaccion = {} as LiquidacionCostosTransaccion;
  viewNroFirmantes: boolean = false;
  opcionPeriodoPagoMeses: number[] = Array.from({ length: 36 }, (_, i) => i + 1);

  constructor(
    private cronogramaService : CronogramaService, 
  ) {

   }

  async ngOnInit() {  
   await this.getLiquidacionCostosTransaccionUltimoPrevio();
  }

  nextStep() { 
      this.currentStep = 2; 
  }

  prevStep() {
    this.currentStep = 1;
  }

  finishStepper() {
    console.log('Stepper completado');
  }

  // Nuevo método para regresar a un paso
  goToStep(step: number) {
    if (step === 1 && this.currentStep === 2) {
      this.currentStep = 1;
    }
  }

  getLiquidacionCostosTransaccionUltimoPrevio(){
    const r = {
      numOperacion: this.numOperacion
    }
    this.cronogramaService.getLiquidacionCostosTransaccionUltimoPrevio(r)
    .subscribe((resp: any) => {
      if(resp.operacion){
        this.operacion = resp.operacion;
      }
      if(resp.liquidacionCostosTransaccion){
        this.liquidacionCostosTransaccion = resp.liquidacionCostosTransaccion;
      }else{
        // inicializar valors 
        this.liquidacionCostosTransaccion.certificado_registral_inmobiliario = 100;
      }

    })
  }

 guardarLiquidacion(){
  const r = {
    numOperacion: this.numOperacion,
    nroFirmantes: this.liquidacionCostosTransaccion.nro_firmantes
  }
  this.cronogramaService.guardarLiquidacionCostosTransaccion(r)
  .subscribe((resp: any) => {
    console.log(resp);
  })
 }

//getter and setter

get criBloqueoPeritaje(): number{
  const cri = (Number) (this.liquidacionCostosTransaccion.certificado_registral_inmobiliario ?? 0);
  const bloqueo =(Number) (this.liquidacionCostosTransaccion.bloqueo_registral ?? 0);
  const peritaje = (Number) ( this.liquidacionCostosTransaccion.peritaje ?? 0);
  const inspeccion = (Number) ( this.liquidacionCostosTransaccion.costo_inspeccion ?? 0);
  return cri + bloqueo + peritaje + inspeccion; 
}

get pagosDescontadosCheque(): number{
  const derechoNotariales = (Number) (this.liquidacionCostosTransaccion.derechos_notariales ?? 0); 
  const derechoRegistrales = (Number) (this.liquidacionCostosTransaccion.derechos_registrales ?? 0);
  const asesoriaClub = (Number) (this.liquidacionCostosTransaccion.asesoria_prestaclub ?? 0);
  return derechoNotariales + derechoRegistrales + asesoriaClub;
}

get costosAdicionales(): number{
  const registralesLevantamiento = (Number) (this.liquidacionCostosTransaccion.registrales_levantamiento ?? 0);
  const tomaFirmasBiometrico = (Number) (this.liquidacionCostosTransaccion.toma_firmas_biometrico ?? 0);
  const otorgamientoPoder = (Number) (this.liquidacionCostosTransaccion.otorgamiento_poder ?? 0);
  const chequeGerenciaExtra = (Number) (this.liquidacionCostosTransaccion.cheque_gerencia_extra ?? 0);
  return registralesLevantamiento + tomaFirmasBiometrico + otorgamientoPoder + chequeGerenciaExtra;
}

get tct(): number{
  return this.criBloqueoPeritaje + this.pagosDescontadosCheque + this.costosAdicionales;
}

get totalCostosTransaccion(): number{
  const pagadoCliente = (Number) (this.liquidacionCostosTransaccion.pagado_cliente ?? 0);
  return this.tct - pagadoCliente;
}

get financiamientoTotal(): number{
  const prestamoNeto = (Number) (this.liquidacionCostosTransaccion.prestamo_neto ?? 0); 
  const montoAdeudado = (Number) (this.liquidacionCostosTransaccion.monto_adeudado ?? 0);
  return prestamoNeto + this.totalCostosTransaccion + montoAdeudado;
}

}
