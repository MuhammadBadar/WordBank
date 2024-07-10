
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { InquiryVM } from '../Models/InquiryVM';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { InquiryService } from '../inquiry.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CatalogService } from '../../catalog/catalog.service';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppConstants } from 'src/app/app.constants/AppConstants';



@Component({
  selector: 'app-manage-Inquiry',
  templateUrl: './manage-Inquiry.component.html',
  styleUrls: ['./manage-Inquiry.component.css']
})
export class ManageInquiryComponent implements OnInit{
  @ViewChild('InquiryForm', { static: true }) InquiryForm!: NgForm;
  AddMode: boolean = true;
  EditMode: boolean = false;
  value: InquiryVM
  dialogRefe: any;
  dialogData: any;
  selectedInquiry: InquiryVM
  proccessing: boolean;
  constructor(
    private InqSvc: InquiryService,
    private injector: Injector,
    private catSvc: CatalogService) {
    this.InqSvc.selectedInquiry = new InquiryVM
    this.selectedInquiry = new InquiryVM
    this.dialogRefe = this.injector.get(MatDialogRef, null);
    this.dialogData = this.injector.get(MAT_DIALOG_DATA, null);
  }
  ngOnInit(): void {
    this.Refresh()
    if (this.dialogData)
      if (this.dialogData.id != undefined) {
        this.selectedInquiry.id = this.dialogData.id
        this.EditMode = true
        this.AddMode = false
        this.GetInquiryById()
      }
    this.selectedInquiry.isActive = true;
  }

  GetInquiryById() {
    var cust = new InquiryVM
    cust.id = this.selectedInquiry.id
    this.InqSvc.SearchInquiry(cust).subscribe({
      next: (value: InquiryVM[]) => {
        this.selectedInquiry = value[0]
      }, error: (err) => {
        alert('Error to retrieve Inquiry');
        this.catSvc.ErrorMsgBar("Error Occurred", 5000)
      },
    })
  }
  SaveInquiry() {
   
    if (!this.InquiryForm.invalid) {
      if (this.selectedInquiry.id > 0)
        this.UpdateInquiry()
      else {
        this.InqSvc.SaveInquiry(this.selectedInquiry).subscribe({
          next: (result) => {
            debugger
            result.resultMessages.forEach(element => {
              if (element.messageType != AppConstants.ERROR_MESSAGE_TYPE) {
                this.catSvc.SuccessMsgBar(" Successfully Added", 5000)
                this.ngOnInit();
              }
              else
                this.catSvc.ErrorMsgBar("Please fill all required fields", 5000)
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
  UpdateInquiry() {
    debugger
    this.InqSvc.UpdateInquiry(this.selectedInquiry).subscribe({
      next: (res) => {
        this.catSvc.SuccessMsgBar("Inquiry Successfully Updated!", 5000)
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
    this.selectedInquiry = new InquiryVM
  }

}



