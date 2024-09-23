import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals'; 
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TipoCambioService } from '../services/commons/tipo-cambio.service';
export interface TipoCambio{
    id: number;
    monedaBase: string;
    monedaDestino: string;
    tipoCambio: number;
    fecha: string;
}

interface TipoCambioState{
    tipoCambio: TipoCambio;
    state: 'Loaded' | 'Loading' | 'Error';
}

const initialState: TipoCambioState = {
    tipoCambio: {} as TipoCambio,
    state: 'Loading',
}
 
export const TipoCambioStore = signalStore(
{providedIn: 'root'},
withState(initialState),
withComputed(({ tipoCambio }) => ({
    tipoCambioList: computed(() => tipoCambio()),
})),
withMethods((store, tipoCambioService = inject(TipoCambioService)) => ({
    GET_TIPO_CAMBIO: rxMethod(
        pipe(
            tap(() => patchState(store, { state: 'Loading' })),
            switchMap(() => {
                return tipoCambioService.getTipoCambio().pipe(
                    tap((tipoCambio) => {
                        patchState(store, { tipoCambio: tipoCambio, state: 'Loaded' });
                    })
                );
            })
        )
    ),
}))
);