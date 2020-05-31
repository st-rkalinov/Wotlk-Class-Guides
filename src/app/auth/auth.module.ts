import { NgModule } from '@angular/core';
import {LogRegComponent} from './log-reg/log-reg.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {BgVideoComponent} from './components/bg-video/bg-video.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
    LogRegComponent,
    LoginComponent,
    SignupComponent,
    BgVideoComponent,
  ],
  imports: [
    SharedModule
  ],
  exports: []
})
export class AuthModule { }
