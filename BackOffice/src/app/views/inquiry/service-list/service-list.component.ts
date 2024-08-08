import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { InquiryService } from '../inquiry.service';
import { MatDialog } from '@angular/material/dialog';
import { CatalogService } from '../../catalog/catalog.service';
import { Router } from '@angular/router';
import { ServiceVM } from '../Models/ServiceVM';
import Swal from 'sweetalert2';
import { ManageServiceComponent } from '../manage-service/manage-service.component';
import { ManageServiceOutlineComponent } from '../manage-service-out-line/manage-service-out-line.component';
import { MatTableDataSource } from '@angular/material/table';
import { AppConstants } from 'src/app/app.constants/AppConstants';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs';
import { ServiceCompaignComponent } from '../service-compaign/service-compaign.component';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent {

  displayedColumns = ['serName', 'serTitle', 'actions']
  @ViewChild(MatPaginator) paginator: MatPaginator;
dataSource= new MatTableDataSource<ServiceVM>([]);
  isLoading: boolean = false
  Service: ServiceVM[];
  constructor(
    public catSvc: CatalogService,
    public dialog:  MatDialog,
    private cdref: ChangeDetectorRef,
    private route: Router,
    private InqSvc: InquiryService) {
  }
  ngOnInit(): void {
    this.catSvc.totalRecords = AppConstants.DEFAULT_TOTAL_RECORD;
    this.catSvc.defaultPageSize = AppConstants.DEFAULT_PAGE_SIZE;
    this.catSvc.pageSizes = AppConstants.PAGE_SIZE_OPTIONS;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator.page
      .pipe(
        tap(() => this.GetService())
      )
      .subscribe();
    this.GetService( );
    this.cdref.detectChanges();
  }
  ngAfterContentChecked() {
    this.cdref.detectChanges();
    this.cdref.markForCheck();
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
      disableClose: true, panelClass: 'calendar-form-dialog', width: '80%', height: '90%'
      , data: {}
    });
    dialogRef.afterClosed()
      .subscribe((res) => {
        this.GetService()
      });
  }
  OpenServiceOutlineDialog(ServiceId) {
    debugger
    var dialogRef = this.dialog.open(ManageServiceOutlineComponent, {
      disableClose: true, panelClass: 'calendar-form-dialog', width: '80%', height: '90%'
      , data: {id : ServiceId}
    });
    dialogRef.afterClosed()
      .subscribe((res) => {
        this.GetService()
      });
  }
  OpenServiceCompaignDialog(ServiceId:number) {
    debugger
    var dialogRef = this.dialog.open(ServiceCompaignComponent, {
      disableClose: true, panelClass: 'calendar-form-dialog', width: '80%', height: '90%'
      , data: {id : ServiceId}
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
    var service = new ServiceVM
    service.clientId = +localStorage.getItem("ClientId")
    service.pageNo = this.paginator.pageIndex + 1;;
    service.pageSize = this.paginator.pageSize;
    this.InqSvc.SearchService(service).subscribe({
      next: (res: ServiceVM[]) => {
        if (res && res.length > 0) {
          this.dataSource = new MatTableDataSource(res);
          this.catSvc.totalRecords = res[0].totalRecords
        }
        this.catSvc.isLoading = false
      }, error: (e) => {
        this.catSvc.ErrorMsgBar("Error Occurred", 4000)
        console.warn(e);
        this.catSvc.isLoading = false
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}



  
  


