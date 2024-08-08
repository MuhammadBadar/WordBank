

import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { ReceivableService } from '../receivable.service';
import { Router } from '@angular/router';
import { CatalogService } from '../../catalog/catalog.service';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { InvoiceVM } from '../Models/InvoiceVM';
import { CustomerVM } from '../Models/CustomerVM';
import { ManageInvoiceComponent } from '../manage-invoice/manage-invoice.component';
import { AppConstants } from 'src/app/app.constants/AppConstants';
import { tap } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent  {
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
displayedColumns: string[] = [ 'customer','invDate', 'invNo', 'invAmount', 'comments', 'isActive', 'actions'];
isLoading: boolean = false
dataSource=new MatTableDataSource<InvoiceVM>([]);
DataSource:any;
maxDate = new Date
invoice: InvoiceVM[];
customers:CustomerVM[];
  fromDate = new Date();
  toDate = new Date();
  lastdate: any;
  firstdate: any;
  invoices: InvoiceVM;
   isReadOnly: boolean = false
  selectedCustomer: CustomerVM;
constructor(
  public catSvc: CatalogService,
  public dialog:  MatDialog,
  private cdref: ChangeDetectorRef,
  public datePipe: DatePipe,
  private RcvSvc: ReceivableService) {
     this.invoices = new InvoiceVM
}
ngOnInit(): void {
  this.catSvc.totalRecords = AppConstants.DEFAULT_TOTAL_RECORD;
  this.catSvc.defaultPageSize = AppConstants.DEFAULT_PAGE_SIZE;
  this.catSvc.pageSizes = AppConstants.PAGE_SIZE_OPTIONS;
  this.fromDate = new Date();
  this.toDate = new Date();
  this.GetCustomer();
  this.selectedCustomer = new CustomerVM
}
ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.paginator.page
    .pipe(
      tap(() => this.GetInvoice())
    )
    .subscribe();
  this.GetInvoice( );
  this.cdref.detectChanges();
}
ngAfterContentChecked() {
  this.cdref.detectChanges();
  this.cdref.markForCheck();
} 
GetCustomer() {
  debugger
  var customers = new CustomerVM()
  customers.isActive = true
  this.RcvSvc.SearchCustomer(customers).subscribe({
    next: (res: CustomerVM[]) => {
      this.customers = res;
      console.warn(res);
    }, error: (e) => {
      alert("t");
      this.catSvc.ErrorMsgBar("Error Occurred", 4000)
      console.warn(e);
    }
  })
}
DeleteInvoice(id: number) {
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
      this.RcvSvc.DeleteInvoice(id).subscribe({
        next: (data) => {
          Swal.fire(
            'Deleted!',
            'Invoice has been deleted.',
            'success'
          )
          this.GetInvoice();
        }, error: (e: any) => {
          this.catSvc.ErrorMsgBar("Error Occurred", 5000)
          console.warn(e);
        }
      })
    }
  })
}
OpenInvoiceDialog() {
  debugger
  var dialogRef = this.dialog.open(ManageInvoiceComponent, {
    disableClose: true, panelClass: 'calendar-form-dialog', width: '90%', height: '90%'
    , data: {}
  });
  dialogRef.afterClosed()
    .subscribe((res) => {
      this.GetInvoice()
    });
}
EditInvoice(id: number) {
  var dialogRef = this.dialog.open(ManageInvoiceComponent, {
    disableClose: true, width: '90%',
    height: '90%'
    , data: { id: id }
  });
  dialogRef.afterClosed()
    .subscribe((res) => {
      this.GetInvoice()
    });
}
/* applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
} */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: InvoiceVM, filter: string) => {
        const matchesText = data.customer.toLowerCase().includes(filter);
        const matchesCustomer = this.invoices.customer  || data.customer === this.invoices.customer;
        const matchesDateRange = (!this.fromDate || new Date(data.invDate) >= new Date(this.fromDate)) &&
        (!this.toDate || new Date(data.invDate) <= new Date(this.toDate));

        return matchesText && matchesCustomer && matchesDateRange;
    };
    this.dataSource.filter = filterValue;
}

  transform() {
    this.DataSource = this.invoice
    this.invoices.customer 
    this.firstdate = this.datePipe.transform(this.fromDate, 'yyyy-MM-dd');
    this.lastdate = this.datePipe.transform(this.toDate, 'yyyy-MM-dd');
    this.dataSource = this.DataSource.filter((e: { createdOn: string | number | Date; }) =>
      ((this.datePipe.transform(e.createdOn, 'yyyy-MM-dd') == this.firstdate) ||
        (this.datePipe.transform(e.createdOn, 'yyyy-MM-dd')! >= this.firstdate)) &&
      ((this.datePipe.transform(e.createdOn, 'yyyy-MM-dd')! <= this.lastdate) ||
        (this.datePipe.transform(e.createdOn, 'yyyy-MM-dd') == this.lastdate)))
  }

GetInvoice() {
    this.isLoading = true;
    var invoice = new InvoiceVM();
    invoice.customer = this.invoices.customer;
    invoice.fromDate = this.invoices.fromDate; 
    invoice.toDate = this.invoices.toDate;
    invoice.clientId = +localStorage.getItem("ClientId");
    invoice.pageNo = this.paginator.pageIndex + 1;
    invoice.pageSize = this.paginator.pageSize;

    console.log('Fetching Invoices with:', invoice);

    this.RcvSvc.SearchInvoice(invoice).subscribe({
        next: (res: InvoiceVM[]) => {
            console.log('Fetched Invoices:', res);
            if (res && res.length > 0) {
                this.dataSource.data = res;
                this.catSvc.totalRecords = res[0].totalRecords;
            } else {
                this.dataSource.data = [];
            }
            this.isLoading = false;
        },
        error: (e) => {
            console.error('Error fetching invoices:', e);
            this.catSvc.ErrorMsgBar("Error Occurred", 4000);
            this.isLoading = false;
        }
    });
}

  
}
