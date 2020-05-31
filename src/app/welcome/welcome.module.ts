import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {WelcomeComponent} from './welcome.component';
import {ClassesSpecsComponent} from './components/classes-specs/classes-specs.component';
import {SpecCardComponent} from './components/spec-card/spec-card.component';

@NgModule({
  declarations: [
    WelcomeComponent,
    ClassesSpecsComponent,
    SpecCardComponent
  ],
  imports: [
    SharedModule
  ]
})
export class WelcomeModule { }
