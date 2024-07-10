import { Component } from '@angular/core';
import { InquiryService } from '../inquiry.service';
import { MatDialog } from '@angular/material/dialog';
import { CatalogService } from '../../catalog/catalog.service';
import { Router } from '@angular/router';
import { ServiceVM } from '../Models/ServiceVM';
import Swal from 'sweetalert2';
import { ManageServiceComponent } from '../manage-service/manage-service.component';
import { ManageServiceOutlineComponent } from '../manage-service-out-line/manage-service-out-line.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent {

  displayedColumns = ['serName', 'serTitle', 'actions']
  isLoading: boolean = false
  dataSource: any
  Service: ServiceVM[];
  constructor(
    private catSvc: CatalogService,
    public dialog:  MatDialog,
    private route: Router,
    private InqSvc: InquiryService) {
  }
  ngOnInit(): void {
    this.GetService();
  }
  DeleteService(id: number) {
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
        this.InqSvc.DeleteService(id).subscribe({
          next: (data) => {
            Swal.fire(
              'Deleted!',
              'Service has been deleted.',
              'success'
            )
            this.GetService();
          }, error: (e: any) => {
            this.catSvc.ErrorMsgBar("Error Occurred", 5000)
            console.warn(e);
          }
        })
      }
    })
  }
  OpenServiceDialog() {
    debugger
    var dialogRef = this.dialog.open(ManageServiceComponent, {
      disableClose: true, panelClass: 'calendar-form-dialog', width: '1000px', height: '450px'
      , data: {}
    });
    dialogRef.afterClosed()
      .subscribe((res) => {
        this.GetService()
      });
  }
  OpenServiceOutlineDialog() {
    debugger
    var dialogRef = this.dialog.open(ManageServiceOutlineComponent, {
      disableClose: true, panelClass: 'calendar-form-dialog', width: '1000px', height: '450px'
      , data: {}
    });
    dialogRef.afterClosed()
      .subscribe((res) => {
        this.GetService()
      });
  }
  EditService(id: number) {
    var dialogRef = this.dialog.open(ManageServiceComponent, {
      disableClose: true, width: '1000px',
      height: '450px'
      , data: { id: id }
    });
    dialogRef.afterClosed()
      .subscribe((res) => {
        this.GetService()
      });
  }
  GetService() {
    this.isLoading=true
    var Services = new ServiceVM
    this.InqSvc.SearchService(Services).subscribe({
      next: (res: ServiceVM[]) => {
        this.Service = res
        this.dataSource = new MatTableDataSource(res)
        this.isLoading=false
      }, error: (e) => {
        console.warn(e)
        this.catSvc.ErrorMsgBar("Error Occurred", 4000)
      }
    })
  }
}



  
  


