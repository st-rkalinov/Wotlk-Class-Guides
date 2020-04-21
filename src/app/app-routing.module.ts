import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {LogRegComponent} from './auth/log-reg/log-reg.component';


const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'login', component: LogRegComponent},
  {path: 'signup', component: LogRegComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
