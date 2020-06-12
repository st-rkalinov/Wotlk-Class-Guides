import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WowBtnComponent} from './wow-btn/wow-btn.component';
import {WowModalComponent} from './wow-modal/wow-modal.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ClassesMenuDropdownsComponent} from '../guide/components/classes-menu-dropdowns/classes-menu-dropdowns.component';
import {CharacterIconComponent} from './character-icon/character-icon.component';
import { StoreModule } from '@ngrx/store';
import * as fromSharedStore from './store';
import { EffectsModule } from '@ngrx/effects';
import { SharedEffects } from './store/shared.effects';
import {MaterialModule} from '../material.module';

@NgModule({
  declarations: [
    WowBtnComponent,
    WowModalComponent,
    CharacterIconComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    StoreModule.forFeature(fromSharedStore.sharedStateFeatureKey, fromSharedStore.reducers, { metaReducers: fromSharedStore.metaReducers }),
    EffectsModule.forFeature([SharedEffects])
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    WowBtnComponent,
    WowModalComponent,
    CharacterIconComponent
  ]
})
export class SharedModule { }
