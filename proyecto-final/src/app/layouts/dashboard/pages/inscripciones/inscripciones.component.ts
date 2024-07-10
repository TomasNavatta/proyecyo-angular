import { Component, OnDestroy, OnInit } from '@angular/core';
import { InscricpionesService } from './inscripciones.service';
import { IInscripciones, IInscripcionesForm } from './models';
import { FormControl, FormGroup } from '@angular/forms';
import { CursosService } from '../cursos/cursos.service';
import { IClases } from '../cursos/models';
import { Store } from '@ngrx/store';
import { selectInscripcionList, selectLoadingInscripciones, selectInscripcionesError } from './store/inscripcion.selectors';
import { InscripcionActions } from './store/inscripcion.actions';
import { Observable, Subscription, first } from 'rxjs';
import { IUser } from '../users/models';
import { UsersService } from '../users/users.service';
import { MatDialog } from '@angular/material/dialog';
import { InscripcionDialogComponent } from './components/inscripcion-dialog/inscripcion-dialog.component';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrl: './inscripciones.component.scss'
})
export class InscripcionesComponent implements OnInit {


  clases: IClases[] = []
  users: IUser[] = [];


  existUnsavedChanges = false

  inscripcionForm = new FormGroup<IInscripcionesForm>({
    user: new FormControl(null),
    curso: new FormControl(null)

  })

  loadingInscriciones$: Observable<boolean>
  error$: Observable<unknown>
  inscripciones$: Observable<IInscripciones[]>


  displayedColumns: string[] = ['id', 'curso', 'alumno', 'actions'];




  
  constructor(
    private inscripcionesService: InscricpionesService,
    private CursosService: CursosService, 
    private usersService: UsersService,
    private store: Store,
    private matDialog: MatDialog) {
      this.loadingInscriciones$ = this.store.select(selectLoadingInscripciones)
      this.inscripciones$ = this.store.select(selectInscripcionList)
      this.error$ = this.store.select(selectInscripcionesError)

  }

  ngOnInit(): void {
   this.loadInscripciones()
   this.loadCursos()
   this.loadUsers()
   this.suscribeToInscripcionFormChanges()
  }

 

  suscribeToInscripcionFormChanges(): void {
    this.inscripcionForm.valueChanges.subscribe({
      next: (v) => {
        console.log(v)
        this.existUnsavedChanges = true
      }
    })
  }

  createInscripciones() {
    this.inscripcionesService.createInscripciones(this.inscripcionForm.value).subscribe({
      next: (inscripciones) => {
        console.log(inscripciones)
      },
      error: () => {},
      complete: () => {}
    })
  }

  
  deleteInscripcionById(id: string): void {
    this.store.dispatch(InscripcionActions.deleteInscripcionById({id}))
  }


  openDialog(editingClase?: IInscripciones): void {
    this.matDialog.open(InscripcionDialogComponent, {
      data: editingClase,
    })
    .afterClosed()
    .subscribe({
      next: (result) => {
        if (result) {
          if (editingClase) {
            // Update the course
            this.store.dispatch(InscripcionActions.updateInscripcion({ payload: { ...editingClase, ...result } }));
          } else {
            // Create a new course
            this.store.dispatch(InscripcionActions.createInscripcion({ data: result }));
          }
        }
      },
    });
  }


  loadUsers() {
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        console.log('Usuarios cargados:', this.users);
      },
      error: (err) => console.error('Error al cargar usuarios:', err)
    });
  }
  
  loadCursos() {
    this.CursosService.getCursos().subscribe({
      next: (cursos) => {
        this.clases = cursos;
        console.log('Cursos cargados:', this.clases);
      },
      error: (err) => console.error('Error al cargar cursos:', err)
    });
  }
  
  loadInscripciones() {
    this.store.dispatch(InscripcionActions.loadInscripciones());
    this.inscripciones$.pipe(first()).subscribe({
      next: (inscripciones) => {
        console.log('Inscripciones cargadas:', inscripciones);
      },
      error: (err) => console.error('Error al cargar inscripciones:', err)
    });
  }

}
