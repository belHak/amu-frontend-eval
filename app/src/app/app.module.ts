import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerCreateComponent } from './component/customer-create/customer-create.component';
import { CustomerDetailsComponent } from './component/customer-details/customer-details.component';
import { CustomerListComponent } from './component/customer-list/customer-list.component';
import { InvoiceAddComponent } from './component/invoice-add/invoice-add.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ApiService} from "./service/api.service";

@NgModule({
  declarations: [
    AppComponent,
    CustomerCreateComponent,
    CustomerDetailsComponent,
    CustomerListComponent,
    InvoiceAddComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
