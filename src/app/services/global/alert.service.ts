import { Injectable } from "@angular/core";
import Swal from "sweetalert2";
@Injectable(
    {providedIn: 'root'}
)
export class AlertService {

    public verAlertaConfirmacion() {

        return Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Estás seguro de realizar esta acción?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, continuar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33'
          }).then((result) => {
            return result.isConfirmed ? true : false;
          });
    }

}