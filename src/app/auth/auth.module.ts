import { NgModule } from '@angular/core';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {BgVideoComponent} from './components/bg-video/bg-video.component';
import {SharedModule} from '../shared/shared.module';
import {AuthRoutingModule} from './auth-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromAuthState from './store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth.effects';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    BgVideoComponent,
  ],
  imports: [
    SharedModule,
    AuthRoutingModule,
    StoreModule.forFeature(fromAuthState.authStateFeatureKey, fromAuthState.reducers, { metaReducers: fromAuthState.metaReducers }),
    EffectsModule.forFeature([AuthEffects])
  ],
  exports: []
})
export class AuthModule { }
