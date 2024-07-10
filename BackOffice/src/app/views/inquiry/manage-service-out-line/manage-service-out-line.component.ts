import { InquiryService } from '../inquiry.service';
import {ServiceOutlineVM} from '../Models/ServiceOutlineVM';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { CatalogService } from '../../catalog/catalog.service';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppConstants } from 'src/app/app.constants/AppConstants';
import { ServiceVM } from '../Models/ServiceVM';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-manage-service-out-line',
  templateUrl: './manage-service-out-line.component.html',
  styleUrls: ['./manage-service-out-line.component.css']
})
  export class ManageServiceOutlineComponent implements OnInit {

    displayedColumns = ['services', 'content',  'isActive', 'actions']
    @ViewChild('ServiceOutlineForm', { static: true }) ServiceOutlineForm!: NgForm;
  
  AddMode: boolean = true;
  EditMode: boolean = false;
  dialogRefe: any;
  Services: ServiceVM[];
  Value?: ServiceVM[];
  serOutline: ServiceOutlineVM[]
  dialogData: any;
  selectedServiceOutline: ServiceOutlineVM
  proccessing: boolean;
  selectedService: ServiceVM;
  isLoading: boolean;
  DataSource: any;
  dataSource:any
  dialog: any;

  constructor(
    public InqSvc: InquiryService,
    private injector: Injector,
    private catSvc: CatalogService) {
    this.
    selectedServiceOutline = new ServiceOutlineVM
    this.selectedServiceOutline = new ServiceOutlineVM
    this.dialogRefe = this.injector.get(MatDialogRef, null);
    this.dialogData = this.injector.get(MAT_DIALOG_DATA, null);
  }
  ngOnInit(): void {
    this.Refresh()
    if (this.dialogData)
      if (this.dialogData.id != undefined) {
        this.selectedServiceOutline.id = this.dialogData.id
        this.EditMode = true
        this.AddMode = false
        this.GetServiceOutlineById()
      }
    this.GetService();
    this.GetServiceOutline();
    this.selectedService = new ServiceVM
    this.selectedServiceOutline.isActive = true;
  }
  GetService() {
    debugger
    var Services = new ServiceVM()
    Services.isActive = true
    this.InqSvc.SearchService(Services).subscribe({
      next: (res: ServiceVM[]) => {
        this.Services = res;
        console.warn(res);
      }, error: (e) => {
        alert("t");
        this.catSvc.ErrorMsgBar("Error Occurred", 4000)
        console.warn(e);
      }
    })
  }

  GetServiceOutlineById() {
    var inv = new ServiceOutlineVM
    inv.id = this.selectedServiceOutline.id
    this.InqSvc.SearchServiceOutline(inv).subscribe({
      next: (value: ServiceOutlineVM[]) => {
        this.selectedServiceOutline = value[0]
      }, error: (err) => {
        alert('Error to retrieve ServiceOutline');
        this.catSvc.ErrorMsgBar("Error Occurred", 5000)
      },
    })
  }
  SaveServiceOutline() {
    debugger
    if (this.selectedServiceOutline.serviceId == 0 || this.selectedServiceOutline.serviceId == undefined)
      this.ServiceOutlineForm.form.controls['ServiceId'].setErrors({ 'incorrect': true })
    if (!this.ServiceOutlineForm.invalid) {
      if (this.selectedServiceOutline.id > 0)
        this.UpdateServiceOutline()
      else {
        this.InqSvc.SaveServiceOutline(this.selectedServiceOutline).subscribe({
          next: (result) => {
            result.resultMessages.forEach(element => {
              if (element.messageType != AppConstants.ERROR_MESSAGE_TYPE) {
                this.catSvc.SuccessMsgBar("Successfully Added", 5000)
                this.ngOnInit();
              }
              else
                this.catSvc.ErrorMsgBar("Error Occurred", 5000)
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
  UpdateServiceOutline() {
    debugger
    this.InqSvc.UpdateServiceOutline(this.selectedServiceOutline).subscribe({
      next: (res) => {
        this.catSvc.SuccessMsgBar("ServiceOutline Successfully Updated!", 5000)
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
    this.selectedServiceOutline = new ServiceOutlineVM
  }
  DeleteServiceOutline(id: number) {
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
        this.InqSvc.DeleteServiceOutline(id).subscribe({
          next: (data) => {
            Swal.fire(
              'Deleted!',
              'Inquiry has been deleted.',
              'success'
            )
            this.GetServiceOutline();
          }, error: (e: any) => {
            this.catSvc.ErrorMsgBar("Error Occurred", 5000)
            console.warn(e);
          }
        })
      }
    })
  }
  GetServiceOutline() {
    this.isLoading=true
    var Serv = new ServiceOutlineVM
    this.InqSvc.SearchServiceOutline(Serv).subscribe({
      next: (res: ServiceOutlineVM[]) => {
        this.serOutline= res
        this.dataSource = new MatTableDataSource(res)
        this.isLoading=false
      }, error: (e) => {
        console.warn(e)
        this.catSvc.ErrorMsgBar("Error Occurred", 4000)
      }
    })
  }
  EditServiceOutline(Id: number) {
    this.EditMode = true
    this.AddMode = false
    
  }
}



