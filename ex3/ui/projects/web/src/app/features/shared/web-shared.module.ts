import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './components/navbar/navbar.component';
import { CheckmarkComponent } from './components/checkmark/checkmark.component';

/** Module that contains entities shared between features/layouts. */
@NgModule({
  declarations: [NavbarComponent, CheckmarkComponent],
  providers: [],
  imports: [CommonModule],
  exports: [NavbarComponent, CheckmarkComponent],
})
export class WebSharedModule {}
