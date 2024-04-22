import { Component } from '@angular/core';
import { IUser } from './models';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './components/ABM alumnos/user-dialog.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  
})
export class UsersComponent {
  displayedColumns: string[] = ['id', 'nombreCompleto', 'firstName', 'lastName', 'email', 'createdAt'];

  users: IUser[] = [
    {id: 1,
    firstName: 'Tomas',
    lastName: 'Navatta',
    email: 'tomasnavatta@gmail.com',
    createdAt: new Date()},
    {id: 2,
      firstName: 'Santiago',
      lastName: 'Menendez',
      email: 'santy17@gmail.com',
      createdAt: new Date()},

  ]

  constructor(private matDialog: MatDialog) {}

  openDialog(): void {
    this.matDialog.open(UserDialogComponent).afterClosed().subscribe({
      next: (result) => {
        if (result) {
          //logica de crear el usuario

          this.users = [...this.users, result]
        }
      

      },
    })
  }

}
