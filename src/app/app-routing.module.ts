import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {LogRegComponent} from './auth/log-reg/log-reg.component';
import {AllGuidesComponent} from './guide/all-guides/all-guides.component';


const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'login', component: LogRegComponent},
  {path: 'signup', component: LogRegComponent},
  {path: 'guides', component: AllGuidesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
