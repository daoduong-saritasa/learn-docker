import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './components/navbar/navbar.component';

/** Module that contains entities shared between features/layouts. */
@NgModule({
  declarations: [NavbarComponent],
  providers: [],
  imports: [CommonModule],
  exports: [NavbarComponent],
})
export class WebSharedModule {}
