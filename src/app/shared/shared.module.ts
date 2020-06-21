import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WowBtnComponent} from './wow-btn/wow-btn.component';
import {WowModalComponent} from './wow-modal/wow-modal.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CharacterIconComponent} from './character-icon/character-icon.component';
import {StoreModule} from '@ngrx/store';
import * as fromSharedStore from './store';
import {EffectsModule} from '@ngrx/effects';
import {SharedEffects} from './store/shared.effects';
import {MaterialModule} from '../material.module';
import {GuidesListComponent} from './guides-list/guides-list.component';
import {SpinnerComponent} from './spinner/spinner.component';

@NgModule({
  declarations: [
    WowBtnComponent,
    WowModalComponent,
    CharacterIconComponent,
    GuidesListComponent,
    SpinnerComponent
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
    CharacterIconComponent,
    GuidesListComponent,
    SpinnerComponent
  ]
})
export class SharedModule { }
