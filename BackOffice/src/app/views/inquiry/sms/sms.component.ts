import { Component, Injector, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { InquiryService } from '../inquiry.service';
import { CatalogService } from '../../catalog/catalog.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SMSVM} from '../Models/SMSVM';
@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.css']
})
export class SMSComponent {

  @ViewChild('SMSForm', { static: true }) SMSForm!: NgForm;
  AddMode: boolean = true;
  EditMode: boolean = false;
  value: SMSVM
   dialogRefe: any;
   dialogData: any;
  selectedSMS: SMSVM
  proccessing: boolean;
  isLoading: boolean;
  dataSource: any;
  constructor(
    private InqSvc: InquiryService,
    private injector: Injector,
    private catSvc: CatalogService) {
  
    this.selectedSMS = new SMSVM
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
 
    this.selectedSMS.isActive = true;
  }

  Refresh() {
    this.AddMode = true;
    this.EditMode = false;
    this.proccessing = false
    this.selectedSMS = new SMSVM
  }

}



