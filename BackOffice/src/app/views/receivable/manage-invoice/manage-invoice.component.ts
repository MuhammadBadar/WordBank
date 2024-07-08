import { ReceivableService } from '../receivable.service';
import { InvoiceVM } from '../Models/InvoiceVM'
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { CatalogService } from '../../catalog/catalog.service';
import { AppConstants } from 'src/app/app.constants/AppConstants';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomerVM } from '../Models/CustomerVM';
import { error } from 'console';


@Component({
  selector: 'app-manage-invoice',
  templateUrl: './manage-invoice.component.html',
  styleUrls: ['./manage-invoice.component.css']
})
export class ManageInvoiceComponent implements OnInit {

  @ViewChild('InvoiceForm', { static: true }) InvoiceForm!: NgForm;
  AddMode: boolean = true;
  EditMode: boolean = false;
  dialogRefe: any;
  customers: CustomerVM[];
  Value?: CustomerVM[];
  dialogData: any;
  selectedInvoice: InvoiceVM
  proccessing: boolean;
  selectedCustomer: CustomerVM;

  constructor(
    public RcvSvc: ReceivableService,
    private injector: Injector,
    private catSvc: CatalogService) {
    this.RcvSvc.selectedInvoice = new InvoiceVM
    this.selectedInvoice = new InvoiceVM
    this.dialogRefe = this.injector.get(MatDialogRef, null);
    this.dialogData = this.injector.get(MAT_DIALOG_DATA, null);
  }
  ngOnInit(): void {
    this.Refresh()
    if (this.dialogData)
      if (this.dialogData.id != undefined) {
        this.selectedInvoice.customerId = this.dialogData.id
        this.EditMode = true
        this.AddMode = false
        this.GetInvoiceById()
      }
    this.GetCustomer();
    this.selectedCustomer = new CustomerVM
    this.selectedInvoice.isActive = true;
  }
  GetCustomer() {
    debugger
    var customers = new CustomerVM()
    customers.isActive = true
    this.RcvSvc.SearchCustomer(customers).subscribe({
      next: (res: CustomerVM[]) => {
        this.customers = res;
        console.warn(res);
      }, error: (e) => {
        alert("t");
        this.catSvc.ErrorMsgBar("Error Occurred", 4000)
        console.warn(e);
      }
    })
  }

  GetInvoiceById() {
    var inv = new InvoiceVM
    inv.id = this.selectedInvoice.id
    this.RcvSvc.SearchInvoice(inv).subscribe({
      next: (value: InvoiceVM[]) => {
        this.selectedInvoice = value[0]
      }, error: (err) => {
        alert('Error to retrieve Invoice');
        this.catSvc.ErrorMsgBar("Error Occurred", 5000)
      },
    })
  }
  SaveInvoice() {
    debugger
    if (this.selectedInvoice.customerId == 0 || this.selectedInvoice.customerId == undefined)
      this.InvoiceForm.form.controls['customerId'].setErrors({ 'incorrect': true })
    if (!this.InvoiceForm.invalid) {
      if (this.selectedInvoice.id > 0)
        this.UpdateInvoice()
      else {
        this.RcvSvc.SaveInvoice(this.selectedInvoice).subscribe({
          next: (result) => {
            result.resultMessages.forEach(element => {
              if (element.messageType != AppConstants.ERROR_MESSAGE_TYPE) {
                this.catSvc.SuccessMsgBar("Successfully Added", 5000)
                this.ngOnInit();
              }
              else
                this.catSvc.ErrorMsgBar("Error Occurred", 5000)
              this.catSvc.isLoading = false
            });
          }, error: (e) => {
            this.catSvc.ErrorMsgBar("Error Occurred", 5000)
            console.warn(e);
            this.catSvc.isLoading = false
          }

        })
      }
    }
    else
      this.catSvc.ErrorMsgBar("Please fill all required fields", 5000)
  }
  UpdateInvoice() {
    debugger
    this.RcvSvc.UpdateInvoice(this.selectedInvoice).subscribe({
      next: (res) => {
        this.catSvc.SuccessMsgBar("Invoice Successfully Updated!", 5000)
        this.ngOnInit();
      }, error: (e) => {
        this.catSvc.ErrorMsgBar("Error Occurred", 5000)
        console.warn(e);
        this.proccessing = false
      }
    })
    this.proccessing = false
  }
  Refresh() {
    this.AddMode = true;
    this.EditMode = false;
    this.proccessing = false
    this.selectedInvoice = new InvoiceVM
  }

}



