import { Component, OnDestroy, OnInit } from '@angular/core';
import { InscricionesService } from './inscripciones.service';
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

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrl: './inscripciones.component.scss'
})
export class InscripcionesComponent implements OnInit {


  clases: IClases [] = []
  users: IUser[] = [];


  existUnsavedChanges = false

  inscripcionForm = new FormGroup<IInscripcionesForm>({
    quantity: new FormControl(1),
    user: new FormControl(null),
    curso: new FormControl(null)

  })

  loadingInscriciones$: Observable<boolean>
  error$: Observable<unknown>
  inscripciones$: Observable<IInscripciones[]>


  displayedColumns: string[] = ['id', 'curso', 'alumno', 'actions'];




  
  constructor(
    private inscripcionesService: InscricionesService,
    private CursosService: CursosService, 
    private usersService: UsersService,
    private store: Store) {
      this.loadingInscriciones$ = this.store.select(selectLoadingInscripciones)
      this.inscripciones$ = this.store.select(selectInscripcionList)
      this.error$ = this.store.select(selectInscripcionesError)

  }

  ngOnInit(): void {
   this.loadInscrpciones()
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
      next: (sales) => {},
      error: () => {},
      complete: () => {}
    })
  }

  loadUsers() {
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.users = users
      }
    })
  }

  loadCursos() {
    this.CursosService.getCursos().subscribe({
      next: (v) => (this.clases = v)
    })
  }

  loadInscrpciones() {
    this.store.dispatch(InscripcionActions.loadInscripciones())
   }

}
