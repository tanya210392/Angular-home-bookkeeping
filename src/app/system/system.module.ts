import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '../common/common.module';
import { SystemRoutingModule } from './system-routing.module';

import { DropdownDirective } from './common/directives/dropdown.directive';
import { SystemComponent } from './system.component';
import { BillPageComponent } from './bill-page/bill-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { PlanningPageComponent } from './planning-page/planning-page.component';
import { SidebarComponent } from './common/components/sidebar/sidebar.component';
import { HeaderComponent } from './common/components/header/header.component';
import { BillCardComponent } from './bill-page/bill-card/bill-card.component';
import { CurrencyCardComponent } from './bill-page/currency-card/currency-card.component';
import { BillService } from './common/services/bill.service';
import { RecordsPageComponent } from './records-page/records-page.component';
import { AddCategoryComponent } from './records-page/add-category/add-category.component';
import { EditCategoryComponent } from './records-page/edit-category/edit-category.component';
import { AddEventComponent } from './records-page/add-event/add-event.component';

@NgModule({
  declarations: [
    SystemComponent,
    BillPageComponent,
    HistoryPageComponent,
    PlanningPageComponent,
    SidebarComponent,
    HeaderComponent,
    DropdownDirective,
    BillCardComponent,
    CurrencyCardComponent,
    RecordsPageComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    AddEventComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    SystemRoutingModule
  ],
  providers: [BillService]
})
export class SystemModule { }
