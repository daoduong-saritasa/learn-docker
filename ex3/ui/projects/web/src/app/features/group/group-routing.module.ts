import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GroupComponent } from './group.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';

const routes: Routes = [
  {
    path: '',
    component: GroupComponent,
    children: [{ path: ':id', component: GroupDetailComponent }],
  },
];

/** Group routing module. */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupRoutingModule {}
