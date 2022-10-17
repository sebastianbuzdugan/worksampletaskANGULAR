import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrudRoutingModule } from './crud-routing.module';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { cReducer } from './store/crud.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CrudEffect } from './store/crud.effect';
import { AddComponent } from './add/add.component';
import { FormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [HomeComponent, AddComponent, EditComponent, ViewComponent, SearchComponent],
  imports: [
    CommonModule,
    CrudRoutingModule,
    FormsModule,
    StoreModule.forFeature('mycrud', cReducer),
    EffectsModule.forFeature([CrudEffect])
  ],
})
export class CrudModule {}
