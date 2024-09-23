import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CronogramaService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getOperacionesByDocument(busqueda:any) {
    return this.http.post(`${this.baseUrl}/antiguo/operaciones/documento`, busqueda);
  }

  public getLiquidacionCostosTransaccionUltimoPrevio(busqueda:any) {
    return this.http.post(`${this.baseUrl}/nuevo/liquidacion-costos-transaccion/ultimo-previo`, busqueda);
  }

  public guardarLiquidacionCostosTransaccion(liquidacionCostosTransaccion:any) {
    return this.http.post(`${this.baseUrl}/nuevo/liquidacion-costos-transaccion/grabar-liquidacion`, liquidacionCostosTransaccion);
  }

  public getLiquidacionCostosTransaccion(busqueda:any) {
    return this.http.post(`${this.baseUrl}/nuevo/liquidacion-costos-transaccion/lista`, busqueda);
  }

}
