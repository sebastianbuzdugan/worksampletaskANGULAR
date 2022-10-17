import { Component, OnInit, NgModule } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { invokeAPI, invokeDeleteAPI } from '../store/crud.action';
import { selectCrud } from '../store/crud.selector';
import * as alertifyjs from 'alertifyjs';
import { Crud, stats } from '../store/crud';


declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private store: Store, private appStore: Store<Appstate>, ) {}

  crud$ = this.store.pipe(select(selectCrud));

  deleteModal: any;
  idToDelete: number = 0;
  pets: any;
 
  _filterText:string = '';
  filteredPets: any;
  

  
  runSuccess(){
    alertifyjs.success("A fost sters cu succes")
  }
  get filterText(){
    return this._filterText;
  }

  set filterText(value: string){
    this._filterText = value;
    // this.filteredPets = this.filterStudentByStatus(value);
  }

  ngOnInit(): void {
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('deleteModal')
    );
    this.store.dispatch(invokeAPI());
  }

  openDeleteModal(id: number) {
    this.idToDelete = id;
    this.deleteModal.show();
  }

  delete() {
    this.store.dispatch(
      invokeDeleteAPI({
        id: this.idToDelete,
      })
    );
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this.deleteModal.hide();
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
      }
    });
  }



//   filterPetByStatus(filterTerm: string){
//     if(/*this..length === 0 || */ this.filterText === ''){
//       return this.students;
//   } else {
//       return this..filter((student) => 
//       { 
//           return student.gender.toLowerCase() === filterTerm.toLowerCase();
//       })
//   }
//   }
// 
}
