import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ICreateClassPayload, IClases } from '../models';

export const ProductActions = createActionGroup({
  source: 'Product',
  events: {
    'Load Products': emptyProps(),
    'Load Products Success': props<{ data: IClases[] }>(),
    'Load Products Failure': props<{ error: unknown }>(),
    'Create Product': props<{ payload: ICreateClassPayload}>(),
    'Create Product Success': props<{ data: IClases}>(),
    'Create Product Failure': props<{ error: unknown}>(),
    'Delete product By Id': props<{ id: number}>(),
    'Delete product By Id Success': props<{ data: IClases}>(),
    'Delete product By Id Failure ': props<{ error: unknown}>(),

  }
});
