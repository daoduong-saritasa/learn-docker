import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommonSharedModule } from '@saanbo/common/shared/common-shared.module';

import { GroupRoutingModule } from './group-routing.module';
import { GroupComponent } from './group.component';

/** Group module. */
@NgModule({
  declarations: [GroupComponent],
  imports: [
    CommonModule,
    GroupRoutingModule,
    CommonSharedModule,
  ],
})
export class GroupModule {}
