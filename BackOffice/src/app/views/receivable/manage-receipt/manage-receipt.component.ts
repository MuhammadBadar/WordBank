import { ReceivableService } from '../receivable.service';
import { ReceiptVM } from '../Models/ReceiptVM'
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { CatalogService } from '../../catalog/catalog.service';
import { AppConstants } from 'src/app/app.constants/AppConstants';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomerVM } from '../Models/CustomerVM';


@Component({
  selector: 'app-manage-Receipt',
  templateUrl: './manage-Receipt.component.html',
  styleUrls: ['./manage-Receipt.component.css']
})
export class ManageReceiptComponent implements OnInit {

  @ViewChild('ReceiptForm', { static: true }) ReceiptForm!: NgForm;
  AddMode: boolean = true;
  EditMode: boolean = false;
  dialogRefe: any;
  customers: CustomerVM[];
  customerId: number
  Value?: CustomerVM[];
  dialogData: any;
  selectedReceipt: ReceiptVM
  proccessing: boolean;
  selectedCustomer: CustomerVM;
  cust: any;
  isLoading: boolean;

  constructor(
    public RcvSvc: ReceivableService,
    private injector: Injector,
    private catSvc: CatalogService) {
    this.RcvSvc.selectedReceipt = new ReceiptVM
    this.selectedReceipt = new ReceiptVM
    this.dialogRefe = this.injector.get(MatDialogRef, null);
    this.dialogData = this.injector.get(MAT_DIALOG_DATA, null);
  }
  ngOnInit(): void {
    this.Refresh()
    if (this.dialogData)
      if (this.dialogData.id != undefined) {
        this.selectedReceipt.id = this.dialogData.id
        this.EditMode = true
        this.AddMode = false
        this.GetReceiptById()
      }
    this.GetCustomer();
    this.selectedCustomer = new CustomerVM
    this.selectedReceipt.isActive = true;
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
  GetReceiptById() {
    var rcpt = new ReceiptVM
    rcpt.id = this.selectedReceipt.id
    this.RcvSvc.SearchReceipt(rcpt).subscribe({
      next: (value: ReceiptVM[]) => {
        this.selectedReceipt = value[0]
      }, error: (err) => {
        alert('Error to retrieve Receipt');
        this.catSvc.ErrorMsgBar("Error Occurred", 5000)
      },
    })
  }
  SaveReceipt() {
    debugger
    if (this.selectedReceipt.customerId == 0 || this.selectedReceipt.customerId == undefined)
      this.ReceiptForm.form.controls['customerId'].setErrors({ 'incorrect': true })
    if (!this.ReceiptForm.invalid) {
      if (this.selectedReceipt.id > 0)
        this.UpdateReceipt()
      else {
        this.RcvSvc.SaveReceipt(this.selectedReceipt).subscribe({
          next: (result) => {
            result.resultMessages.forEach(element => {
              if (element.messageType != AppConstants.ERROR_MESSAGE_TYPE) {
                this.catSvc.SuccessMsgBar(element.message,5000)
                this.ngOnInit();
              }
              else
                this.catSvc.ErrorMsgBar(element.message, 5000)
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
  UpdateReceipt() {
    debugger
    this.RcvSvc.UpdateReceipt(this.selectedReceipt).subscribe({
      next: (result) => {
        result.resultMessages.forEach(element => {
          if (element.messageType != AppConstants.ERROR_MESSAGE_TYPE) {
            this.catSvc.SuccessMsgBar(element.message,5000)
            this.ngOnInit();
          }
          else
            this.catSvc.ErrorMsgBar(element.message,5000)
          this.isLoading = false
        })
      }, error: (e) => {
        this.isLoading = false
        this.catSvc.ErrorMsgBar("Error Occurred", 5000)
        console.warn(e);
      }
    })
  } 
  Refresh() {
    this.AddMode = true;
    this.EditMode = false;
    this.proccessing = false
    this.selectedReceipt = new ReceiptVM
  }

}



