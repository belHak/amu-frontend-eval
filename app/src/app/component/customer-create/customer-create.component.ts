import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../service/api.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {


  customerForm = new FormGroup({
    fullName: new FormControl(),
    email: new FormControl()
  });

  constructor(private api: ApiService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.api.createCustomer(this.customerForm.value).subscribe(
      ()=> {
        this.router.navigate([''])
      }, error => {
        console.log(error)
      }
    )
  }

  returnToCustomerList() {
      this.router.navigate([''])
  }
}

