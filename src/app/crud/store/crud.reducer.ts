import { createReducer, on } from '@ngrx/store';
import { Crud } from './crud';
import { FetchAPISuccess, deleteAPISuccess, saveNewAPISucess, updateAPISucess } from './crud.action';

export const initialState: ReadonlyArray<Crud> = [];

export const cReducer = createReducer(
  initialState,
  on(FetchAPISuccess, (state, { allC }) => {
    return allC;
  }),
  on(saveNewAPISucess, (state, { newC }) => {
    let newState = [...state];
    newState.unshift(newC);
    return newState;
  }),
  on(updateAPISucess, (state, { updateC }) => {
    let newState = state.filter((_) => _.id != updateC.id);
    newState.unshift(updateC);
    return newState;
  }),
  on(deleteAPISuccess, (state, { id }) => {
    let newState =state.filter((_) => _.id != id);
    return newState;
  })
);
