import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CharacterIconComponent } from './ui/character-icon/character-icon.component';
import {CharactersClassService} from './character-class/characters-class.service';
import {ReactiveFormsModule} from '@angular/forms';
import { LogRegComponent } from './auth/log-reg/log-reg.component';
import { WowModalComponent } from './ui/wow-modal/wow-modal.component';
import {AuthService} from './auth/auth.service';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { WowBtnComponent } from './ui/wow-btn/wow-btn.component';
import { WowItemComponent } from './ui/wow-item/wow-item.component';
import { GuidesListComponent } from './guide/guides-list/guides-list.component';
import { ClassesMenuComponent } from './ui/classes-menu/classes-menu.component';
import { AllGuidesComponent } from './guide/all-guides/all-guides.component';
import { SpecificGuidesComponent } from './guide/specific-guides/specific-guides.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    SignupComponent,
    NavigationComponent,
    CharacterIconComponent,
    LogRegComponent,
    WowModalComponent,
    WowBtnComponent,
    WowItemComponent,
    GuidesListComponent,
    ClassesMenuComponent,
    AllGuidesComponent,
    SpecificGuidesComponent,
  ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      ReactiveFormsModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule
    ],
  providers: [CharactersClassService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
