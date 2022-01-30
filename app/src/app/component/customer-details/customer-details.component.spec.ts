import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetailsComponent } from './customer-details.component';
import {RouterTestingModule} from "@angular/router/testing";
import {ApiService} from "../../service/api.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {ActivatedRoute, convertToParamMap} from "@angular/router";
import {Observable, of} from "rxjs";

describe('CustomerDetailsComponent', () => {
  let component: CustomerDetailsComponent;
  let fixture: ComponentFixture<CustomerDetailsComponent>;
  let httpMock: HttpTestingController;
  let apiService: ApiService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerDetailsComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule],
      providers: [
        ApiService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({id: 1})
          }
        }
      ]
    })
    .compileComponents();

    httpMock = TestBed.get(HttpTestingController);
    apiService = TestBed.get(ApiService)

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init customer', () => {
    const customer =[
      {id: 1, fullName: "tony Claw", email: 'tony@gmail.fr'}
    ]
    // Check that component init customer details
    const req = httpMock.expectOne(apiService.API_URL+'customers?id=eq.1&select=*');
    expect(req.request.method).toBe("GET");
    req.flush(customer);
    fixture.detectChanges();

    // Check customer attributes
    expect(component.customer).toBeDefined();
    expect(component.customer.id).toBe(1);
    expect(component.customer.email).toBe("tony@gmail.fr");
    expect(component.customer.fullName).toBe("tony Claw");

  })

  it('should init invoices', () => {
    const invoices =[
      {id: 1, amount: 500, status: 'PAID'}
    ]
    // Check that component init invoices
    const req = httpMock.expectOne(apiService.API_URL+'invoices?customer_id=eq.1&select=*');
    expect(req.request.method).toBe("GET");
    req.flush(invoices);
    fixture.detectChanges();

    // Check invoice attributes
    expect(component.invoices).toBeDefined();
    expect(component.invoices.length).toBe(1)
    expect(component.invoices[0].id).toBe(1);
    expect(component.invoices[0].amount).toBe(500);
    expect(component.invoices[0].status).toBe("PAID");

  })


});
