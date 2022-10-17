import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { Crud, stats } from '../store/crud';
import { invokeSaveNewAPI } from '../store/crud.action';
import * as alertifyjs from 'alertifyjs';
import { NgForm } from '@angular/forms';




@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  [x: string]: any;
  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    private router: Router
  ) {}

  runSuccess(){
    alertifyjs.success("Salvat cu succes")
  }
  cForm: Crud = {
    id: 0,  
    name: '',
    status: stats.Available,
  };

  ngOnInit(): void {}

  // saved(f: NgForm) {
  //   if (!f.valid) {
  //   return;
  //   }
  // }

  save() {
    this.store.dispatch(invokeSaveNewAPI({ newC: this.cForm }));
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        // const alertifyjs = require('alertifyjs');
          //alertifyjs.succes("Salvat cu succes")
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
         this.router.navigate(['/']);
        

      }
    });
  }
}
