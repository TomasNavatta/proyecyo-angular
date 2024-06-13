import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IClases } from '../../models';

@Component({
  selector: 'app-clase-dialog',
  templateUrl: './clase-dialog.component.html',
  styleUrl: './clase-dialog.component.scss'
})
export class ClaseDialogComponent {
  claseForm: FormGroup

  constructor(private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<ClaseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private editingClase?: IClases){
      this.claseForm = this.formBuilder.group({
        clase: ['', [Validators.required]],
        horario: ['', [Validators.required]],
  
      })

      if(editingClase){
        this.claseForm.patchValue(editingClase)
      }

    }

    get claseControl() {
      return this.claseForm.get('clase')
    }
  
    onSave(): void {
      if(this.claseForm.invalid) {
        this.claseForm.markAllAsTouched()
      } else{
        this.matDialogRef.close(this.claseForm.value)
  
  
      }
    }

}
