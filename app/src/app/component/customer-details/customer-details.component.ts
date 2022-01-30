import { Component, OnInit } from '@angular/core';
import {Customer} from "../../type/customer";
import {Invoice} from "../../type/invoice";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../service/api.service";

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  customer: Customer|any= {}
  invoices: Invoice[] = []
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private apiService: ApiService) { }

  ngOnInit(): void {


    let customerId: number;

    this.activatedRoute.params.subscribe(
      params => {
        customerId = params['id']

        // Init customer information
        this.apiService.getCustomerById(customerId).subscribe(
          data => {
            this.customer = data[0]
          }
        );
        // Init invoices of customer
        this.apiService.getInvoicesByCustomerId(customerId).subscribe(
          data => {
            this.invoices = data
          }
        );
      }
    );

  }

  goToCreateInvoice() {
    this.router.navigate([this.customer.id, 'invoices', 'add'])
  }

  goToCustomerList() {
    this.router.navigate([''])
  }
}
