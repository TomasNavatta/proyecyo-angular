import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { SaleActions } from './sale.actions';
import { SalesService } from '../sales.service';


@Injectable()
export class SaleEffects {

  loadSales$ = createEffect(() => {
    return this.actions$.pipe(
      // ofType lo que hace es filtar todas las acciones que se disparan 
      //en mi aplicacion, y toma las acciones que indicamos
      ofType(SaleActions.loadSales),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.salesService.getSales().pipe(
          // si tdo sale bien:
          map(data => SaleActions.loadSalesSuccess({ data })),
          //si hay un error:
          catchError(error => of(SaleActions.loadSalesFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions, private salesService: SalesService) {}
}
