import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { CursosComponent } from './cursos.component';
import { SharedModule } from '../../../../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { CursosService } from './cursos.service';
import { CursosMockService } from './cursos-mock.service';
import { EffectsModule } from '@ngrx/effects';
import { CursoEffects } from './store/curso.effects';
import { StoreModule } from '@ngrx/store';
import { cursoFeature } from './store/curso.reducer';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ClaseDialogComponent } from './components/clase-dialog/clase-dialog.component';

export const API_URL = new InjectionToken('API_URL')
export const PRODUCTS = new InjectionToken('PRODUCTS')
export const RANDOM_NUMBER = new InjectionToken('RANDOM_NUMBER')
@NgModule({
  declarations: [
    CursosComponent,
    ClaseDialogComponent
  ],
  imports: [
    CommonModule,
    CursosRoutingModule,
    SharedModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    ReactiveFormsModule,
    StoreModule.forFeature(cursoFeature),
    EffectsModule.forFeature([CursoEffects]),
  ],
  exports: [
    CursosComponent
  ],
  providers:[
    //ProductsService
    {
      provide: CursosService,
      useClass: CursosService
    },
    {
      provide: API_URL,
      useValue: "http://localhost:5001/api"
    },
    {
      provide: RANDOM_NUMBER,
     useFactory: () => {
      return Math.random()
     }
    },
    {
      provide: PRODUCTS,
      useFactory: (cursosService: CursosService) => {
        return  cursosService.getCursos()
      },
      deps:[CursosService]
    }
  ]
})
export class CursosModule { }
