import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSale from './inscripcion.reducer';

export const selectInscripcionState = createFeatureSelector<fromSale.State>(
  fromSale.inscripcionFeatureKey
);

export const selectInscripcionList = createSelector(selectInscripcionState, (s) => s.inscripciones)

export const selectLoadingInscripciones = createSelector(selectInscripcionState, (s) => s.loadingInscripciones)

export const selectInscripcionesError = createSelector(selectInscripcionState, (s) => s.error)
