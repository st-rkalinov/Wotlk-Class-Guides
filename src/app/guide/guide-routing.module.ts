import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GuidesComponent} from './guides/guides.component';
import {NewGuideComponent} from './new-guide/new-guide.component';
import {redirectUnauthorizedTo, canActivate} from '@angular/fire/auth-guard';
import {GuideComponent} from './guide/guide.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: '', component: GuidesComponent,
  },
  {
    path: 'new', component: NewGuideComponent, ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: ':id', component: GuideComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class GuideRoutingModule {

}
