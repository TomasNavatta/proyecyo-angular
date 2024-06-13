import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldValidatorsErrorsPipe } from './pipes/form-field-validators-errors.pipe';
import { ResaltadoDirective } from './directives/resaltado.directive';
import { RepetirDirective } from './directives/repetir.directive';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';




@NgModule({
  declarations: [
    FormFieldValidatorsErrorsPipe,
    ResaltadoDirective,
    RepetirDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormFieldValidatorsErrorsPipe,
    ResaltadoDirective,
    RepetirDirective,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule

  ]
  
})
export class SharedModule { }
