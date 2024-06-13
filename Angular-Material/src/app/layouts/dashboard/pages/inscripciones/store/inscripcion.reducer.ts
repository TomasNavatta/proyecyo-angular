import { createFeature, createReducer, on } from '@ngrx/store';
import { InscripcionActions } from './inscripcion.actions';
import { IInscripciones } from '../models';

export const inscripcionFeatureKey = 'sale';

export interface State {
  loadingInscripciones: boolean
  inscripciones: IInscripciones[]
  error: unknown

}

export const initialState: State = {
  loadingInscripciones: false,
  inscripciones: [],
  error: null

};

export const reducer = createReducer(
  initialState,
  on(InscripcionActions.loadInscripciones, state =>  {
    return {
      ...state,
      loadingSales: true
    }
  }),
  on(InscripcionActions.loadInscripcionesSuccess, (state, action) => {
    return {
      ...state,
      sales: action.data,
      loadingSales: false
    }
  }),
  on(InscripcionActions.loadInscripcionesFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loadingSales: false
    }
  }),
);

export const InscripcionFeature = createFeature({
  name: inscripcionFeatureKey,
  reducer,
});

