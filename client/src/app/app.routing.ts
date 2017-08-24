import { RouterModule, Routes } from '@angular/router';

import { MapComponent } from './pages/map/map.component';
import { СurrencyComponent } from './pages/currency/currency.component';

const routes: Routes = [
  { path: '', component: MapComponent },
  { path: 'currency', component: СurrencyComponent,  },


];

export const routing = RouterModule.forRoot(routes);
