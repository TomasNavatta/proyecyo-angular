import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss'
})
export class UserDialogComponent {
  userForm: FormGroup

  constructor( private formBuilder: FormBuilder, private matDialogRef: MatDialogRef<UserDialogComponent> ) {
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúñÑ]+$'), Validators.maxLength(5)]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúñÑ]+$')]],
      email: ['', Validators.required]
    })
  }

  get firstNameControl() {
    return this.userForm.get('firstName')
  }

  onSave(): void {
    if(this.userForm.invalid) {
      this.userForm.markAllAsTouched()
    } else{
      this.matDialogRef.close(this.userForm.value)


    }
  }

}
