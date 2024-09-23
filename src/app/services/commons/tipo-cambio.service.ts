import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TipoCambioService {

  private baseUrl = environment.apiUrl; 

  constructor(private http: HttpClient) { }
  
  public getTipoCambio() {
    return  this.http.get<any>(`${this.baseUrl}/nuevo/tipo-cambio`);
  }
}

