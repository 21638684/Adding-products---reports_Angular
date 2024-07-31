import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Account/login/login.component';
import { RegisterComponent } from './Account/register/register.component';
import { ProductsComponent } from './Products/products/products.component';
import { AddProductComponent } from './Products/add-product/add-product.component';
import { ReportComponent } from './Reports/report/report.component';
import { LogoutComponent } from './Account/logout/logout.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent }, 
  { path: 'logout', component: LogoutComponent }, 
  { path: 'products', component:  ProductsComponent }, 
  { path: 'add-product', component: AddProductComponent },  
  { path: 'report', component:  ReportComponent }, 
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
