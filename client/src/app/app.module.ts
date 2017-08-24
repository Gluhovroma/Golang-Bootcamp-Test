import { NgModule, ApplicationRef, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AngularSplitModule } from 'angular-split';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { AppComponent } from './app.component';
import { MapData } from './services';
import { ApiService } from './shared';
import { routing } from './app.routing';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import { MapComponent } from './pages/map/map.component';
import { СurrencyComponent } from './pages/currency/currency.component';
import {
  PageTopComponent,
} from './components';
import { GlobalState } from './global.state';
enableProdMode();
@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing,
    AngularSplitModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    MapComponent,
    СurrencyComponent,
    PageTopComponent,

  ],
  providers: [
    ApiService,
    GlobalState,
    MapData,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
