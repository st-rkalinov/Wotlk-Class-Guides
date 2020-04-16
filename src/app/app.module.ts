import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CharacterIconComponent } from './character-class/character-icon/character-icon.component';
import {CharactersClassService} from './character-class/characters-class.service';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    SignupComponent,
    NavigationComponent,
    CharacterIconComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [CharactersClassService],
  bootstrap: [AppComponent]
})
export class AppModule { }
