import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MemoriesComponent } from './component/memories/memories.component';
import { AuthComponent } from './component/auth/auth.component';
import { AppsComponent } from './component/apps/apps.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { ErrorComponent } from './error/error.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    MemoriesComponent,
    AppsComponent,
    NewAccountComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
