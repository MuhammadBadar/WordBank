
import { Component, OnInit } from '@angular/core';
import { InquiryVM } from '../Models/InquiryVM';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { InquiryService } from '../inquiry.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CatalogService } from '../../catalog/catalog.service';



@Component({
  selector: 'app-manage-Inquiry',
  templateUrl: './manage-Inquiry.component.html',
  styleUrls: ['./manage-Inquiry.component.css']
})
export class ManageInquiryComponent implements OnInit{
  Add: boolean = true;
  Edit: boolean = false;
 
  inq: InquiryVM[]
  inqId: number
  proccessing: boolean;
 /*  dialogRef: any;
  dialog: any; */
  constructor(
    private route: ActivatedRoute,
 private catSvc: CatalogService, 
   private snack: MatSnackBar,
    public inqSvc: InquiryService
  ) {
    this.inqSvc.selectedInquiry = new InquiryVM
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      
       this.inqId = params['id'];
    });
    if (this.inqId > 0) {
      this.Edit = true;
      this.Add = false;
      this.GetInquiryById();
    }
  }
  PutInquiry() {
    console.warn(this.inqSvc.selectedInquiry)
    this.inqSvc.UpdateInquiry(this.inqSvc.selectedInquiry).subscribe((data) => {
      this.catSvc.SuccessfullyUpdateMsg()
    },
      (err: any) => {
        this.snack.open('Error Occured!', 'OK', { duration: 4000 })

      });
  }
  UpdateInquiry() {
    debugger
    this.inqSvc.UpdateInquiry(this.inqSvc.selectedInquiry).subscribe({
      next: (res) => {

        this.catSvc.SuccessMsgBar("Inquiry Successfully Updated!", 5000)
        this.Add = true;
        this.Edit = false;
        this.proccessing = false
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
    this.Add = true;
    this.Edit = false;
  }
  GetInquiryById() {
    debugger
    this.inqSvc.selectedInquiry.id = this.inqId
    this.inqSvc.SearchInquiry(this.inqSvc.selectedInquiry).subscribe((res: InquiryVM[]) => {
      this.inq = res;
      this.inqSvc.selectedInquiry = this.inq[0]
    });
  } 
  
  SaveInquiry() {
    this.inqSvc.SaveInquiry(this.inqSvc.selectedInquiry).subscribe({
      next: (value) => {
        this.catSvc.SuccessMsgBar("Successfully Added", 5000)
        this.Refresh();
      }, error: (err) => {
        console.warn(err)
        this.catSvc.ErrorMsgBar("Error Occurred", 5000)
      },
    })
  }
 /*  SaveInquiry() {
    if (this.inqId > 0) {
      this.PutInquiry();
    } else {
      this.inqSvc.SaveInquiry(this.inqSvc.selectedInquiry).subscribe((res: InquiryVM) => {
        this.snack.open('inquiry SuccessFully Saved!', 'OK', { duration: 4000 })
      },
        (err: any) => {
          alert('Error')
        });
    }
  } */
}

