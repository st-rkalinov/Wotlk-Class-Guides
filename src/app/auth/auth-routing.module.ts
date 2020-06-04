import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LogRegComponent} from './log-reg/log-reg.component';
import {canActivate, redirectLoggedInTo} from '@angular/fire/auth-guard';

const redirectAuthorizedToHome = () => redirectLoggedInTo(['']);

const routes: Routes = [
  {path: 'login', component: LogRegComponent, ...canActivate(redirectAuthorizedToHome)},
  {path: 'signup', component: LogRegComponent, ...canActivate(redirectAuthorizedToHome)},
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AuthRoutingModule {

}
