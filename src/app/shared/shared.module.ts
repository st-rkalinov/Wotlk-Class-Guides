import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WowBtnComponent} from './wow-btn/wow-btn.component';
import {WowModalComponent} from './wow-modal/wow-modal.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ClassesMenuComponent} from './classes-menu/classes-menu.component';
import {CharacterIconComponent} from './character-icon/character-icon.component';
import { StoreModule } from '@ngrx/store';
import * as fromSharedStore from './store';
import { EffectsModule } from '@ngrx/effects';
import { SharedEffects } from './store/shared.effects';

@NgModule({
  declarations: [
    WowBtnComponent,
    WowModalComponent,
    ClassesMenuComponent,
    CharacterIconComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromSharedStore.sharedStateFeatureKey, fromSharedStore.reducers, { metaReducers: fromSharedStore.metaReducers }),
    EffectsModule.forFeature([SharedEffects])
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
