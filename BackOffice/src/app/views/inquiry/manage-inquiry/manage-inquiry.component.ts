
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
import { ServiceVM } from '../Models/ServiceVM';



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
  selectedInquiry: InquiryVM
 Services : ServiceVM[];
 selectedServices : ServiceVM
  proccessing: boolean;
  isLoading: boolean;
  dataSource: any;
  inquiry: InquiryVM[];
  inqId: number;
  constructor(
    private InqSvc: InquiryService,
    private route: ActivatedRoute,
    private catSvc: CatalogService) {
    this.selectedInquiry = new InquiryVM
  }
  ngOnInit(): void {
    this.Refresh()
    this.route.queryParams.subscribe(params => {
      
      this.inqId = params['id'];
   });
   if (this.inqId > 0) {
     this.EditMode = true;
     this.AddMode = false;
     this.GetInquiryById();
   }
    this.GetService();
    this.selectedServices = new ServiceVM
    this.selectedInquiry.isActive = true;
  }
  GetService() {
    this.isLoading=true
    var Services = new ServiceVM
    this.InqSvc.SearchService(Services).subscribe({
      next: (res: ServiceVM[]) => {
        this.Services = res
        this.dataSource = new MatTableDataSource(res)
        this.isLoading=false
      }, error: (e) => {
        console.warn(e)
        this.catSvc.ErrorMsgBar("Error Occurred", 4000)
      }
    })
  }
 

  updateServices(service) {
    const index = this.selectedInquiry.selectedServiceIds.indexOf(service);
    if (index !== -1)
      this.selectedInquiry.selectedServiceIds.splice(index, 1);
    else
    this.selectedInquiry.selectedServiceIds.push(service);
 
  } 
  GetInquiry() {
    this.InqSvc.GetInquiry().subscribe({
      next: (value: InquiryVM[]) => {
        debugger;
        this.inquiry = value
        this.dataSource = new MatTableDataSource(this.inquiry)
      }, error: (err) => {
        alert('Error to retrieve Inquiry');
        this.catSvc.ErrorMsgBar("Error Occurred", 5000)
      },
    })
  }
  GetInquiryById() {
    debugger
    this.selectedInquiry.id = this.inqId
    this.InqSvc.SearchInquiry(this.selectedInquiry).subscribe((res: InquiryVM[]) => {
      this.inquiry = res;
      this.selectedInquiry = this.inquiry[0]
    });
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
  UpdateInquiry() {
    debugger
    this.InqSvc.UpdateInquiry(this.selectedInquiry).subscribe({
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
    this.selectedInquiry = new InquiryVM
  }

}



