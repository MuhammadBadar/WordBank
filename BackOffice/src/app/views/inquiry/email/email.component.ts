import { Component, Injector, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { InquiryService } from '../inquiry.service';
import { CatalogService } from '../../catalog/catalog.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceVM } from '../Models/ServiceVM';
import { MatTableDataSource } from '@angular/material/table';
import {EmailVM} from '../Models/EmailVM';
@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent {
  @ViewChild('EmailForm', { static: true }) EmailForm!: NgForm;
  AddMode: boolean = true;
  EditMode: boolean = false;
  value: EmailVM
   dialogRefe: any;
   dialogData: any;
  selectedEmail: EmailVM
 Services : ServiceVM[];
 selectedServices : ServiceVM
  proccessing: boolean;
  isLoading: boolean;
  dataSource: any;
  constructor(
    private InqSvc: InquiryService,
    private injector: Injector,
    private catSvc: CatalogService) {
  
    this.selectedEmail = new EmailVM
     this.dialogRefe = this.injector.get(MatDialogRef, null);
     this.dialogData = this.injector.get(MAT_DIALOG_DATA, null);
  }
  ngOnInit(): void {
    this.Refresh()
    if (this.dialogData)
      if (this.dialogData.id != undefined) {
        this.EditMode = true
        this.AddMode = false
    
      }
    this.GetService();
    this.selectedServices = new ServiceVM
    this.selectedEmail.isActive = true;
  }
  GetService() {
    this.isLoading=true
    var Services = new ServiceVM
    this.InqSvc.SearchService(Services).subscribe({
      next: (res: ServiceVM[]) => {
        this.Services = res
        this.dataSource = new MatTableDataSource(res)
        this.isLoading=false
      }, error: (e) => {
        console.warn(e)
        this.catSvc.ErrorMsgBar("Error Occurred", 4000)
      }
    })
  }
 

  Refresh() {
    this.AddMode = true;
    this.EditMode = false;
    this.proccessing = false
    this.selectedEmail = new EmailVM
  }

}



