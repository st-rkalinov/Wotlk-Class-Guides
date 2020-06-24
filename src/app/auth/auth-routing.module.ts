import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {canActivate, redirectLoggedInTo} from '@angular/fire/auth-guard';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';

const redirectAuthorizedToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {path: 'login', component: LoginComponent, ...canActivate(redirectAuthorizedToHome)},
  {path: 'signup', component: SignupComponent, ...canActivate(redirectAuthorizedToHome)},
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AuthRoutingModule {

}
