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

@Component({
  selector: 'app-Receipt-list',
  templateUrl: './Receipt-list.component.html',
  styleUrls: ['./Receipt-list.component.css']
})
export class ReceiptListComponent  {
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
displayedColumns: string[] = ['customer', 'date', 'number', 'amount', 'comments','nextPayDate', 'isActive', 'actions'];
isLoading: boolean = false
dataSource: MatTableDataSource<ReceiptVM>;
Receipt: ReceiptVM[];
customers:CustomerVM[];
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
  var Receipts = new ReceiptVM
  Receipts.pageNo = this.paginator.pageIndex + 1;;
  Receipts.pageSize = this.paginator.pageSize;
  this.RcvSvc.SearchReceipt(Receipts).subscribe({
    next: (res: ReceiptVM[]) => {
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
