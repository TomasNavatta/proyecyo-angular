import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IInscripciones } from '../../models';

@Component({
  selector: 'app-inscripcion-dialog',
  templateUrl: './inscripcion-dialog.component.html',
  styleUrl: './inscripcion-dialog.component.scss'
})
export class InscripcionDialogComponent {

  inscripcionForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<InscripcionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private editingInscripcion?: IInscripciones) {
    this.inscripcionForm = this.formBuilder.group({
      curso: ['', [Validators.required]],
      alumno: ['', [Validators.required]],
    });

    if (editingInscripcion) {
      this.inscripcionForm.patchValue(editingInscripcion);
    }
  }

  onSave(): void {
    if (this.inscripcionForm.invalid) {
      this.inscripcionForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.inscripcionForm.value);
    }
  }

}
