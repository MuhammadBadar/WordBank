import { InquiryService } from '../inquiry.service';
import { FollowUpVM } from '../Models/FollowUpVM';
import { ChangeDetectorRef, Component, Inject, Injector, OnInit, ViewChild } from '@angular/core';
import { CatalogService } from '../../catalog/catalog.service';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InquiryVM } from '../Models/InquiryVM';
import { SettingsVM } from '../../catalog/Models/SettingsVM';
import { EnumTypeVM } from '../../security/models/EnumTypeVM';
import { MatTableDataSource } from '@angular/material/table';
import { AppConstants } from 'src/app/app.constants/AppConstants';
import { NgForm } from '@angular/forms';
import { tap } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-manage-inquiry-follow-up',
  templateUrl: './manage-inquiry-follow-up.component.html',
  styleUrls: ['./manage-inquiry-follow-up.component.css']
})
export class ManageInquiryFollowUpComponent implements OnInit {

  @ViewChild('FollowUpForm', { static: true }) FollowUpForm!: NgForm; 
  displayedColumns: string[] = [ 'followUpStatuses','date',  'nextAppointmentDate', 'comment', 'isActive', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource= new MatTableDataSource<FollowUpVM>([]);
  AddMode: boolean = true
  EditMode: boolean = false
  selectedFollowUp: FollowUpVM 
  follow: FollowUpVM[]
  FollowUpStatuses: SettingsVM[] 
  Value?: SettingsVM[];
  proccessing: boolean;
  Entities: SettingsVM[];
  isLoading: boolean;
  dialogData: any;
  dialogRefe: MatDialogRef<any, any>;
  constructor(
    private inqSvc: InquiryService,
    private injector: Injector,
    private cdref: ChangeDetectorRef,
    public catSvc: CatalogService,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
      this.selectedFollowUp = new FollowUpVM();
      this.dialogRefe = this.injector.get(MatDialogRef, null);
      this.dialogData = this.injector.get(MAT_DIALOG_DATA, null);
    
  }
  ngOnInit(): void {
    this.Refresh();
    if (this.dialogData)
      if (this.dialogData.id != undefined) { 
        this.selectedFollowUp.inquiryId = this.dialogData.id
       this.GetFollowUp();
      }

   this.GetSettings(EnumTypeVM.FollowUpStatuses);
    this.selectedFollowUp.isActive = true; 
    this.catSvc.totalRecords = AppConstants.DEFAULT_TOTAL_RECORD;
    this.catSvc.defaultPageSize = AppConstants.DEFAULT_PAGE_SIZE;
    this.catSvc.pageSizes = AppConstants.PAGE_SIZE_OPTIONS;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator.page
      .pipe(
        tap(() => this.GetFollowUp())
      )
      .subscribe();
    this.GetFollowUp( );
    this.cdref.detectChanges();
  }
  ngAfterContentChecked() {
    this.cdref.detectChanges();
    this.cdref.markForCheck();
  } 
 
  GetSettings(etype: EnumTypeVM) {
    var setting = new SettingsVM()
    setting.enumTypeId = etype
    setting.isActive = true
    this.catSvc.SearchSettings(setting).subscribe({
      next: (res: SettingsVM[]) => {
        if (etype === EnumTypeVM.FollowUpStatuses) {
          this.FollowUpStatuses = res;}

        } ,error: (e) => {
          alert("t");
          this.catSvc.ErrorMsgBar("Error Occurred", 4000)
          console.warn(e);
        }
      })
    }
    SaveFollowUp() {
      this.selectedFollowUp.clientId = +localStorage.getItem("ClientId")
      if (this.selectedFollowUp.statusId == 0 || this.selectedFollowUp.statusId == undefined)
        this.FollowUpForm.form.controls['statusId'].setErrors({ 'incorrect': true })
      if (!this.FollowUpForm.invalid) {
        if (this.selectedFollowUp.id > 0)
          this.UpdateFollowUp()
        else {
          this.inqSvc.SaveFollowUp(this.selectedFollowUp).subscribe({
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

  GetFollowUpForEdit(id: number) {
    this.selectedFollowUp = new FollowUpVM;
    this.selectedFollowUp.id = id;
    console.warn(this.selectedFollowUp);  
    this.inqSvc.SearchFollowUp(this.selectedFollowUp).subscribe({
      next: (res: FollowUpVM[]) => {
        if (res && res.length > 0) {
          this.follow = res;
          this.selectedFollowUp = this.follow[0];
          this.EditMode = true;
          this.AddMode = false;
        } else {
          this.catSvc.ErrorMsgBar("No follow-up found", 5000);
        }
      },
      error: (e) => {
        this.catSvc.ErrorMsgBar("Error Occurred", 5000);
        console.warn(e);
      }
    });
  }
  UpdateFollowUp() {
    debugger
    this.inqSvc.UpdateFollowUp(this.selectedFollowUp).subscribe({
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

  DeleteFollowUp(id: number) {
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
        this.inqSvc.DeleteFollowUp(id).subscribe({
          next: (data) => {
            Swal.fire(
              'Deleted!',
              'FollowUp has been deleted.',
              'success'
            )
            this.GetFollowUp();
          }, error: (e: any) => {
            this.catSvc.ErrorMsgBar("Error Occurred", 5000)
            console.warn(e);
          }
        })
      }
    })
  }
  GetFollowUp() {
    var follow = new FollowUpVM();
    follow.inquiryId = this.selectedFollowUp.inquiryId;  
    follow.clientId = +localStorage.getItem("ClientId");
    follow.pageNo = this.paginator.pageIndex + 1;;
    follow.pageSize = this.paginator.pageSize;
    this.inqSvc.SearchFollowUp(follow).subscribe({
      next: (res: FollowUpVM[]) => {
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
  Refresh() {
    this.AddMode = true;
    this.EditMode = false;
    this.proccessing = false;
    this.selectedFollowUp = new FollowUpVM();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}



  
  



