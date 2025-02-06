import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppSalesGraphComponent } from './app-sales-graph/app-sales-graph.component';

const routes: Routes = [
  {
    path:'dashboard',
    component:AppSalesGraphComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
