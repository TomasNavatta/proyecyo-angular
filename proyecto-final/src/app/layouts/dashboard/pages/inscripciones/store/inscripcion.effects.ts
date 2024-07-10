import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { InscripcionActions } from './inscripcion.actions';
import { InscricpionesService } from '../inscripciones.service';


@Injectable()
export class InscripcionEffects {

  loadinscripciones$ = createEffect(() => {
    return this.actions$.pipe(
      // ofType lo que hace es filtar todas las acciones que se disparan 
      //en mi aplicacion, y toma las acciones que indicamos
      ofType(InscripcionActions.loadInscripciones),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.inscripcionesService.getInscripciones().pipe(
          // si tdo sale bien:
          map(data => InscripcionActions.loadInscripcionesSuccess({ data })),
          //si hay un error:
          catchError(error => of(InscripcionActions.loadInscripcionesFailure({ error }))))
      )
    );
  });
  

  createInscripcion$ = createEffect(() => {
    return this.actions$.pipe(
      // Filtramos la accion:
      ofType(InscripcionActions.createInscripcion),
      concatMap((action) =>
        this.inscripcionesService.createInscripciones(action.data).pipe(
          // El servicio responde OK:
          map((data) => InscripcionActions.createInscripcionSuccess({ data })),
          // El servicio responde FAIL:
          catchError((error) =>
            of(InscripcionActions.createInscripcionFailure({ error }))
          )
        )
      )
    );
  });

  deleteInscripcionById$ = createEffect(() => {
    return this.actions$.pipe(
      // Filtramos la accion:
      ofType(InscripcionActions.deleteInscripcionById),
      concatMap((action) =>
        this.inscripcionesService.deleteInscripcionById(action.id).pipe(
          // El servicio responde OK:
          map((data) => InscripcionActions.deleteInscripcionByIdSuccess({ data })),
          // El servicio responde FAIL:
          catchError((error) =>
            of(InscripcionActions.deleteInscripcionByIdFailure({ error }))
          )
        )
      )
    );
  });

  updateInscripcion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscripcionActions.updateInscripcion),
      concatMap((action) =>
        this.inscripcionesService.updateInscripcion(action.payload).pipe(
          map((data) => InscripcionActions.updateInscripcionSuccess({ data })),
          catchError((error) =>
            of(InscripcionActions.updateInscripcionFailure({ error }))
          )
        )
      )
    );
  });


  constructor(private actions$: Actions, private inscripcionesService: InscricpionesService) {}
}
