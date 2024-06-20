import { InquiryService } from '../inquiry.service';
import { FollowUpVM } from '../Models/FollowUpVM';
import { Component, Inject, Injector, OnInit, ViewChild } from '@angular/core';
import { CatalogService } from '../../catalog/catalog.service';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ManageInquirylistComponent } from '../manage-inquirylist/manage-inquirylist.component';
import { InquiryVM } from '../Models/InquiryVM';
import { SettingsVM } from '../../catalog/Models/SettingsVM';
import { EnumTypeVM } from '../../security/models/EnumTypeVM';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-manage-inquiry-follow-up',
  templateUrl: './manage-inquiry-follow-up.component.html',
  styleUrls: ['./manage-inquiry-follow-up.component.css']
})
export class ManageInquiryFollowUpComponent implements OnInit {


  displayedColumns: string[] = [/* 'statusId','inquiryId', */ 'date',  'nextAppointmentDate', 'comment', 'isActive', 'actions'];
  AddMode: boolean = true
  EditMode: boolean = false
  Add: boolean = true;
  Edit: boolean = false;
  dataSource: any
  DataSource: any
  dialogData: any;
/*   date: string = '';
  comment: string = ''; */

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
 
  constructor(  
   
    private inqSvc: InquiryService,
    private injector: Injector,
    private catSvc: CatalogService) 
    {
    this.selectedFollowUp = new FollowUpVM
    this.inqSvc.selectedInquiry = new InquiryVM
    this.dialogRefe = this.injector.get(MatDialogRef, null);
    this.dialogData = this.injector.get(MAT_DIALOG_DATA, null);
    /* this.FollowUpStatuses = this.selectedFollowUp.enumTypeId; */

  }
   


  ngOnInit(): void {
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


    Search(){
      var  follow = new FollowUpVM();
      this.FollowUpStatuses.entries = this.selectedInquiry.id;
      this.inqSvc.SearchFollowUp(follow).subscribe({
       next: (value: FollowUpVM[]) => {
         this.follow = value
       }, error: (err) => {
         this.catSvc.ErrorMsgBar("Error Occurred", 5000)
       },
     })
       var  inquiry = new InquiryVM();
       inquiry.id = this.selectedInquiry.id;
       this.inqSvc.SearchInquiry(inquiry).subscribe({
        next: (value: InquiryVM[]) => {
          this.selectedInquiry = value
          this.dataSource = new MatTableDataSource(this.selectedInquiry)
        }, error: (err) => {
          this.catSvc.ErrorMsgBar("Error Occurred", 5000)
        },
      })
           }
    

  GetFollowUp() {
    this.inqSvc.GetFollowUp().subscribe({
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
    this.inqSvc.SaveFollowUp(this.selectedFollowUp).subscribe({
      next: (value) => {
        this.catSvc.SuccessMsgBar("Successfully Added", 5000)
        this.Refresh();
      }, error: (err) => {
        console.warn(err)
        this.catSvc.ErrorMsgBar("Error Occurred", 5000)
      },
    })
  }
  EditFollowUp(follow: FollowUpVM) {
    this.EditMode = true
    this.AddMode = false
    this.selectedFollowUp = follow
  }
  GetFollowUpForEdit(id: number) {
    this.selectedFollowUp = new FollowUpVM;
    this.selectedFollowUp.id = id
    console.warn(this.selectedFollowUp);
    this.inqSvc.SearchFollowUp(this.selectedFollowUp).subscribe({
      next: (res: FollowUpVM[]) => {
        this.follow = res;
        console.warn(this.follow);
        this.selectedFollowUp = this.follow[0]
        this.Edit = true;
        this.Add = false;
      }, error: (e) => {
        this.catSvc.ErrorMsgBar("Error Occurred", 5000)
        console.warn(e);
      }
    })
  }
  UpdateFollowUp() {
    debugger
    this.inqSvc.UpdateFollowUp(this.selectedFollowUp).subscribe({
      next: (res) => {

        this.catSvc.SuccessMsgBar("FollowUp Successfully Updated!", 5000)
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

