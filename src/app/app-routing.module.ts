import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {LogRegComponent} from './auth/log-reg/log-reg.component';
import {AuthGuard} from './auth/auth.guard';


const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'login', component: LogRegComponent},
  {path: 'signup', component: LogRegComponent},
  {
    path: 'guides',
    loadChildren: () => import('./guide/guide.module').then(m => m.GuideModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {
}
