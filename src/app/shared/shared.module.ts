import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WowBtnComponent} from './wow-btn/wow-btn.component';
import {WowModalComponent} from './wow-modal/wow-modal.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ClassesMenuComponent} from './classes-menu/classes-menu.component';
import {CharacterIconComponent} from './character-icon/character-icon.component';

@NgModule({
  declarations: [
    WowBtnComponent,
    WowModalComponent,
    ClassesMenuComponent,
    CharacterIconComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    WowBtnComponent,
    WowModalComponent,
    ClassesMenuComponent,
    CharacterIconComponent
  ]
})
export class SharedModule { }
