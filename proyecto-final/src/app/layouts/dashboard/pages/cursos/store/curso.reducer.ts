import { createFeature, createReducer, on } from '@ngrx/store';
import { CursoActions } from './curso.actions';
import { IClases } from '../models';

export const cursoFeatureKey = 'curso';

export interface State {
  cursos: IClases[];
  isLoading: boolean;
  error: unknown;
}

export const initialState: State = {
  cursos: [],
  isLoading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,

  // Accion cargar productos...
  on(CursoActions.loadCursos, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),

  // Los productos se cargaron sin errores...
  on(CursoActions.loadCursosSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      cursos: action.data,
    };
  }),

  // Los productos se cargaron con algun error
  on(CursoActions.loadCursosFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      isLoading: false,
    };
  }),

  on(CursoActions.createCurso, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(CursoActions.createCursoSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      cursos: [...state.cursos, action.data],
    };
  }),
  on(CursoActions.createCursoFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  }),

  on(CursoActions.deleteCursoById, (state) => {
    return {
      ...state,
      isLoading: true
    }
  }),
  on(CursoActions.deleteCursoByIdSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      cursos: [...state.cursos.filter((el) => el.id != action.data.id)]
    }
  }),
  on(CursoActions.deleteCursoByIdFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error
    }
  }),

);

export const cursoFeature = createFeature({
  name: cursoFeatureKey,
  reducer,
});

