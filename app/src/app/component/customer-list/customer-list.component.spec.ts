import {ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';

import { CustomerListComponent } from './customer-list.component';
import {RouterTestingModule} from "@angular/router/testing";
import {ApiService} from "../../service/api.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {By} from "@angular/platform-browser";

describe('CustomerListComponent', () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;
  let httpMock: HttpTestingController;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerListComponent ],
      imports: [ HttpClientTestingModule,RouterTestingModule],
      providers: [ApiService]
    })
    .compileComponents();

    httpMock = TestBed.get(HttpTestingController);
    apiService = TestBed.get(ApiService);

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should print customers', () => {

    const customers = [
      {fullName: "tony Claw", email: 'tony@gmail.fr'},
      {fullName: "jacque jean", email: 'jacque@gmail.fr'}
    ]

    // Check that component init customers by api call
    const req = httpMock.expectOne(apiService.API_URL+'customers?select=*');
    expect(req.request.method).toBe("GET");
    req.flush(customers);
    fixture.detectChanges();

    const customersTable: HTMLElement = fixture.nativeElement.querySelector('#customer-list')
    expect(customersTable.querySelectorAll('tr').length).toEqual(3, "Table must contains 3 rows, title + 2  customers");

    const customersRows = customersTable.querySelectorAll('#customer')
    expect(customersRows.length).toEqual(2, "table must contains 2 customers")

    // Check each customer row
    customersRows.forEach(customerRow => {
      const customerFullName = customerRow.querySelector('#customer-fullName');
      const customerEmail = customerRow.querySelector('#customer-email');
      if(customerFullName && customerFullName.textContent == "tony Claw" ){

        if(customerEmail){
          expect(customerEmail.textContent).toEqual("tony@gmail.fr")
        } else {
          fail();
        }
      } else if(customerFullName && customerFullName.textContent == "jacque jean"){

        if(customerEmail){
          expect(customerEmail.textContent).toEqual("jacque@gmail.fr")
        } else {
          fail();
        }
      } else {
        fail()
      }
    })

  })

});
