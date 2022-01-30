import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCreateComponent } from './customer-create.component';
import {RouterTestingModule} from "@angular/router/testing";
import {ApiService} from "../../service/api.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('CustomerCreateComponent', () => {
  let component: CustomerCreateComponent;
  let fixture: ComponentFixture<CustomerCreateComponent>;
  let httpMock: HttpTestingController;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerCreateComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule],
      providers: [ApiService]
    })
    .compileComponents();

    httpMock = TestBed.get(HttpTestingController);
    apiService = TestBed.get(ApiService);

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create customer', () => {

    //Check that submit button is disabled on init
    const submitButton = fixture.nativeElement.querySelector('#register-customer')
    expect(submitButton.disabled).toBeTrue()

    // Init customer form
    component.customerForm.value.fullName = 'tony jacques';
    component.customerForm.value.email = 'tony@gmail.fr';
    component.onSubmit();

    // Check that submit button is now enabled
    fixture.detectChanges()
    expect(submitButton.disabled).toBeFalse()

    // Check post request after submit
    const postRequest = httpMock.expectOne(apiService.API_URL+'customers');
    postRequest.flush({})
    expect(postRequest.request.method).toBe('POST');
    const body = postRequest.request.body;
    const expectedBody = {
      fullName: "tony jacques",
      email: "tony@gmail.fr"
    }
    expect(body).toEqual(expectedBody);
  })

});
