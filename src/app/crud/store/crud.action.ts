import { createAction, props } from '@ngrx/store';
import { Crud } from './crud';

export const invokeAPI = createAction(
  '[API] Invoke Fetch API'
);

export const FetchAPISuccess = createAction(
  '[API] Fetch API Success',
  props<{ allC: Crud[] }>()
);

export const invokeSaveNewAPI = createAction(
  '[API] Inovke save new api',
  props<{ newC: Crud }>()
);

export const saveNewAPISucess = createAction(
  '[API] save new api success',
  props<{ newC: Crud }>()
);

export const invokeUpdateAPI = createAction(
  '[API] Inovke update api',
  props<{ updateC: Crud }>()
);

export const updateAPISucess = createAction(
  '[API] update api success',
  props<{ updateC: Crud }>()
);

export const invokeDeleteAPI = createAction(
  '[API] Inovke delete api',
  props<{id:number}>()
);

export const deleteAPISuccess = createAction(
  '[API] deleted api success',
  props<{id:number}>()
);