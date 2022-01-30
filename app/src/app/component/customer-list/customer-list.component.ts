import { Component, OnInit } from '@angular/core';
import {Customer} from "../../type/customer";
import {ApiService} from "../../service/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customers: Customer[] = []


  constructor(private apiService: ApiService,
              private router: Router) { }

  ngOnInit(): void {
    this.apiService.getAllCustomers().subscribe(
      data => {
        this.customers = data
      }
    )
  }

  goToCustomerDetails(customerId: number){
    this.router.navigate([customerId])
  }

  goToCreateClient() {
    this.router.navigate(['create'])
  }
}

