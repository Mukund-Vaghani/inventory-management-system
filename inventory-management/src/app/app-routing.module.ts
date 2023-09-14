import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { P404Component } from './common/p404/p404.component';
import { CategoryComponent } from './components/dashboard/category/category.component';
import { HomeComponent } from './components/dashboard/home/home.component';
import { ProductComponent } from './components/dashboard/product/product.component';
import { SystemUserComponent } from './components/dashboard/system-user/system-user.component';
import { PurchasProductComponent } from './components/dashboard/purchas-product/purchas-product.component';
import { OutgoingProductComponent } from './components/dashboard/outgoing-product/outgoing-product.component';
import { SupplierComponent } from './components/dashboard/supplier/supplier.component';
import { CustomerComponent } from './components/dashboard/customer/customer.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      {path:'',component:HomeComponent},
      {path:'category', component:CategoryComponent},
      {path:'product',component:ProductComponent},
      {path:'customer',component:CustomerComponent},
      {path:'supplier',component:SupplierComponent},
      {path:'outgoing-product',component:OutgoingProductComponent},
      {path:'purchase-product',component:PurchasProductComponent},
      {path:'system-user',component:SystemUserComponent},
    ]
  },
  {
  path: '**', component: P404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
