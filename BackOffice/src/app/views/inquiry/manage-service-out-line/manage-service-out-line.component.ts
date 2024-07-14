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
        this.selectedServiceOutline.serviceId = this.dialogData.id
     
        this.GetServiceOutlineById()
      }
      this.GetServiceOutline();
    this.GetService();
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
    debugger
    var serOutline = new ServiceOutlineVM
    serOutline.serviceId = this.selectedServiceOutline.serviceId
    this.InqSvc.SearchServiceOutline(serOutline).subscribe({
      next: (value: ServiceOutlineVM[]) => {

        if ( value != undefined && value.length > 0 ) {
          this.AddMode= false
          this.EditMode = true
          this.selectedServiceOutline = value[0]
        }
        else{
          this.AddMode= true
          this.EditMode = false
        }
       
        console.warn();
      }, error: (err) => {
        alert('Error to retrieve ServiceOutline');
        this.catSvc.ErrorMsgBar("Error Occurred", 5000)
      },
    })
  }
  SaveServiceOutline() {
    debugger
    if (this.selectedServiceOutline.serviceId == 0 || this.selectedServiceOutline.serviceId == undefined)
      this.ServiceOutlineForm.form.controls['serviceId'].setErrors({ 'incorrect': true })
    if (!this.ServiceOutlineForm.invalid) {
      if (this.selectedServiceOutline.id > 0)
        this.UpdateServiceOutline()
      else {
        this.InqSvc.SaveServiceOutline(this.selectedServiceOutline).subscribe({
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

}



