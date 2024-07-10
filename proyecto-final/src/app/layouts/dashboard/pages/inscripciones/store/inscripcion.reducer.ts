import { createFeature, createReducer, on } from '@ngrx/store';
import { InscripcionActions } from './inscripcion.actions';
import { IInscripciones } from '../models';

export const inscripcionFeatureKey = 'inscripcion';

export interface State {
  loadingInscripciones: boolean;
  inscripciones: IInscripciones[];
  error: unknown;
}

export const initialState: State = {
  loadingInscripciones: false,
  inscripciones: [],
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(InscripcionActions.loadInscripciones, (state) => {
    return {
      ...state,
      loadingInscripciones: true,
    };
  }),
  on(InscripcionActions.loadInscripcionesSuccess, (state, action) => {
    return {
      ...state,
      inscripciones: action.data,
      loadingInscripciones: false,
    };
  }),
  on(InscripcionActions.loadInscripcionesFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loadingInscripciones: false,
    };
  }),
  on(InscripcionActions.createInscripcion, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(InscripcionActions.createInscripcionSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      inscripciones: [...state.inscripciones, action.data],
    };
  }),
  on(InscripcionActions.createInscripcionFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  }),
  on(InscripcionActions.deleteInscripcionById, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(InscripcionActions.deleteInscripcionByIdSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      inscripciones: state.inscripciones.filter((el) => el.id !== action.data.id),
    };
  }),
  on(InscripcionActions.deleteInscripcionByIdFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  }),
  on(InscripcionActions.updateInscripcion, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(InscripcionActions.updateInscripcionSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      inscripciones: state.inscripciones.map((inscripcion) => inscripcion.id === action.data.id ? action.data : inscripcion),
    };
  }),
  on(InscripcionActions.updateInscripcionFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  }),
);

export const InscripcionFeature = createFeature({
  name: inscripcionFeatureKey,
  reducer,
});

