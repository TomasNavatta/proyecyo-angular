import { Component, Inject, OnInit } from '@angular/core';
import { CursosService } from './cursos.service';
import { IClases } from './models';
import { API_URL, RANDOM_NUMBER, PRODUCTS } from './cursos.module';
import { AlertsService } from '../../../../core/services/alerts.service';
import { Store } from '@ngrx/store';
import { CursoActions } from './store/curso.actions';
import { selectIsLoading, selectCursos, selectCursosError } from './store/curso.selectors';
import { Observable, map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ClaseDialogComponent } from './components/clase-dialog/clase-dialog.component';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss'
})
export class CursosComponent implements OnInit {
  displayedColumns = ['id', 'clase', 'horario', 'actions'];
  clases$: Observable<IClases[]>
  isLoading$: Observable<boolean>
  error$: Observable<Error>
  clases: IClases[] = []

  constructor(private cursosService: CursosService,private store: Store, private matDialog: MatDialog) {
    
    this.isLoading$ = this.store.select(selectIsLoading)
    this.clases$ = this.store.select(selectCursos)
    this.error$ = this.store.select(selectCursosError).pipe(map((err) => err as Error))
  
  }
  ngOnInit(): void {
    this.store.dispatch(CursoActions.loadCursos());
  }

  deleteCursoById(id: number): void {
    this.store.dispatch(CursoActions.deleteCursoById({id}))
  }

  createCurso(): void {
    this.store.dispatch(CursoActions.createCurso({ payload: {
      clase: 'Random product',
      horario: '10:00'
    }}))

  }


  openDialog(editingClase?: IClases): void {
    this.matDialog.open(ClaseDialogComponent, {
      data: editingClase,
    })
    .afterClosed()
    .subscribe({
      next: (result) => {
        if (result) {
          if(editingClase) {
            //actualizar el usuario en el array
            this.clases = this.clases.map((u) => u.id === editingClase.id ? {...u, ...result} : u)
          } else{
                      //logica de crear el usuario

            result.createdAt = new Date()

            this.cursosService.createProduct(result).subscribe({
              next: (usuarioCreado) => {
                this.clases = [...this.clases, usuarioCreado]
              }
            })


          }

        }
      

      },
    })
  }
 

}
