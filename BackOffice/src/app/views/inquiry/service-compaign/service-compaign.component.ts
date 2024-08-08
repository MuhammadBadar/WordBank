import { InquiryService } from '../inquiry.service';
import { ServiceCompaignVM } from '../Models/ServiceCompaignVM';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { CatalogService } from '../../catalog/catalog.service';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppConstants } from 'src/app/app.constants/AppConstants';
import { ServiceVM } from '../Models/ServiceVM';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { SettingsVM } from '../../catalog/Models/SettingsVM';
import { EnumTypeVM } from '../../security/models/EnumTypeVM';

@Component({
  selector: 'app-service-compaign',
  templateUrl: './service-compaign.component.html',
  styleUrls: ['./service-compaign.component.css']
})
export class ServiceCompaignComponent implements OnInit {

  displayedColumns = ['templates', 'services', 'startDate', 'endDate', 'title', 'isActive', 'actions']
  @ViewChild('ServiceCompaignForm', { static: true }) ServiceCompaignForm!: NgForm;

  AddMode: boolean = true;
  EditMode: boolean = false;
  dialogRefe: any;
  Services: ServiceVM[];
  sercompaign: ServiceCompaignVM[];
  dialogData: any;
  selectedServiceCompaign: ServiceCompaignVM = new ServiceCompaignVM();
  proccessing: boolean;
  selectedService: ServiceVM;
  isLoading: boolean;
  Templates: SettingsVM[];
  Entities: SettingsVM[];
  value?: SettingsVM[];
  length: number;
  DataSource: ServiceCompaignVM[] = [];
  dataSource: MatTableDataSource<ServiceCompaignVM> = new MatTableDataSource<ServiceCompaignVM>();

  constructor(
    public InqSvc: InquiryService,
    private injector: Injector,
    private catSvc: CatalogService) {
    this.dialogRefe = this.injector.get(MatDialogRef, null);
    this.dialogData = this.injector.get(MAT_DIALOG_DATA, null);
  }

  ngOnInit(): void {
    this.Refresh();
    if (this.dialogData && this.dialogData.id != undefined) {
      this.selectedServiceCompaign.serviceId = this.dialogData.id;
      this.GetServiceCompaign();
    }
    this.GetService();
    this.GetSettings(EnumTypeVM.Templates);
    this.selectedServiceCompaign.isActive = true;
  }

  GetService() {
    const Services = new ServiceVM();
    Services.isActive = true;
    console.log('Getting services...');
    this.InqSvc.SearchService(Services).subscribe({
      next: (res: ServiceVM[]) => {
        this.Services = res;
        console.log('Services loaded:', this.Services);
        this.updateTitle();
      },
      error: (e) => {
        this.catSvc.ErrorMsgBar("Error Occurred", 4000);
        console.warn(e);
      }
    });
  }

  GetSettings(etype: EnumTypeVM) {
    const setting = new SettingsVM();
    setting.enumTypeId = etype;
    setting.isActive = true;
    console.log('Getting settings...');
    this.catSvc.SearchSettings(setting).subscribe({
      next: (res: SettingsVM[]) => {
        if (etype === EnumTypeVM.Templates) {
          this.Templates = res;
        }
        console.log('Settings loaded:', this.Templates);
      },
      error: (e) => {
        this.catSvc.ErrorMsgBar("Error Occurred", 4000);
        console.warn(e);
      }
    });
  }

  GetServiceCompaign() {
    this.isLoading = true;
    const ServiceCompaign = new ServiceCompaignVM();
    ServiceCompaign.serviceId = this.selectedServiceCompaign.serviceId;
    console.log('Getting service campaign...');
    this.InqSvc.SearchServiceCompaign(ServiceCompaign).subscribe({
      next: (res: ServiceCompaignVM[]) => {
        this.sercompaign = res;
        this.dataSource.data = res;
        this.isLoading = false;
        this.setMostRecentCampaignEditable();
      },
      error: (e) => {
        console.warn(e);
        this.catSvc.ErrorMsgBar("Error Occurred", 4000);
      }
    });
  }

  setMostRecentCampaignEditable() {
    if (this.sercompaign.length > 0) {
      this.sercompaign.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
      const mostRecentCampaign = this.sercompaign[0];
      this.GetServiceCompaignForEdit(mostRecentCampaign.id);
    }
  }

  GetServiceCompaignForEdit(id: number) {
    this.selectedServiceCompaign = new ServiceCompaignVM();
    this.selectedServiceCompaign.id = id;

    console.log('Getting service campaign for edit with id:', id);
    this.InqSvc.SearchServiceCompaign(this.selectedServiceCompaign).subscribe({
      next: (res: ServiceCompaignVM[]) => {
        if (res && res.length > 0) {
          this.sercompaign = res;
          this.selectedServiceCompaign = this.sercompaign[0];
          this.EditMode = true;
          this.AddMode = false;
          console.log('Editing service campaign:', this.selectedServiceCompaign);
        } else {
          this.catSvc.ErrorMsgBar("No Service found", 5000);
        }
      },
      error: (e) => {
        this.catSvc.ErrorMsgBar("Error Occurred", 5000);
        console.warn(e);
      }
    });
  }

  SaveServiceCompaign() {
    if (this.selectedServiceCompaign.serviceId == 0 || this.selectedServiceCompaign.serviceId == undefined) {
      this.ServiceCompaignForm.form.controls['ServiceId'].setErrors({ 'incorrect': true });
    }
    if (!this.ServiceCompaignForm.invalid) {
      console.log('Saving service campaign:', this.selectedServiceCompaign);
      if (this.selectedServiceCompaign.id > 0) {
        this.UpdateServiceCompaign();
      } else {
        this.InqSvc.SaveServiceCompaign(this.selectedServiceCompaign).subscribe({
          next: (result) => {
            result.resultMessages.forEach(element => {
              if (element.messageType != AppConstants.ERROR_MESSAGE_TYPE) {
                this.catSvc.SuccessMsgBar(element.message, 5000);
                this.RefreshServiceCompaignList();
              } else {
                this.catSvc.ErrorMsgBar(element.message, 5000);
              }
              this.catSvc.isLoading = false;
            });
          },
          error: (e) => {
            this.catSvc.ErrorMsgBar("Error Occurred", 5000);
            console.warn(e);
            this.catSvc.isLoading = false;
          }
        });
      }
    } else {
      this.catSvc.ErrorMsgBar("Please fill all required fields", 5000);
    }
  }

  UpdateServiceCompaign() {
    console.log('Updating service campaign:', this.selectedServiceCompaign);
    this.InqSvc.UpdateServiceCompaign(this.selectedServiceCompaign).subscribe({
      next: (result) => {
        result.resultMessages.forEach(element => {
          if (element.messageType != AppConstants.ERROR_MESSAGE_TYPE) {
            this.catSvc.SuccessMsgBar(element.message, 5000);
            this.RefreshServiceCompaignList();
          } else {
            this.catSvc.ErrorMsgBar(element.message, 5000);
          }
          this.isLoading = false;
        });
      },
      error: (e) => {
        this.isLoading = false;
        this.catSvc.ErrorMsgBar("Error Occurred", 5000);
        console.warn(e);
      }
    });
  }

  DeleteServiceCompaign(id: number) {
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
        console.log('Deleting service campaign with id:', id);
        this.InqSvc.DeleteServiceCompaign(id).subscribe({
          next: (data) => {
            Swal.fire(
              'Deleted!',
              'ServiceCompaign has been deleted.',
              'success'
            );
            this.RefreshServiceCompaignList();
          },
          error: (e: any) => {
            this.catSvc.ErrorMsgBar("Error Occurred", 5000);
            console.warn(e);
          }
        });
      }
    });
  }

  Refresh() {
    this.GetServiceCompaign();
  }

  RefreshServiceCompaignList() {
    this.GetServiceCompaign();
  }

  updateTitle() {
    const service = this.Services.find(x => x.id === this.selectedServiceCompaign.serviceId);
    const startDate = new Date(this.selectedServiceCompaign.startDate).toLocaleDateString();
    const endDate = new Date(this.selectedServiceCompaign.endDate).toLocaleDateString();

    if (service) {
      this.selectedServiceCompaign.title = `${service.serName} (${startDate} - ${endDate})`;
    }
  }
}
