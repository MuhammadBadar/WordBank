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

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent  {
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
displayedColumns: string[] = [ 'customer','invDate', 'invNo', 'invAmount', 'comments', 'isActive', 'actions'];
isLoading: boolean = false
dataSource: MatTableDataSource<InvoiceVM>;
invoice: InvoiceVM[];
customers:CustomerVM[];
  DataSource: any;
constructor(
  public catSvc: CatalogService,
  public dialog:  MatDialog,
  private cdref: ChangeDetectorRef,
  private route: Router,
  private RcvSvc: ReceivableService) {
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
      tap(() => this.GetInvoice())
    )
    .subscribe();
  this.GetInvoice( );
  this.cdref.detectChanges();
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
ngAfterContentChecked() {
  this.cdref.detectChanges();
  this.cdref.markForCheck();
} 
GetInvoice() {
  debugger
  var invoices = new InvoiceVM
  invoices.pageNo = this.paginator.pageIndex + 1;;
  invoices.pageSize = this.paginator.pageSize;
  this.RcvSvc.SearchInvoice(invoices).subscribe({
    next: (res: InvoiceVM[]) => {
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
}
