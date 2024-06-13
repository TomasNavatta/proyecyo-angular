import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ICreateClassPayload, IClases } from '../models';

export const CursoActions = createActionGroup({
  source: 'Curso',
  events: {
    'Load Cursos': emptyProps(),
    'Load Cursos Success': props<{ data: IClases[] }>(),
    'Load Cursos Failure': props<{ error: unknown }>(),
    'Create Curso': props<{ payload: ICreateClassPayload}>(),
    'Create Curso Success': props<{ data: IClases}>(),
    'Create Curso Failure': props<{ error: unknown}>(),
    'Delete Curso By Id': props<{ id: string}>(),
    'Delete Curso By Id Success': props<{ data: IClases}>(),
    'Delete Curso By Id Failure ': props<{ error: unknown}>(),

  }
});
