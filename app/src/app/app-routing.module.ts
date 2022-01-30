import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomerListComponent} from "./component/customer-list/customer-list.component";
import {CustomerCreateComponent} from "./component/customer-create/customer-create.component";
import {CustomerDetailsComponent} from "./component/customer-details/customer-details.component";
import {InvoiceAddComponent} from "./component/invoice-add/invoice-add.component";

const routes: Routes = [
  { path: '', component: CustomerListComponent },
  { path: 'create', component: CustomerCreateComponent },
  { path: ':id', component: CustomerDetailsComponent },
  { path: ':idcustomer/invoices/add', component: InvoiceAddComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
