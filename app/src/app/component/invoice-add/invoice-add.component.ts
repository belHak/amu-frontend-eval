import {Component, OnInit} from '@angular/core';
import {Customer} from "../../type/customer";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../service/api.service";

@Component({
  selector: 'app-invoice-add',
  templateUrl: './invoice-add.component.html',
  styleUrls: ['./invoice-add.component.css']
})
export class InvoiceAddComponent implements OnInit {

  customer: Customer | any = null
  invoiceStatusValues = [
    {id: "PAID", value: "Payée"},
    {id: "SENT", value: "Envoyée"},
  ]

  invoiceForm = new FormGroup({
    amount: new FormControl(),
    status: new FormControl(this.invoiceStatusValues[0].id) /* Init invoice status dropdown on 'paid' value by default */
  });


  constructor(private activatedRoute: ActivatedRoute,
              private apiService: ApiService,
              private router: Router) {
  }

  ngOnInit(): void {
    let customerId: number;

    this.activatedRoute.params.subscribe(
      params => {
        customerId = params['id_customer']

        // Init customer information
        this.apiService.getCustomerById(customerId).subscribe(
          data => {
            this.customer = data[0]
          }
        );

      }
    );

  }

  onSubmit() {
    const invoice = {...this.invoiceForm.value, customer_id: this.customer.id}
    this.apiService.createInvoice(invoice).subscribe(
      (result) => {
        this.router.navigate([this.customer.id])
      }
    )
  }

  returnToCustomer() {
    this.router.navigate([this.customer.id])
  }
}
