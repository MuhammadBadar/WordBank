
import { Component, Injector, OnInit } from '@angular/core';
import { InquiryVM } from '../Models/InquiryVM';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { InquiryService } from '../inquiry.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ManageInquiryFollowUpComponent } from '../manage-inquiry-follow-up/manage-inquiry-follow-up.component';


@Component({
  selector: 'app-manage-Inquirylist',
  templateUrl: './manage-Inquirylist.component.html',
  styleUrls: ['./manage-Inquirylist.component.css']
})
export class ManageInquirylistComponent {

  dataSource;
  displayedColumns = ['inquiryName', 'inquiryEmail', 'inquiryCell', 'inquiryComments', 'actions']
  inquiry: InquiryVM[]
  /* id:number;
  Edit: boolean = false;
  Add: boolean = true; */
  public dialogRef?: MatDialogRef<ManageInquiryFollowUpComponent>;
  selectedInquiry: InquiryVM
  
dialogRefe:any


  constructor(
    private injector: Injector,
    
    public dialog: MatDialog,
    private route: Router,
    public inqSvc: InquiryService
  ) {
    this.inqSvc.selectedInquiry = new InquiryVM

  }
  
  ngOnInit(): void {
    this.inqSvc.selectedInquiry = new InquiryVM
    this.inqSvc.SearchInquiry(this.inqSvc.selectedInquiry).subscribe((res: InquiryVM[]) => {
      this.inquiry = res;
      this.dataSource = new MatTableDataSource(this.inquiry);
    });
  }
  EditInquiry(inquiry) {
    this.route.navigate(['/inquiry/manage-inquiry'], { queryParams: { id: inquiry.id } });

  }

/*  */
  /*  PutInquiry(){
     this.route.navigate(['/inquiry/followUp'], { queryParams: { } });
 
   } */
     OpenFollowUpDialog(row) {
      // this.isDialogOpen = true;
      this.dialogRef = this.dialog.open(ManageInquiryFollowUpComponent, {
        width: '1200px',
        height: '950px',
        data: {inquiry : row }
      });
  
     
  }
 

  DeleteInquiry(id) {
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
        this.inqSvc.DeleteInquiry(id).subscribe((data) => {
          Swal.fire(
            'Deleted!',
            'Inquiry has been deleted.',
            'success'
          )
          this.ngOnInit();
        })
      }
    })
  }










}
