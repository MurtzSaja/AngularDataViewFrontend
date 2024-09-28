import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgencyDetailsComponent } from './agency-details/agency-details.component';
import { DataViewTableComponent } from './data-view-table/data-view-table.component';

const routes: Routes = [
  { path: '', redirectTo: '/DataView', pathMatch: 'full' },
  { path: 'DataView', component: DataViewTableComponent },
  { path: 'AgencyDetails/:id', component: AgencyDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
