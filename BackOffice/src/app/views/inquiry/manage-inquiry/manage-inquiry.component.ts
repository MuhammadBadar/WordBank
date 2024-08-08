import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { InquiryVM } from '../Models/InquiryVM';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { InquiryService } from '../inquiry.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CatalogService } from '../../catalog/catalog.service';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppConstants } from 'src/app/app.constants/AppConstants';
import { ServiceVM } from '../Models/ServiceVM';
import { SettingsVM } from '../../catalog/Models/SettingsVM';
import { EnumTypeVM } from '../../security/models/EnumTypeVM';
import { ServiceCompaignVM } from '../Models/ServiceCompaignVM';

@Component({
  selector: 'app-manage-Inquiry',
  templateUrl: './manage-Inquiry.component.html',
  styleUrls: ['./manage-Inquiry.component.css'],
})
export class ManageInquiryComponent implements OnInit {
  @ViewChild('InquiryForm', { static: true }) InquiryForm!: NgForm;
  AddMode: boolean = true;
  EditMode: boolean = false;
  value: InquiryVM;
  selectedInquiry: InquiryVM;
  Services: ServiceVM[];
  selectedServices: ServiceVM;
  proccessing: boolean;
  isLoading: boolean;
  dataSource: any;
  inquiry: InquiryVM[];
  inqId: number;
  Cities: SettingsVM[];
  Statuses: SettingsVM[];
  Entities: SettingsVM[];
  Value?: SettingsVM[];
  compain: ServiceCompaignVM[] = [];
  constructor(
    private InqSvc: InquiryService,
    private route: ActivatedRoute,
    private catSvc: CatalogService
  ) {
    this.selectedInquiry = new InquiryVM();
  }
  ngOnInit(): void {
    this.Refresh();
    this.route.queryParams.subscribe((params) => {
      this.inqId = params['id'];
    });
    if (this.inqId > 0) {
      this.EditMode = true;
      this.AddMode = false;
      this.GetInquiryById();
    }
    this.GetCompaign();
    this.GetService();
    this.GetSettings(EnumTypeVM.CityId);
    this.GetSettings(EnumTypeVM.StatusId);
    this.selectedServices = new ServiceVM();
    this.selectedInquiry.isActive = true;
  }
  GetCompaign() {
    this.isLoading = true;
    var comp = new ServiceCompaignVM();
    this.InqSvc.SearchServiceCompaign(comp).subscribe({
      next: (res: ServiceCompaignVM[]) => {
        this.compain = res.map(campaign => {
          if (typeof campaign.date === 'string' || campaign.date instanceof String) {
            campaign.date = new Date(campaign.date);
          }
          return campaign;
        });
        this.dataSource = new MatTableDataSource(res);
        this.compain.sort((a, b) => {
          if (!a.date || !b.date) {
            return 0; 
          }
          return b.date.getTime() - a.date.getTime();
        });
        if (this.compain.length > 0) {
          this.selectedInquiry.compainId = this.compain[0].id;
        }
        this.isLoading = false;
      },
      error: (e) => {
        this.isLoading = false;
        this.catSvc.ErrorMsgBar('Error Occurred', 4000);
        console.warn(e);
      }
    });
  }
  GetService() {
    this.isLoading = true;
    var Services = new ServiceVM();
    this.InqSvc.SearchService(Services).subscribe({
      next: (res: ServiceVM[]) => {
        this.Services = res;
        this.dataSource = new MatTableDataSource(res);
        this.isLoading = false;
      },
      error: (e) => {
        console.warn(e);
        this.catSvc.ErrorMsgBar('Error Occurred', 4000);
      },
    });
  }

  GetSettings(etype: EnumTypeVM) {
    var setting = new SettingsVM();
    setting.enumTypeId = etype;
    setting.isActive = true;
    this.catSvc.SearchSettings(setting).subscribe({
      next: (res: SettingsVM[]) => {
        if (etype === EnumTypeVM.CityId) {
          this.Cities = res;
        }

        if (etype === EnumTypeVM.StatusId) {
          this.Statuses = res;
        }
      },
      error: (e) => {
        alert('t');
        this.catSvc.ErrorMsgBar('Error Occurred', 4000);
        console.warn(e);
      },
    });
  }
  updateServices(service) {
    const index = this.selectedInquiry.selectedServiceIds.indexOf(service);
    if (index !== -1) this.selectedInquiry.selectedServiceIds.splice(index, 1);
    else this.selectedInquiry.selectedServiceIds.push(service);
  }

  GetInquiryById() {
    debugger;
    this.selectedInquiry.id = this.inqId;
    this.selectedInquiry.clientId = +localStorage.getItem('ClientId');
    this.InqSvc.SearchInquiry(this.selectedInquiry).subscribe(
      (res: InquiryVM[]) => {
        this.inquiry = res;
        this.selectedInquiry = this.inquiry[0];
      }
    );
  }

  SaveInquiry() {
    this.selectedInquiry.clientId = +localStorage.getItem('ClientId');
    if (!this.InquiryForm.invalid) {
      if (this.selectedInquiry.id > 0) this.UpdateInquiry();
      else {
        this.InqSvc.SaveInquiry(this.selectedInquiry).subscribe({
          next: (result) => {
            debugger;
            result.resultMessages.forEach((element) => {
              if (element.messageType != AppConstants.ERROR_MESSAGE_TYPE) {
                this.catSvc.SuccessMsgBar(element.message, 5000);
                this.ngOnInit();
              } else this.catSvc.ErrorMsgBar(element.message, 5000);
              this.catSvc.isLoading = false;
            });
          },
          error: (e) => {
            this.catSvc.ErrorMsgBar('Error Occurred', 5000);
            console.warn(e);
            this.catSvc.isLoading = false;
          },
        });
      }
    } else this.catSvc.ErrorMsgBar('Please fill all required fields', 5000);
  }
  UpdateInquiry() {
    debugger;
    this.InqSvc.UpdateInquiry(this.selectedInquiry).subscribe({
      next: (result) => {
        result.resultMessages.forEach((element) => {
          if (element.messageType != AppConstants.ERROR_MESSAGE_TYPE) {
            this.catSvc.SuccessMsgBar(element.message, 5000);
            this.ngOnInit();
          } else this.catSvc.ErrorMsgBar(element.message, 5000);
          this.isLoading = false;
        });
      },
      error: (e) => {
        this.isLoading = false;
        this.catSvc.ErrorMsgBar('Error Occurred', 5000);
        console.warn(e);
      },
    });
  }
  Refresh() {
    this.AddMode = true;
    this.EditMode = false;
    this.proccessing = false;
    this.selectedInquiry = new InquiryVM();
  }
}
