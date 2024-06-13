import { Component, OnInit } from '@angular/core';
import { IUser } from './models';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { UsersService } from './users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'role', 'createdAt', 'actions'];
  
  loading = false
  users: IUser[] = []

  constructor(private matDialog: MatDialog,
     private usersService: UsersService
    ) {}

  ngOnInit(): void {
    this.loading = true
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (err) => {
        console.log('error', err)

        Swal.fire('Error', 'ocurrio un error', 'error')
      },
      complete: () => {
        this.loading = false
      }
    })
  }

 
  openDialog(editingUser?: IUser): void {
    this.matDialog.open(UserDialogComponent, {
      data: editingUser,
    })
    .afterClosed()
    .subscribe({
      next: (result) => {
        if (result) {
          if(editingUser) {
            //actualizar el usuario en el array
            this.users = this.users.map((u) => u.id === editingUser.id ? {...u, ...result} : u)
          } else{
                      //logica de crear el usuario

            result.createdAt = new Date()

            this.usersService.createUser(result).subscribe({
              next: (usuarioCreado) => {
                this.users = [...this.users, usuarioCreado]
              }
            })


          }

        }
      

      },
    })
  }

  onDeleteUser(id: number): void {
    if(confirm('esta seguro?')) {
      this.users = this.users.filter((u) => u.id != id)
    }

  }

}
