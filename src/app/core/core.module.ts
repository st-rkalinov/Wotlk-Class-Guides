import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {NavigationComponent} from './navigation/navigation.component';
import {WebsiteLogoComponent} from './website-logo/website-logo.component';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../material.module';

@NgModule({
  declarations: [
    HeaderComponent,
    NavigationComponent,
    WebsiteLogoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    HeaderComponent,
  ]
})
export class CoreModule { }
