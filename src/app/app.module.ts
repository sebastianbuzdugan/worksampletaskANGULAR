import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import {  HttpClientModule } from '@angular/common/http';
import { appReducer } from './shared/store/app.reducer';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FilterPipe } from 'src/app/crud/search/filter.pipe';
import { HighlightDirective } from 'src/app/crud/search/highlight.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HighlightDirective,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    StoreModule.forRoot({ appState: appReducer }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
