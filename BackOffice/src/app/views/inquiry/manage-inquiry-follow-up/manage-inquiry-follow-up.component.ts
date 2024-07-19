import { InquiryService } from '../inquiry.service';
import { FollowUpVM } from '../Models/FollowUpVM';
import { Component, Inject, Injector, OnInit, ViewChild } from '@angular/core';
import { CatalogService } from '../../catalog/catalog.service';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InquiryVM } from '../Models/InquiryVM';
import { SettingsVM } from '../../catalog/Models/SettingsVM';
import { EnumTypeVM } from '../../security/models/EnumTypeVM';
import { MatTableDataSource } from '@angular/material/table';
import { AppConstants } from 'src/app/app.constants/AppConstants';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-manage-inquiry-follow-up',
  templateUrl: './manage-inquiry-follow-up.component.html',
  styleUrls: ['./manage-inquiry-follow-up.component.css']
})
export class ManageInquiryFollowUpComponent implements OnInit {

  @ViewChild('FollowUpForm', { static: true }) FollowUpForm!: NgForm;
  
  displayedColumns: string[] = [ 'followUpStatuses','date',  'nextAppointmentDate', 'comment', 'isActive', 'actions'];
  AddMode: boolean = true
  EditMode: boolean = false
  dataSource: any
  DataSource: any
  dialogData: any;
id:number
  selectedFollowUp: FollowUpVM 
  follow: FollowUpVM[]
  FollowUpStatuses: SettingsVM[] 
  Value?: SettingsVM[];
  selectedOption: string | undefined;
  snack: any;
  proccessing: boolean;
  dialog: any;
 
  selectedInquiry: any;
dialogRefe :any;
  dialogRef: any;
  Entities: SettingsVM[];
  isLoading: boolean;
 
  constructor(  
    private inqSvc: InquiryService,
    private injector: Injector,
    private catSvc: CatalogService) 
    {
    this.selectedFollowUp = new FollowUpVM
    this.selectedInquiry = new InquiryVM
    this.dialogRefe = this.injector.get(MatDialogRef, null);
    this.dialogData = this.injector.get(MAT_DIALOG_DATA, null);
  
  }
  ngOnInit(): void {
    this.Refresh()
    if (this.dialogData)
      if (this.dialogData.id != undefined) { 
        this.selectedFollowUp.inquiryId = this.dialogData.id
      }
      this.GetFollowUp();

   this.GetSettings(EnumTypeVM.FollowUpStatuses);
    this.selectedFollowUp.isActive = true; 
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
  GetFollowUp() {
    debugger
    var  follow = new FollowUpVM();
    follow.inquiryId = this.selectedFollowUp.inquiryId;
    this.inqSvc.SearchFollowUp(follow).subscribe({
      next: (value: FollowUpVM[]) => {
        debugger;
        this.follow = value
        this.DataSource = new MatTableDataSource(this.follow)
      }, error: (err) => {
        alert('Error to retrieve FollowUp');
        this.catSvc.ErrorMsgBar("Error Occurred", 5000)
      },
    })
  }
  SaveFollowUp() {
    if (this.selectedFollowUp.statusId == 0 || this.selectedFollowUp.statusId == undefined)
      this.FollowUpForm.form.controls['statusId'].setErrors({ 'incorrect': true })
    if (!this.FollowUpForm.invalid) {
      if (this.selectedFollowUp.id > 0)
        this.UpdateFollowUp()
      else {
        this.inqSvc.SaveFollowUp(this.selectedFollowUp).subscribe({
          next: (result) => {
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
  EditFollowUp(follow: FollowUpVM) {
    this.EditMode = true
    this.AddMode = false
    this.selectedFollowUp = follow
  }
  GetFollowUpForEdit(id: number) {
    this.selectedFollowUp = new FollowUpVM;
    this.selectedFollowUp.inquiryId= id
    console.warn(this.selectedFollowUp);
    this.inqSvc.SearchFollowUp(this.selectedFollowUp).subscribe({
      next: (res: FollowUpVM[]) => {
        this.follow = res;
        this.selectedFollowUp = this.follow[0]
        this.EditMode = true;
        this.AddMode = false;
      }, error: (e) => {
        this.catSvc.ErrorMsgBar("Error Occurred", 5000)
        console.warn(e);
      }
    })
  }
  UpdateFollowUp() {
    this.inqSvc.UpdateFollowUp(this.selectedFollowUp).subscribe({
      next: (result:FollowUpVM) => {
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
/*     debugger
    this.inqSvc.UpdateFollowUp(this.selectedFollowUp).subscribe({
      next: (res) => {

        this.catSvc.SuccessMsgBar("FollowUp Successfully Updated!", 5000)
        this.AddMode = true;
        this.EditMode = false;
        this.proccessing = false
        this.ngOnInit();
      }, error: (e) => {
        this.catSvc.ErrorMsgBar("Error Occurred", 5000)
        console.warn(e);
        this.proccessing = false
      }
    })
    this.proccessing = false
  } */
  Refresh() {
    this.AddMode = true;
    this.EditMode = false;
    this.proccessing = false
    this.selectedFollowUp = new FollowUpVM
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
            this.Refresh();
          }, error: (e) => {
            this.catSvc.ErrorMsgBar("Error Occurred", 5000)
            console.warn(e);
          }
        })
      }
    })
  }

}

