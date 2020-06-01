import {OverlayContainer} from '@angular/cdk/overlay';
import {NgModule} from '@angular/core';

@NgModule({
  // ...
})
export class DarkThemeModule {
  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('dark-theme');
  }
}
