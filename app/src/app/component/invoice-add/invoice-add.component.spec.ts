import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceAddComponent } from './invoice-add.component';
import {RouterTestingModule} from "@angular/router/testing";
import {ApiService} from "../../service/api.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('InvoiceAddComponent', () => {
  let component: InvoiceAddComponent;
  let fixture: ComponentFixture<InvoiceAddComponent>;
  let httpMock: HttpTestingController;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceAddComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule],
      providers: [ApiService]
    })
    .compileComponents();

    httpMock = TestBed.get(HttpTestingController);
    apiService = TestBed.get(ApiService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add invoice', () => {

    //Check that submit button is disabled on init
    const submitButton = fixture.nativeElement.querySelector('#register-invoice')
    expect(submitButton.disabled).toBeTrue()

    // Init invoice form
    component.invoiceForm.value.status = "PAID"
    component.invoiceForm.value.amount = 400
    component.customer = {
      id: 1
    }
    component.onSubmit();

    // Check that submit button is now enabled
    fixture.detectChanges()
    expect(submitButton.disabled).toBeFalse()

    // Check post request after submit
    const postRequest = httpMock.expectOne(apiService.API_URL+'invoices');
    postRequest.flush({})
    expect(postRequest.request.method).toBe('POST');
    const body = postRequest.request.body;
    const expectedBody = {
      status: "PAID",
      amount: 400,
      customer_id: 1
    }
    expect(body).toEqual(expectedBody);
  })
});
