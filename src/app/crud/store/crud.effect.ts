import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, map, mergeMap, switchMap, withLatestFrom } from 'rxjs';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { Appstate } from 'src/app/shared/store/appstate';
import { CrudService } from '../crud.service';
import {
  FetchAPISuccess,
  deleteAPISuccess,
  invokeAPI,
  invokeDeleteAPI,
  invokeSaveNewAPI,
  invokeUpdateAPI,
  saveNewAPISucess,
  updateAPISucess,
} from './crud.action';
import { selectCrud } from './crud.selector';

@Injectable()
export class CrudEffect {
  constructor(
    private actions$: Actions,
    private crudService: CrudService,
    private store: Store,
    private appStore: Store<Appstate>
  ) {}

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeAPI),
      withLatestFrom(this.store.pipe(select(selectCrud))),
      mergeMap(([, cformStore]) => {
        if (cformStore.length > 0) {
          return EMPTY;
        }
        return this.crudService
          .get()
          .pipe(map((data) => FetchAPISuccess({ allC: data })));
      })
    )
  );

  saveNew$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeSaveNewAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.crudService.create(action.newC).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return saveNewAPISucess({ newC: data });
          })
        );
      })
    );
  });

  updateAPI$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeUpdateAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.crudService.update(action.updateC).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return updateAPISucess({ updateC: data });
          })
        );
      })
    );
  });

  deleteAPI$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeDeleteAPI),
      switchMap((actions) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.crudService.delete(actions.id).pipe(
          map(() => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return deleteAPISuccess({ id: actions.id });
          })
        );
      })
    );
  });
}
