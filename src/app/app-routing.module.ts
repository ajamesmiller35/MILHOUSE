import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { AppComponent } from './app.component';
import { MemoriesComponent } from './component/memories/memories.component';
import { AppsComponent } from './component/apps/apps.component';
import { AuthComponent } from './component/auth/auth.component';


const routes: Routes = [
  { path: '', redirectTo: './component/auth', pathMatch: 'full' },
  { path: './component/auth', component: AuthComponent },
  { path: './component/auth', component: AppsComponent},
  { path: './component/memories', component: MemoriesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
