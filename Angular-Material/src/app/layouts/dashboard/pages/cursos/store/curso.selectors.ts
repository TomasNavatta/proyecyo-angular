import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProduct from './curso.reducer';

export const selectCursoState = createFeatureSelector<fromProduct.State>(
  fromProduct.cursoFeatureKey
);

export const selectIsLoading = createSelector(selectCursoState, (state) => {
  return state.isLoading
})

export const selectCursos = createSelector(selectCursoState, (state) => {
  return state.cursos
} )

export const selectCursosError = createSelector(selectCursoState, (state) => {
  return state.error
})
