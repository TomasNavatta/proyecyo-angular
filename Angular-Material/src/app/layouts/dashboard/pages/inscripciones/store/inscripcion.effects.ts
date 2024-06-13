import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { InscripcionActions } from './inscripcion.actions';
import { InscricionesService } from '../inscripciones.service';


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


  constructor(private actions$: Actions, private inscripcionesService: InscricionesService) {}
}
