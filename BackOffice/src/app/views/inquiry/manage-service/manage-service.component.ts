import { Component, Injector, ViewChild } from '@angular/core';
import { ServiceVM } from '../Models/ServiceVM';
import { CatalogService } from '../../catalog/catalog.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppConstants } from 'src/app/app.constants/AppConstants';
import { NgForm } from '@angular/forms';
import { InquiryService } from '../inquiry.service';

@Component({
  selector: 'app-manage-service',
  templateUrl: './manage-service.component.html',
  styleUrls: ['./manage-service.component.css']
})
export class ManageServiceComponent {
  @ViewChild('ServiceForm', { static: true }) ServiceForm!: NgForm;
  AddMode: boolean = true;
  EditMode: boolean = false;
  value: ServiceVM
  dialogRefe: any;
  dialogData: any;
  selectedService: ServiceVM
  proccessing: boolean;
  isLoading: boolean;
  constructor(
    private InqSvc: InquiryService,
    private injector: Injector,
    private catSvc: CatalogService) {
    this.selectedService = new ServiceVM
    this.selectedService = new ServiceVM
    this.dialogRefe = this.injector.get(MatDialogRef, null);
    this.dialogData = this.injector.get(MAT_DIALOG_DATA, null);
  }
  ngOnInit(): void {
    this.Refresh()
    if (this.dialogData)
      if (this.dialogData.id != undefined) {
        this.selectedService.id = this.dialogData.id
        this.EditMode = true
        this.AddMode = false
        this.GetServiceById()
      }
    this.selectedService.isActive = true;
  }

  GetServiceById() {
    var ser = new ServiceVM
    ser.id = this.selectedService.id
    this.InqSvc.SearchService(ser).subscribe({
      next: (value: ServiceVM[]) => {
        this.selectedService = value[0]
      }, error: (err) => {
        alert('Error to retrieve Service');
        this.catSvc.ErrorMsgBar("Error Occurred", 5000)
      },
    })
  }
  SaveService() {
   
    if (!this.ServiceForm.invalid) {
      if (this.selectedService.id > 0)
        this.UpdateService()
      else {
        this.InqSvc.SaveService(this.selectedService).subscribe({
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
  UpdateService() {
    debugger
    this.InqSvc.UpdateService(this.selectedService).subscribe({
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
  Refresh() {
    this.AddMode = true;
    this.EditMode = false;
    this.proccessing = false
    this.selectedService = new ServiceVM
  }

}



