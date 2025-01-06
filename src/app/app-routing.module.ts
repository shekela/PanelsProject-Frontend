import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products/products.component';
import { MainComponent } from './main/main.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';

const routes: Routes = [
  {path:"", component: MainComponent},
  { path: 'products', component: ProductsComponent },
  {path: "admin/dashboard", component: AdminPanelComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
