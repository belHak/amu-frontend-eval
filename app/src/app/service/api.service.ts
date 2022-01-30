import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Invoice} from "../type/invoice";
import {Customer} from "../type/customer";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_URL = "https://zkalavdguunjgydiufrn.supabase.co/rest/v1/";
  API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzQ2ODE5MywiZXhwIjoxOTU5MDQ0MTkzfQ.DM7vIfU9wNFnGZggDs9xVorvsNo-1WLGtNQTsrMp_Jc";

  requestOptions = {
    headers: new Headers({
      'apiKey': this.API_KEY
    })
  };

  httpGetOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'apiKey': this.API_KEY,
      'Authorization': 'Bearer '+this.API_KEY
    })
  };

  httpPostOptions = {
    ...this.httpGetOptions,
    'Prefer': 'return=representation'
  }
  CUSTOMERS_BASE = "customers"
  INVOICES_BASE = "invoices"


  constructor(private http: HttpClient) { }

  getAllCustomers(): Observable<Customer[]>{
    return this.http.get<Customer[]>(this.API_URL+this.CUSTOMERS_BASE+"?select=*",this.httpGetOptions);
  }

  getCustomerById(customerId: number): Observable<Customer[]>{
    return this.http.get<Customer[]>(this.API_URL+this.CUSTOMERS_BASE+"?id=eq."+customerId+"&select=*",this.httpGetOptions);
  }

  createCustomer(customer: Customer): Observable<any>{
    return this.http.post<any>(this.API_URL+this.CUSTOMERS_BASE, customer, this.httpPostOptions);
  }

  getInvoicesByCustomerId(customerId: number): Observable<Invoice[]>{
    return this.http.get<Invoice[]>(this.API_URL+this.INVOICES_BASE+"?customer_id=eq."+customerId+"&select=*",this.httpGetOptions);
  }

  createInvoice(invoice: Invoice): Observable<any>{
    return this.http.post<any>(this.API_URL+this.INVOICES_BASE, invoice, this.httpPostOptions);
  }

}

