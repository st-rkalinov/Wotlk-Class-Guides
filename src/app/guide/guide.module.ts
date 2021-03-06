import {NgModule} from '@angular/core';
import {GuidesComponent} from './guides/guides.component';
import {NewGuideComponent} from './new-guide/new-guide.component';
import {SharedModule} from '../shared/shared.module';
import {GuideRoutingModule} from './guide-routing.module';
import {WowItemComponent} from './components/wow-item/wow-item.component';
import {MaterialModule} from '../material.module';
import {StoreModule} from '@ngrx/store';
import * as fromGuideState from './store';
import {EffectsModule} from '@ngrx/effects';
import {GuideEffects} from './store/guide.effects';
import {ClassesMenuDropdownsComponent} from './components/classes-menu-dropdowns/classes-menu-dropdowns.component';
import {GuideComponent} from './guide/guide.component';
import {HomeModule} from '../home/home.module';

@NgModule({
  declarations: [
    GuidesComponent,
    NewGuideComponent,
    WowItemComponent,
    ClassesMenuDropdownsComponent,
    GuideComponent,
  ],
  imports: [
    SharedModule,
    GuideRoutingModule,
    MaterialModule,
    StoreModule.forFeature(fromGuideState.guideStateFeatureKey, fromGuideState.reducers, {metaReducers: fromGuideState.metaReducers}),
    EffectsModule.forFeature([GuideEffects]),
    HomeModule
  ]
})
export class GuideModule {
}
