import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { ReceivableService } from '../receivable.service';
import { Router } from '@angular/router';
import { CatalogService } from '../../catalog/catalog.service';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { ReceiptVM } from '../Models/ReceiptVM';
import { CustomerVM } from '../Models/CustomerVM';
import { ManageReceiptComponent } from '../manage-receipt/manage-receipt.component';
import { AppConstants } from 'src/app/app.constants/AppConstants';
import { tap } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-Receipt-list',
  templateUrl: './Receipt-list.component.html',
  styleUrls: ['./Receipt-list.component.css'] 
})
export class ReceiptListComponent  {
  
 
displayedColumns: string[] = ['customer', 'date', 'number', 'amount', 'comments','nextPayDate', 'isActive', 'actions'];
isLoading: boolean = false
@ViewChild(MatPaginator) paginator: MatPaginator;
dataSource= new MatTableDataSource<ReceiptVM>([]);
Receipt: ReceiptVM[];
customers:CustomerVM[];
  receipts: ReceiptVM;
  maxDate = new Date;
  DataSource: any;
  fromDate = new Date();
  toDate = new Date();
  lastdate: any;
  firstdate: any;
  isReadOnly: boolean = false
  selectedCustomer: CustomerVM;
constructor(
  public catSvc: CatalogService,
  public dialog:  MatDialog,
  private cdref: ChangeDetectorRef,
  public datePipe: DatePipe,
  private RcvSvc: ReceivableService) {
    this.receipts = new ReceiptVM
}
ngOnInit(): void {
  this.catSvc.totalRecords = AppConstants.DEFAULT_TOTAL_RECORD;
  this.catSvc.defaultPageSize = AppConstants.DEFAULT_PAGE_SIZE;
  this.catSvc.pageSizes = AppConstants.PAGE_SIZE_OPTIONS;
  this.GetCustomer();
  this.selectedCustomer = new CustomerVM
}
ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.paginator.page
    .pipe(
      tap(() => this.GetReceipt())
    )
    .subscribe();
  this.GetReceipt( );
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
DeleteReceipt(id: number) {
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
      this.RcvSvc.DeleteReceipt(id).subscribe({
        next: (data) => {
          Swal.fire(
            'Deleted!',
            'Receipt has been deleted.',
            'success'
          )
          this.GetReceipt();
        }, error: (e: any) => {
          this.catSvc.ErrorMsgBar("Error Occurred", 5000)
          console.warn(e);
        }
      })
    }
  })
}
OpenReceiptDialog() {
  debugger
  var dialogRef = this.dialog.open(ManageReceiptComponent, {
    disableClose: true, panelClass: 'calendar-form-dialog', width: '90%', height: '90%'
    , data: {}
  });
  dialogRef.afterClosed()
    .subscribe((res) => {
      this.GetReceipt()
    });
}
EditReceipt(id: number) {
  var dialogRef = this.dialog.open(ManageReceiptComponent, {
    disableClose: true, width: '90%',
    height: '90%'
    , data: { id: id }
  });
  dialogRef.afterClosed()
    .subscribe((res) => {
      this.GetReceipt()
    });
}
GetReceipt() {
  this.isLoading = true;
  var receipt = new ReceiptVM();
  receipt.customer = this.receipts.customer;
  receipt.fromDate = this.receipts.fromDate; 
  receipt.toDate = this.receipts.toDate;
  receipt.clientId = +localStorage.getItem("ClientId");
  receipt.pageNo = this.paginator.pageIndex + 1;
  receipt.pageSize = this.paginator.pageSize;

  console.log('Fetching Invoices with:', receipt);

  this.RcvSvc.SearchReceipt(receipt).subscribe({
      next: (res: ReceiptVM[]) => {
          console.log('Fetched Receipt:', res);
          if (res && res.length > 0) {
              this.dataSource.data = res;
              this.catSvc.totalRecords = res[0].totalRecords;
          } else {
              this.dataSource.data = [];
          }
          this.isLoading = false;
      },
      error: (e) => {
          console.error('Error fetching receipts:', e);
          this.catSvc.ErrorMsgBar("Error Occurred", 4000);
          this.isLoading = false;
      }
  });
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  this.dataSource.filterPredicate = (data: ReceiptVM, filter: string) => {
      const matchesText = data.customer.toLowerCase().includes(filter);
      const matchesCustomer = this.receipts.customer  || data.customer === this.receipts.customer;
      const matchesDateRange = (!this.fromDate || new Date(data.date) >= new Date(this.fromDate)) &&
      (!this.toDate || new Date(data.date) <= new Date(this.toDate));

      return matchesText && matchesCustomer && matchesDateRange;
  };
  this.dataSource.filter = filterValue;
}

transform() {
  this.DataSource = this.receipts
  this.receipts.customer 
  this.firstdate = this.datePipe.transform(this.fromDate, 'yyyy-MM-dd');
  this.lastdate = this.datePipe.transform(this.toDate, 'yyyy-MM-dd');
  this.dataSource = this.DataSource.filter((e: { createdOn: string | number | Date; }) =>
    ((this.datePipe.transform(e.createdOn, 'yyyy-MM-dd') == this.firstdate) ||
      (this.datePipe.transform(e.createdOn, 'yyyy-MM-dd')! >= this.firstdate)) &&
    ((this.datePipe.transform(e.createdOn, 'yyyy-MM-dd')! <= this.lastdate) ||
      (this.datePipe.transform(e.createdOn, 'yyyy-MM-dd') == this.lastdate)))
}
}
