import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscripcionesRoutingModule } from './inscripciones-routing.module';
import { InscripcionesComponent } from './inscripciones.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SharedModule } from '../../../../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { InscripcionEffects } from './store/inscripcion.effects';
import {MatIconModule} from '@angular/material/icon';
import { StoreModule } from '@ngrx/store';
import { InscripcionFeature } from './store/inscripcion.reducer';
import { InscripcionDialogComponent } from './components/inscripcion-dialog/inscripcion-dialog.component';


@NgModule({
  declarations: [
    InscripcionesComponent,
    InscripcionDialogComponent
  ],
  imports: [
    CommonModule,
    InscripcionesRoutingModule,
    MatProgressSpinnerModule,
    SharedModule,
    MatIconModule,
    StoreModule.forFeature(InscripcionFeature),
    EffectsModule.forFeature([InscripcionEffects])
  ]
})
export class InscripcionesModule { }
