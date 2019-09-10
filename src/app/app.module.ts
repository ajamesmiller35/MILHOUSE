import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppViewComponent } from './app-view/app-view.component';

/*const appRoutes: Routes = [
  { path: '', component: root },
  { path: 'apps', component: appView },
  { path: 'memories', component: memories },
  { path: '**', component: PageNotFoundComponent }
];*/

const appRoutes: Routes = [
  //{ path: '', redirectTo: '/app-view', pathMatch: 'full' },
  //{ path: 'app-view', component: AppViewComponent }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
