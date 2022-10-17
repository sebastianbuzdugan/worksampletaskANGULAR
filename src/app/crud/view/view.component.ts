import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { Crud, stats } from '../store/crud';
import { invokeUpdateAPI } from '../store/crud.action';
import { selectById } from '../store/crud.selector';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private appStore: Store<Appstate>
  ) {}

  cForm: Crud = {
    id: 0,
    name: '',
    status: stats.Available,
  };
  
  ngOnInit(): void {
    let fetchData$ = this.route.paramMap.pipe(
      switchMap((params) => {
        var id = Number(params.get('id'));
        return this.store.pipe(select(selectById(id)));
      })
    );
    fetchData$.subscribe((data) => {
      if (data) {
        this.cForm = { ...data };
      }
      else{
        this.router.navigate(['/']);
      }
    });
  }

  udapte() {
    this.store.dispatch(
      invokeUpdateAPI({ updateC: { ...this.cForm } })
    );
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        this.router.navigate(['/']);
      }
    });
  }

}
