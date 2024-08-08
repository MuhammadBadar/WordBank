
import { ChangeDetectorRef, Component, Injector, OnInit, ViewChild } from '@angular/core';
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
import { AppConstants } from 'src/app/app.constants/AppConstants';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs';
import { EnumTypeVM } from '../../security/models/EnumTypeVM';
import { SettingsVM } from '../../catalog/Models/SettingsVM';
import { ServiceChargesComponent } from '../manage_service-charges/service-charges.component';


@Component({
  selector: 'app-manage-Inquirylist',
  templateUrl: './manage-Inquirylist.component.html',
  styleUrls: ['./manage-Inquirylist.component.css']
})
export class ManageInquirylistComponent {

 
  displayedColumns = ['city','status','inquiryName', 'inquiryEmail', 'inquiryCell','area','cnic', 'inquiryComments', 'actions']
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource= new MatTableDataSource<InquiryVM>([]);
  isLoading: boolean = false
  inquiry: InquiryVM[];
  EditMode: boolean;
  AddMode: boolean;
  selectedInquiry: InquiryVM;

  constructor(
    public catSvc: CatalogService,
    public dialog:  MatDialog,
    private cdref: ChangeDetectorRef,
    private route: Router,
    private InqSvc: InquiryService) {
      this.selectedInquiry = new InquiryVM
  }
  ngOnInit(): void {
    this.catSvc.totalRecords = AppConstants.DEFAULT_TOTAL_RECORD;
    this.catSvc.defaultPageSize = AppConstants.DEFAULT_PAGE_SIZE;
    this.catSvc.pageSizes = AppConstants.PAGE_SIZE_OPTIONS;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator.page
      .pipe(
        tap(() => this.GetInquiry())
      )
      .subscribe();
    this.GetInquiry( );
    this.cdref.detectChanges();
  }
  ngAfterContentChecked() {
    this.cdref.detectChanges();
    this.cdref.markForCheck();
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
  OpenFollowUpDialog(inquiryId: number) {
    debugger
    var dialogRef = this.dialog.open(ManageInquiryFollowUpComponent, {
      disableClose: true, panelClass: 'calendar-form-dialog',  width: '90%', height: '90%'
      , data: {id:inquiryId}
    });
    dialogRef.afterClosed()
      .subscribe((res) => {
        this.GetInquiry()
      });
  }
 
  OpenServiceChargesDialog(inquiryId: number) {
    debugger
    var dialogRef = this.dialog.open(ServiceChargesComponent, {
      disableClose: true, panelClass: 'calendar-form-dialog',  width: '90%', height: '90%'
      , data: {id:inquiryId}
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
    var inq = new InquiryVM
    inq.clientId = +localStorage.getItem("ClientId")
    inq.pageNo = this.paginator.pageIndex + 1;;
    inq.pageSize = this.paginator.pageSize;
    this.InqSvc.SearchInquiry(inq).subscribe({
      next: (res: InquiryVM[]) => {
        if (res && res.length > 0) {
          this.dataSource = new MatTableDataSource(res);
          this.catSvc.totalRecords = res[0].totalRecords
        }
        this.catSvc.isLoading = false
      }, error: (e) => {
        this.catSvc.ErrorMsgBar("Error Occurred", 4000)
        console.warn(e);
        this.catSvc.isLoading = false
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}



  
  