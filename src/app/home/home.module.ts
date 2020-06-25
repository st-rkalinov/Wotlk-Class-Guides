import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {HomeComponent} from './home/home.component';
import {ClassesSpecsComponent} from './components/classes-specs/classes-specs.component';
import {SpecCardComponent} from './components/spec-card/spec-card.component';
import {ClassesMenuComponent} from './components/classes-menu/classes-menu.component';
import {MaterialModule} from '../material.module';

@NgModule({
  declarations: [
    HomeComponent,
    ClassesSpecsComponent,
    SpecCardComponent,
    ClassesMenuComponent
  ],
  exports: [
    SpecCardComponent,
    ClassesSpecsComponent
  ],
  imports: [
    SharedModule,
    MaterialModule
  ]
})
export class HomeModule {
}
