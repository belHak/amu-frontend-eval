import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceAddComponent } from './invoice-add.component';
import {RouterTestingModule} from "@angular/router/testing";
import {ApiService} from "../../service/api.service";

describe('InvoiceAddComponent', () => {
  let component: InvoiceAddComponent;
  let fixture: ComponentFixture<InvoiceAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceAddComponent ],
      imports: [ RouterTestingModule],
      providers: [ApiService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
