import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { LoginService } from '../services/authentication/login.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap } from 'rxjs';
import { switchMap } from 'rxjs/operators'; // Asegúrate de importar switchMap

export interface User {
    id: number;
    username: string;
    email: string;
    active: boolean;
    rol ?: string;
    empleado : Empleado;
}

export interface Empleado {
    id: number;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    updatedBy: string;
    updatedDate: Date;
    createdBy: string;
    createdDate: Date;
    deletedBy: string;
    deletedDate: Date;
}

interface UserState {
    users: User;
    state: 'Loaded' | 'Loading' | 'Error';
    filter: { query: string } | null;
}

const initialState: UserState = {
    users: {} as User,
    state: 'Loading',
    filter: null,
}

export const UserStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed(({ users }) => ({
        userList: computed(() => users()), 
    })),
    withMethods((store, loginService = inject(LoginService)) => ({
        GET_USER_ACTIVE: rxMethod(
            pipe(
                tap(() => patchState(store, { state: 'Loading' })),
                switchMap(() => {
                    return loginService.getCurrentUser().pipe(
                        tap((users) => { 
                            patchState(store, { users, state: 'Loaded' });
                        })
                    );
                })
            )
        ),
    }))
);
