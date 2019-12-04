import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { AppComponent } from './app.component';
import { MemoriesComponent } from './component/memories/memories.component';
import { AppsComponent } from './component/apps/apps.component';
import { AuthComponent } from './component/auth/auth.component';
import { NewAccountComponent } from './component/new-account/new-account.component';
import { ErrorComponent } from './error/error.component';
import { ListsComponent } from './component/lists/lists.component';


const routes: Routes = [
  //{ path: '', redirectTo: './component/auth', pathMatch: 'full' },
  //{ path: './component/auth', component: AuthComponent },
  { path: 'auth', component: AuthComponent},
  { path: 'new-account', component: NewAccountComponent},
  { path: 'memories', component: MemoriesComponent },
  { path: 'lists', component: ListsComponent },
  { path: 'lists/:id/:title', component: ListsComponent },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
