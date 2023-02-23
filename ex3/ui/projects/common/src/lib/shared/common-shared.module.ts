import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { FormErrorWrapperComponent } from './components/form-error-wrapper/form-error-wrapper.component';

import { LabelComponent } from './components/label/label.component';
import { ValidationMessageComponent } from './components/validation-message/validation-message.component';
import { LoadingDirective } from './directives/loading.directive';

const PRIVATE_DECLARATIONS: Type<unknown>[] = [ValidationMessageComponent];

const EXPORTED_DECLARATIONS: Type<unknown>[] = [
  LoadingDirective,
  LabelComponent,
  FormErrorWrapperComponent,
];

const EXPORTED_MODULES: Type<unknown>[] = [MatIconModule];

/** Common module. Contains entities shared across applications. */
@NgModule({
  declarations: [...PRIVATE_DECLARATIONS, ...EXPORTED_DECLARATIONS],
  imports: [
    CommonModule,
    ...EXPORTED_MODULES,
  ],
  exports: [...EXPORTED_DECLARATIONS, ...EXPORTED_MODULES],
})
export class CommonSharedModule {}
