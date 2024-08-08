import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ManageCustomerComponent } from '../manage-customer/manage-customer.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { CustomerVM } from '../Models/CustomerVM';
import { ReceivableService } from '../receivable.service';
import { Router } from '@angular/router';
import { CatalogService } from '../../catalog/catalog.service';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs';
import { AppConstants } from 'src/app/app.constants/AppConstants';
import { EnumTypeVM } from '../../security/models/EnumTypeVM';
import { SettingsVM } from '../../catalog/Models/SettingsVM';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent {
  displayedColumns: string[] = ['paymentTerm', 'name', 'email', 'phone', 'address', 'creditLimit', 'isActive', 'actions'];
  isLoading: boolean = false
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource=new MatTableDataSource<CustomerVM>([]);
  Customers: CustomerVM[];
  PaymentTerms: SettingsVM[];
  AddMode: boolean;
  EditMode: boolean;
  proccessing: boolean;
  selectedCustomer: CustomerVM;
  customers: CustomerVM;
  constructor(
    public catSvc: CatalogService,
    private cdref: ChangeDetectorRef,
    public dialog:  MatDialog,
    private RcvSvc: ReceivableService) { this.customers = new CustomerVM();
  }
  ngOnInit(): void {
    this.catSvc.totalRecords = AppConstants.DEFAULT_TOTAL_RECORD;
    this.catSvc.defaultPageSize = AppConstants.DEFAULT_PAGE_SIZE;
    this.catSvc.pageSizes = AppConstants.PAGE_SIZE_OPTIONS;
    this.GetSettings(EnumTypeVM.PaymentTermId);
   
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator.page
      .pipe(
        tap(() => this.GetCustomer())
      )
      .subscribe();
    this.GetCustomer( );
    this.cdref.detectChanges();
  }
  ngAfterContentChecked() {
    this.cdref.detectChanges();
    this.cdref.markForCheck();
  } 
  GetSettings(etype: EnumTypeVM) {
    var setting = new SettingsVM()
    setting.enumTypeId = etype
    setting.isActive = true
    this.catSvc.SearchSettings(setting).subscribe({
      next: (res: SettingsVM[]) => {
        if (etype === EnumTypeVM.PaymentTermId) {
          this.PaymentTerms = res;
        }
      }, error: (e) => {
        alert("t");
        this.catSvc.ErrorMsgBar("Error Occurred", 4000)
        console.warn(e);
      }
    })
  }
  DeleteCustomer(id: number) {
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
        this.RcvSvc.DeleteCustomer(id).subscribe({
          next: (data) => {
            Swal.fire(
              'Deleted!',
              'Customer has been deleted.',
              'success'
            )
            this.GetCustomer();
          }, error: (e: any) => {
            this.catSvc.ErrorMsgBar("Error Occurred", 5000)
            console.warn(e);
          }
        })
      }
    })
  }
  OpenCustomerDialog() {
    debugger
    var dialogRef = this.dialog.open(ManageCustomerComponent, {
      disableClose: true, panelClass: 'calendar-form-dialog', width: '90%', height: '90%'
      , data: {}
    });
    dialogRef.afterClosed()
      .subscribe((res) => {
        this.GetCustomer()
      });
  }
  EditCustomer(id: number) {
    var dialogRef = this.dialog.open(ManageCustomerComponent, {
      disableClose: true, width: '90%',
      height: '90%'
      , data: { id: id }
    });
    dialogRef.afterClosed()
      .subscribe((res) => {
        this.GetCustomer()
      });
  }
  
  GetCustomer() {
      debugger
      var customer = new CustomerVM();
      customer.paymentTerm =this.customers.paymentTerm
      customer.id= this.customers.id
      customer.clientId = +localStorage.getItem("ClientId")
      customer.pageNo = this.paginator.pageIndex + 1;;
      customer.pageSize = this.paginator.pageSize;
      this.RcvSvc.SearchCustomer(customer).subscribe({
        next: (res: CustomerVM[]) => { 
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
  Refresh() {
    this.AddMode = true;
    this.EditMode = false;
    this.proccessing = false
    this.selectedCustomer = new CustomerVM();
  }

}
