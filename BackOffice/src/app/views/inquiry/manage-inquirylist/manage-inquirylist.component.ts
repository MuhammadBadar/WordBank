
import { Component, Injector, OnInit } from '@angular/core';
import { InquiryVM } from '../Models/InquiryVM';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { InquiryService } from '../inquiry.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ManageInquiryFollowUpComponent } from '../manage-inquiry-follow-up/manage-inquiry-follow-up.component';
import { CatalogService } from '../../catalog/catalog.service';
import { ManageInquiryComponent } from '../manage-inquiry/manage-inquiry.component';
import { EmailComponent } from '../email/email.component';
import { SMSComponent } from '../sms/sms.component';


@Component({
  selector: 'app-manage-Inquirylist',
  templateUrl: './manage-Inquirylist.component.html',
  styleUrls: ['./manage-Inquirylist.component.css']
})
export class ManageInquirylistComponent {

 
  displayedColumns = ['inquiryName', 'inquiryEmail', 'inquiryCell', 'inquiryComments', 'actions']
  isLoading: boolean = false
  dataSource: any
  inquiry: InquiryVM[];
  EditMode: boolean;
  AddMode: boolean;
  selectedInquiry: InquiryVM;
  constructor(
    private catSvc: CatalogService,
    public dialog:  MatDialog,
    private route: Router,
    private InqSvc: InquiryService) {
      this.selectedInquiry = new InquiryVM
  }
  ngOnInit(): void {
   
    this.GetInquiry();
  }
  DeleteInquiry(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.InqSvc.DeleteInquiry(id).subscribe({
          next: (data) => {
            Swal.fire(
              'Deleted!',
              'Inquiry has been deleted.',
              'success'
            )
            this.GetInquiry();
          }, error: (e: any) => {
            this.catSvc.ErrorMsgBar("Error Occurred", 5000)
            console.warn(e);
          }
        })
      }
    })
  }
 

  EditInquiry(inquiry) {
   
    this.route.navigate(['/inquiry/manageinquiry'], { queryParams: { id: inquiry.id } });
   

  }
  OpenFollowUpDialog(inquiry) {
    debugger
    var dialogRef = this.dialog.open(ManageInquiryFollowUpComponent, {
      disableClose: true, panelClass: 'calendar-form-dialog',  width: '90%', height: '90%'
      , data: {id:inquiry.id}
    });
    dialogRef.afterClosed()
      .subscribe((res) => {
        this.GetInquiry()
      });
  }
  OpenEmailDialog(inquiry) {
    debugger
    var dialogRef = this.dialog.open(EmailComponent, {
      disableClose: true, panelClass: 'calendar-form-dialog',  width: '90%', height: '90%'
      , data: {id:inquiry.id}
    });
    dialogRef.afterClosed()
      .subscribe((res) => {
        this.GetInquiry()
      });
  }
  OpenSMSDialog(inquiry) {
    debugger
    var dialogRef = this.dialog.open(SMSComponent, {
      disableClose: true, panelClass: 'calendar-form-dialog',  width: '90%', height: '90%'
      , data: {id:inquiry.id}
    });
    dialogRef.afterClosed()
      .subscribe((res) => {
        this.GetInquiry()
      });
  }

  GetInquiry() {
    this.isLoading=true
    var Inquirys = new InquiryVM
    this.InqSvc.SearchInquiry(Inquirys).subscribe({
      next: (res: InquiryVM[]) => {
        this.inquiry = res
        this.dataSource = new MatTableDataSource(res)
        this.isLoading=false
      }, error: (e) => {
        console.warn(e)
        this.catSvc.ErrorMsgBar("Error Occurred", 4000)
      }
    })
  }
}



  
  