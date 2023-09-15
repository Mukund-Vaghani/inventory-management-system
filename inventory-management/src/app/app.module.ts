import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './components/modal/modal.component';
import { P404Component } from './common/p404/p404.component';
import { CategoryComponent } from './components/dashboard/category/category.component'
import { HomeComponent } from './components/dashboard/home/home.component';
import { ProductComponent } from './components/dashboard/product/product.component';
import { CustomerComponent } from './components/dashboard/customer/customer.component';
import { SupplierComponent } from './components/dashboard/supplier/supplier.component';
import { OutgoingProductComponent } from './components/dashboard/outgoing-product/outgoing-product.component';
import { PurchasProductComponent } from './components/dashboard/purchas-product/purchas-product.component';
import { SystemUserComponent } from './components/dashboard/system-user/system-user.component';
import { CategoryModalComponent } from './components/dashboard/category/category-modal/category-modal.component';
import { ProductModalComponent } from './components/dashboard/product/product-modal/product-modal.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    ModalComponent,
    P404Component,
    CategoryComponent,
    HomeComponent,
    ProductComponent,
    CustomerComponent,
    SupplierComponent,
    OutgoingProductComponent,
    PurchasProductComponent,
    SystemUserComponent,
    CategoryModalComponent,
    ProductModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
