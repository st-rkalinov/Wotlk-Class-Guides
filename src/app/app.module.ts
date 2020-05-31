import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule,
      AngularFireAuthModule,
      AuthModule,
      WelcomeModule,
      CoreModule
    ],
  providers: [CharactersClassService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
