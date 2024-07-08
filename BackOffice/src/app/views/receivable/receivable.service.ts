import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Globals } from 'src/app/globals';
import { ReceiptVM } from './Models/ReceiptVM';
import {CustomerVM } from './Models/CustomerVM'
import { InvoiceVM } from './Models/InvoiceVM';

@Injectable({
  providedIn: 'root'
})
export class ReceivableService {
  selectedCustomer: CustomerVM;
  selectedInvoice: InvoiceVM;
  selectedReceipt: ReceiptVM;
 

  constructor(private http: HttpClient) {}

  UpdateReceipt(value: ReceiptVM) {
    return this.http.put(Globals.BASE_API_URL + 'Receipt', value);
  }
  
  GetReceiptById(id: number): Observable<ReceiptVM> {
    return this.http.get<ReceiptVM>(Globals.BASE_API_URL + 'Receipt/' + id).pipe()
  }
  SearchReceipt(value: ReceiptVM): Observable<ReceiptVM[]> {
    return this.http.post<ReceiptVM[]>(Globals.BASE_API_URL + 'Receipt/Search', value).pipe();
  }
  GetReceipt(): Observable<ReceiptVM[]> {
    return this.http.get<ReceiptVM[]>(Globals.BASE_API_URL + 'Receipt').pipe();
  }
  SaveReceipt(value: ReceiptVM): Observable<any> {
    return this.http.post(Globals.BASE_API_URL + 'Receipt', value);
  }
  DeleteReceipt(id: number) {
    return this.http.delete(Globals.BASE_API_URL + 'Receipt/' + id);
  }

  UpdateCustomer(value: CustomerVM) {
    return this.http.put(Globals.BASE_API_URL + 'Customer', value);
  }
  
  GetCustomerById(id: number): Observable<CustomerVM> {
    return this.http.get<CustomerVM>(Globals.BASE_API_URL + 'Customer/' + id).pipe()
  }
  SearchCustomer(value: CustomerVM): Observable<CustomerVM[]> {
    return this.http.post<CustomerVM[]>(Globals.BASE_API_URL + 'Customer/Search', value).pipe();
  }
  GetCustomer(): Observable<CustomerVM[]> {
    return this.http.get<CustomerVM[]>(Globals.BASE_API_URL + 'Customer').pipe();
  }
  SaveCustomer(value: CustomerVM): Observable<any> {
    return this.http.post(Globals.BASE_API_URL + 'Customer', value);
  }
  DeleteCustomer(id: number) {
    return this.http.delete(Globals.BASE_API_URL + 'Customer/' + id);
  }

  UpdateInvoice(value: CustomerVM) {
    return this.http.put(Globals.BASE_API_URL + 'Customer', value);
  }
  
  GetInvoiceById(id: number): Observable<InvoiceVM> {
    return this.http.get<InvoiceVM>(Globals.BASE_API_URL + 'Invoice/' + id).pipe()
  }
  SearchInvoice(value: InvoiceVM): Observable<InvoiceVM[]> {
    return this.http.post<InvoiceVM[]>(Globals.BASE_API_URL + 'Invoice/Search', value).pipe();
  }
  GetInvoice(): Observable<InvoiceVM[]> {
    return this.http.get<InvoiceVM[]>(Globals.BASE_API_URL + 'Invoice').pipe();
  }
  SaveInvoice(value: InvoiceVM): Observable<any> {
    return this.http.post(Globals.BASE_API_URL + 'Invoice', value);
  }
  DeleteInvoice(id: number) {
    return this.http.delete(Globals.BASE_API_URL + 'Invoice/' + id);
  }



}
 