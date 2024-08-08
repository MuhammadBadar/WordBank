import { InquiryService } from '../inquiry.service';
import { ServiceChargesVM } from '../Models/ServiceChargesVM';
import { Component, Inject, Injector, OnInit, ViewChild } from '@angular/core';
import { CatalogService } from '../../catalog/catalog.service';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { AppConstants } from 'src/app/app.constants/AppConstants';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-service-charges',
  templateUrl: './service-charges.component.html',
  styleUrls: ['./service-charges.component.css'],
})
export class ServiceChargesComponent implements OnInit {
  @ViewChild('ServiceChargesForm', { static: true })
  ServiceChargesForm!: NgForm;
  displayedColumns: string[] = [ 'serviceCharges','nextDueDate',  'comments', 'isActive',   'actions', ];

  AddMode: boolean = true;
  EditMode: boolean = false;
  dialogRefe: any;
  DataSource: any;
  selectedServiceCharges: ServiceChargesVM;
  ser: ServiceChargesVM[];
  snack: any;
  id:number
  proccessing: boolean;
  dialogData: any;
  isLoading: boolean;
  constructor(  
    private inqSvc: InquiryService,
    private injector: Injector,
    public catSvc: CatalogService,
    @Inject(MAT_DIALOG_DATA) public data: any) 
    {
     this.selectedServiceCharges = new ServiceChargesVM();
    this.dialogRefe = this.injector.get(MatDialogRef, null);
    this.dialogData = this.injector.get(MAT_DIALOG_DATA, null);
  
  }
  ngOnInit(): void {
    this.Refresh()
    this.catSvc.totalRecords = AppConstants.DEFAULT_TOTAL_RECORD;
    this.catSvc.defaultPageSize = AppConstants.DEFAULT_PAGE_SIZE;
    this.catSvc.pageSizes = AppConstants.PAGE_SIZE_OPTIONS;
    if (this.dialogData)
      if (this.dialogData.id != undefined) { 
        this.selectedServiceCharges.inquiryId = this.dialogData.id
        this.GetServiceCharges();
      }

  
    this.selectedServiceCharges.isActive = true; 
 
  }
  GetServiceCharges() {
    if (this.selectedServiceCharges.inquiryId) {
      this.inqSvc.SearchServiceCharges(this.selectedServiceCharges).subscribe({
        next: (value: ServiceChargesVM[]) => {
          this.ser = value;
          this.DataSource = new MatTableDataSource(this.ser);
        },
        error: (err) => {
          alert('Error retrieving service charges');
          this.catSvc.ErrorMsgBar("Error Occurred", 5000);
        },
      });
    }
  }
  
  SaveServiceCharges() {
    if (!this.ServiceChargesForm.invalid) {
      if (this.selectedServiceCharges.id > 0)
        this.UpdateServiceCharges()
      else {
        this.inqSvc.SaveServiceCharges(this.selectedServiceCharges).subscribe({
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

  GetServiceChargesForEdit(id: number) {
    this.selectedServiceCharges = new ServiceChargesVM; 
      this.selectedServiceCharges.id= id
      console.warn(this.selectedServiceCharges);
      this.inqSvc.SearchServiceCharges(this.selectedServiceCharges).subscribe({
        next: (res: ServiceChargesVM[]) => {
          this.ser = res;
          this.selectedServiceCharges = this.ser[0]
          this.EditMode = true;
          this.AddMode = false;
        }, error: (e) => {
          this.catSvc.ErrorMsgBar("Error Occurred", 5000)
          console.warn(e);
        }
      })
    }
  UpdateServiceCharges() {
    this.inqSvc.UpdateServiceCharges(this.selectedServiceCharges).subscribe({
      next: (result:ServiceChargesVM) => {
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
    this.selectedServiceCharges = new ServiceChargesVM
  }
  DeleteServiceCharges(id: number) {
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
        this.inqSvc.DeleteServiceCharges(id).subscribe({
          next: (data) => {
            Swal.fire(
              'Deleted!',
              'ServiceCharges has been deleted.',
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

