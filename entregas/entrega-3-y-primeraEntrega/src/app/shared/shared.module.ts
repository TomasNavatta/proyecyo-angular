import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldValidatorsErrorsPipe } from './pipes/form-field-validators-errors.pipe';
import { NombreCompletoPipe } from './pipes/nombre-completo.pipe';
import { FontSizeDirective } from './directives/font-size.directive';



@NgModule({
  declarations: [
    FormFieldValidatorsErrorsPipe,
    NombreCompletoPipe,
    FontSizeDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormFieldValidatorsErrorsPipe,
    FontSizeDirective,
    NombreCompletoPipe
  ]
  
})
export class SharedModule { }
