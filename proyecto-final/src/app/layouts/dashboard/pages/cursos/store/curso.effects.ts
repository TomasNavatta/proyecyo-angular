import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { CursoActions } from './curso.actions';
import { CursosService } from '../cursos.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable()
export class CursoEffects {

  loadCursos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CursoActions.loadCursos),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.cursosService.getCursos().pipe(
          // El servicio responde OK:
          map((data) => CursoActions.loadCursosSuccess({ data })),

          // El servicio responde FAIL:
          catchError((error) =>
            of(CursoActions.loadCursosFailure({ error }))
          )
        )
      )
    );
  });

  createCurso$ = createEffect(() => {
    return this.actions$.pipe(
      // Filtramos la accion:
      ofType(CursoActions.createCurso),
      concatMap((action) =>
        this.cursosService.createCurso(action.payload).pipe(
          // El servicio responde OK:
          map((data) => CursoActions.createCursoSuccess({ data })),
          // El servicio responde FAIL:
          catchError((error) =>
            of(CursoActions.createCursoFailure({ error }))
          )
        )
      )
    );
  });

  deleteCursoById$ = createEffect(() => {
    return this.actions$.pipe(
      // Filtramos la accion:
      ofType(CursoActions.deleteCursoById),
      concatMap((action) =>
        this.cursosService.deleteCursoById(action.id).pipe(
          // El servicio responde OK:
          map((data) => CursoActions.deleteCursoByIdSuccess({ data })),
          // El servicio responde FAIL:
          catchError((error) =>
            of(CursoActions.deleteCursoByIdFailure({ error }))
          )
        )
      )
    );
  });

  updateCurso$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CursoActions.updateCurso),
      concatMap((action) =>
        this.cursosService.updateCurso(action.payload).pipe(
          map((data) => CursoActions.updateCursoSuccess({ data })),
          catchError((error) =>
            of(CursoActions.updateCursoFailure({ error }))
          )
        )
      )
    );
  });
  
  

  onErrros$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        CursoActions.loadCursosFailure,
        CursoActions.createCursoFailure,
        CursoActions.deleteCursoByIdFailure),
        tap((action) => {

          if(action.error instanceof HttpErrorResponse) {

            Swal.fire({
              icon: 'error',
              text: action.error['message']
  
            })
          }
        })
    )
  }, {dispatch: false})



  constructor(private actions$: Actions, private cursosService: CursosService) {}
}
