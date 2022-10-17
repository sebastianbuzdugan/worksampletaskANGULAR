import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Crud } from './crud';

export const selectCrud = createFeatureSelector<Crud[]>('mycrud');

export const selectById = (cId: number) =>
  createSelector(selectCrud, (c: Crud[]) => {
    var cbyId = c.filter((_) => _.id == cId);
    if (cbyId.length == 0) {
      return null;
    }
    return cbyId[0];
  });
