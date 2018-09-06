import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SystemComponent } from './system.component';
import { BillPageComponent } from './bill-page/bill-page.component';
import { PlanningPageComponent } from './planning-page/planning-page.component';
import { RecordsPageComponent } from './records-page/records-page.component';

const routes: Routes = [
  {
    path: 'system',
    component: SystemComponent,
    children: [
      {path: 'bill', component: BillPageComponent},
      {path: 'planning', component: PlanningPageComponent},
      {path: 'records', component: RecordsPageComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
