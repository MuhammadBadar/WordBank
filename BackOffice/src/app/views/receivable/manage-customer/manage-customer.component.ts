

import { ReceivableService } from '../receivable.service';
import { CustomerVM } from '../Models/CustomerVM';
import { SettingsVM } from '../../catalog/Models/SettingsVM';
import { EnumTypeVM } from '../../security/models/EnumTypeVM';
import { AppConstants } from 'src/app/app.constants/AppConstants';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AfterViewInit, ChangeDetectorRef, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { CatalogService } from 'src/app/views/catalog/catalog.service';
import { duration } from 'moment';


@Component({
  selector: 'app-manage-customer',
  templateUrl: './manage-customer.component.html',
  styleUrls: ['./manage-customer.component.css']
})
export class ManageCustomerComponent implements OnInit {
  @ViewChild('CustomerForm', { static: true }) CustomerForm!: NgForm;
  AddMode: boolean = true;
  EditMode: boolean = false;
  value: CustomerVM
  dialogRefe: any;
  PaymentTerms: SettingsVM[];
  Entities: SettingsVM[];
  Value?: SettingsVM[];
  dialogData: any;
  selectedCustomer: CustomerVM
  proccessing: boolean;
  isLoading: boolean;
  constructor(
    private RcvSvc: ReceivableService,
    private injector: Injector,
    private catSvc: CatalogService) {
    this.RcvSvc.selectedCustomer = new CustomerVM
    this.selectedCustomer = new CustomerVM
    this.dialogRefe = this.injector.get(MatDialogRef, null);
    this.dialogData = this.injector.get(MAT_DIALOG_DATA, null);
  }
  ngOnInit(): void {
    this.Refresh()
    if (this.dialogData)
      if (this.dialogData.id != undefined) {
        this.selectedCustomer.id = this.dialogData.id
        this.EditMode = true
        this.AddMode = false
        this.GetCustomerById()
      }
    this.GetSettings(EnumTypeVM.PaymentTermId);
    this.selectedCustomer.isActive = true;
  }
  GetSettings(etype: EnumTypeVM) {
    var setting = new SettingsVM()
    setting.enumTypeId = etype
    setting.isActive = true
    this.catSvc.SearchSettings(setting).subscribe({
      next: (res: SettingsVM[]) => {
        if (etype === EnumTypeVM.PaymentTermId) {
          this.PaymentTerms = res;
        }
      }, error: (e) => {
        alert("t");
        this.catSvc.ErrorMsgBar("Error Occurred", 4000)
        console.warn(e);
      }
    })
  }
  GetCustomerById() {
    var cust = new CustomerVM
    cust.id = this.selectedCustomer.id
    this.RcvSvc.SearchCustomer(cust).subscribe({
      next: (value: CustomerVM[]) => {
        this.selectedCustomer = value[0]
      }, error: (err) => {
        alert('Error to retrieve Customer');
        this.catSvc.ErrorMsgBar("Error Occurred", 5000)
      },
    })
  }
  SaveCustomer() {
    if (this.selectedCustomer.paymentTermId == 0 || this.selectedCustomer.paymentTermId == undefined)
      this.CustomerForm.form.controls['PaymentTermId'].setErrors({ 'incorrect': true })
    if (!this.CustomerForm.invalid) {
      if (this.selectedCustomer.id > 0)
        this.UpdateCustomer() 
      else {
        this.RcvSvc.SaveCustomer(this.selectedCustomer).subscribe({
          next: (result) => {
            debugger
            result.resultMessages.forEach(element => {
              if (element.messageType != AppConstants.ERROR_MESSAGE_TYPE) {
                this.catSvc.SuccessMsgBar(element.message, 5000)
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
  UpdateCustomer() {
    debugger
    this.RcvSvc.UpdateCustomer(this.selectedCustomer).subscribe({
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
    this.selectedCustomer = new CustomerVM
  }

}



