import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GuidesComponent} from './guides/guides.component';
import {NewGuideComponent} from './new-guide/new-guide.component';
import {AuthGuard} from '../auth/auth.guard';

const routes: Routes = [
  {
    path: '', component: GuidesComponent,
  },
  {
    path: ':new', component: NewGuideComponent, canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class GuideRoutingModule {

}
