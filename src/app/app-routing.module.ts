import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {LogRegComponent} from './auth/log-reg/log-reg.component';
import {AllGuidesComponent} from './guide/all-guides/all-guides.component';
import {SpecificGuidesComponent} from './guide/specific-guides/specific-guides.component';


const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'login', component: LogRegComponent},
  {path: 'signup', component: LogRegComponent},
  {path: 'guides', component: AllGuidesComponent,
    children: [
      { path: '', component: SpecificGuidesComponent},
      { path: ':className', component: SpecificGuidesComponent },
      { path: ':className/:specName', component: SpecificGuidesComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
