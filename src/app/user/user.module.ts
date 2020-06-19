import { NgModule } from '@angular/core';
import { UserComponent } from './user/user.component';
import {UserRoutingModule} from './user-routing.module';
import {SharedModule} from '../shared/shared.module';
import {MaterialModule} from '../material.module';



@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    UserRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class UserModule { }
