import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MaterialModule} from './material.module';

import {BigNumberCardComponent} from './cards/big-number-card/big-number-card.component';
import {CardDirective} from './cards/card.directive';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {CardFactoryComponent} from './cards/card-factory';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {BigNumberCard2SpacesComponent} from './cards/big-number-card-2-spaces/big-number-card-2-spaces.component';
import {MatGridListModule} from '@angular/material';
import {GraphCardComponent} from './cards/graph-card/graph-card.component';

@NgModule({
  declarations: [
    AppComponent,
    BigNumberCardComponent,
    CardDirective,
    CardFactoryComponent,
    BigNumberCard2SpacesComponent,
    GraphCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    CommonModule,
    DragDropModule,
    MatGridListModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [BigNumberCardComponent, BigNumberCard2SpacesComponent]
})
export class AppModule {
}
