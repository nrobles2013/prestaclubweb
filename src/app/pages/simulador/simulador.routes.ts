import { Routes } from '@angular/router';
import { CronogramaComponent } from './cronograma/cronograma.component';
import { CronogramaFormularioComponent } from './cronograma/components/cronograma-formulario/cronograma-formulario.component';
import { CronogramaRegistroComponent } from './cronograma/components/cronograma-registro/cronograma-registro.component';

export const SimuladorRoutes: Routes = [
    {
        path: '',
        redirectTo: 'cronograma',  // Redirige a la primera ruta hija
        pathMatch: 'full',
    },
    {
        path: 'cronograma',
        component: CronogramaComponent,
        data: {
          title: 'Cronograma',
          urls: [ 
            { title: 'Simulador'},
            { title: 'Cronograma' }
          ]
        },
        children: [
          //previa , final y registro 
          {
            path: 'previa',
            component: CronogramaFormularioComponent,
            data: {
              title: 'Previa de Cronograma',
              urls: [ 
                { title: 'Simulador'},
                { title: 'cronograma'  },
                { title: 'previa' }
              ],
              typeCronograma: 'PREVIA'
            }
          },
          {
              path: 'final',
              component: CronogramaFormularioComponent,
              data: {
                title: 'Final de Cronograma',
                urls: [ 
                  { title: 'Simulador'},
                  { title: 'cronograma'  },
                  { title: 'final' }
                ],
                typeCronograma: 'FINAL'
              }
          },
          {
            path: 'registro',
            component: CronogramaRegistroComponent,
            data: {
              title: 'Registro de Cronograma',
              urls: [ 
                { title: 'Simulador'},
                { title: 'cronograma'  },
                { title: 'registro' }
              ],
              typeCronograma: 'REGISTRO'
            }
          }
        ]
    }, 
    {
        path: '**',
        redirectTo: 'cronograma',
    } 
];
