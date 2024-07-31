import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './Account/login/login.component';
import { RegisterComponent } from './Account/register/register.component';
import { ProductsComponent } from './Products/products/products.component';
import { FormsModule } from '@angular/forms';
import { AddProductComponent } from './Products/add-product/add-product.component';
import { ReportComponent } from './Reports/report/report.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // <-- Import FormsModule here
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LogoutComponent } from './Account/logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProductsComponent,
    AddProductComponent,
    ReportComponent,
    LogoutComponent,
    
 ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatIconModule, // Import MatIconModule
    MatTreeModule, // Import MatTreeModule
    MatListModule,
  
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
