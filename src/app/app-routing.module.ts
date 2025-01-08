import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products/products.component';
import { MainComponent } from './main/main.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

const routes: Routes = [
  { path:"", component: MainComponent},
  { path: 'products', component: ProductsComponent},
  { path: 'contact-us', component: ContactUsComponent},
  { path: 'about-us', component: AboutUsComponent},
  { path: "admin/login", component: AdminLoginComponent},
  { path: "admin/dashboard", component: AdminPanelComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
