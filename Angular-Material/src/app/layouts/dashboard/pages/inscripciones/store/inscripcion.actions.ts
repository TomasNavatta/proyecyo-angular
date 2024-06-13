import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IInscripciones } from '../models';

export const InscripcionActions = createActionGroup({
  source: 'Inscripcion',
  events: {
    'Load Inscripciones': emptyProps(),
    'Load Inscripciones Success': props<{ data: IInscripciones[] }>(),
    'Load Inscripciones Failure': props<{ error: unknown }>(),
  }
});
