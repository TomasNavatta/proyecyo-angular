import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IInscripciones, ICreateInscripcionData  } from '../models';

export const InscripcionActions = createActionGroup({
  source: 'Inscripcion',
  events: {
    'Load Inscripciones': emptyProps(),
    'Load Inscripciones Success': props<{ data: IInscripciones[] }>(),
    'Load Inscripciones Failure': props<{ error: unknown }>(),
    'Create Inscripcion': props<{ data: ICreateInscripcionData}>(),
    'Create Inscripcion Success': props<{ data: IInscripciones}>(),
    'Create Inscripcion Failure': props<{ error: unknown}>(),
    'Delete Inscripcion By Id': props<{ id: string}>(),
    'Delete Inscripcion By Id Success': props<{ data: IInscripciones}>(),
    'Delete Inscripcion By Id Failure ': props<{ error: unknown}>(),
    'Update Inscripcion': props<{ payload: IInscripciones }>(),
    'Update Inscripcion Success': props<{ data: IInscripciones }>(),
    'Update Inscripcion Failure': props<{ error: unknown }>(),
  }
});
