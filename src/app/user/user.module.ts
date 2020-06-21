import {NgModule} from '@angular/core';
import {UserComponent} from './user/user.component';
import {UserRoutingModule} from './user-routing.module';
import {SharedModule} from '../shared/shared.module';
import {MaterialModule} from '../material.module';
import {StoreModule} from '@ngrx/store';
import * as fromUserState from './store';
import {EffectsModule} from '@ngrx/effects';
import {UserEffects} from './store/user.effects';

@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    UserRoutingModule,
    SharedModule,
    MaterialModule,
    SharedModule,
    StoreModule.forFeature(fromUserState.userStateFeatureKey, fromUserState.reducers, { metaReducers: fromUserState.metaReducers }),
    EffectsModule.forFeature([UserEffects])
  ]
})
export class UserModule { }
