import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CharactersClassService} from './services/characters-class.service';
import {FormsModule} from '@angular/forms';
import {AuthService} from './auth/auth.service';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AuthModule} from './auth/auth.module';
import {WelcomeModule} from './welcome/welcome.module';
import {CoreModule} from './core/core.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {DarkThemeModule} from './dark-theme.module';
import {AngularFireAuthGuard, AngularFireAuthGuardModule} from '@angular/fire/auth-guard';
import {UserService} from './user/user.service';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from './reducers';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {AppEffects} from './app.effects';
import {NotFoundComponent} from './not-found/not-found.component';
import {SharedModule} from './shared/shared.module';

@NgModule({
    declarations: [
        AppComponent,
        NotFoundComponent,
    ],
    imports: [
      BrowserModule,
      SharedModule,
      AppRoutingModule,
      FormsModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule,
      AngularFireAuthModule,
      AuthModule,
      WelcomeModule,
      CoreModule,
      BrowserAnimationsModule,
      MaterialModule,
      DarkThemeModule,
      AngularFireAuthGuardModule,
      StoreModule.forRoot(reducers, {
      metaReducers
    }),
      StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
      EffectsModule.forRoot([AppEffects])
    ],
  providers: [CharactersClassService, AuthService, AngularFireAuthGuard, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
