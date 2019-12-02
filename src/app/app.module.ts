import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { MaterialModule } from './material';
import { MatToolbarModule, MatButtonModule, MatIconModule, MatListModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MemoriesComponent } from './component/memories/memories.component';
import { AuthComponent } from './component/auth/auth.component';
import { AppsComponent } from './component/apps/apps.component';
import { NewAccountComponent } from './component/new-account/new-account.component';
import { ErrorComponent } from './error/error.component';
import { ListsComponent } from './component/lists/lists.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    MemoriesComponent,
    AppsComponent,
    NewAccountComponent,
    ErrorComponent,
    ListsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
