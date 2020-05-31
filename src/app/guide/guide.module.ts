import { NgModule } from '@angular/core';
import {GuidesComponent} from './guides/guides.component';
import {GuidesListComponent} from './components/guides-list/guides-list.component';
import {NewGuideComponent} from './new-guide/new-guide.component';
import {SharedModule} from '../shared/shared.module';
import {GuideRoutingModule} from './guide-routing.module';
import {WowItemComponent} from './components/wow-item/wow-item.component';
import {SpecMenuComponent} from './components/spec-menu/spec-menu.component';

@NgModule({
  declarations: [
    GuidesComponent,
    GuidesListComponent,
    NewGuideComponent,
    WowItemComponent,
    SpecMenuComponent
  ],
  imports: [
    SharedModule,
    GuideRoutingModule
  ]
})
export class GuideModule { }
