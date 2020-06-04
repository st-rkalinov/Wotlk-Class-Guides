import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';


const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {
    path: 'guides',
    loadChildren: () => import('./guide/guide.module').then(m => m.GuideModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
