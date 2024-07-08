import { Component, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-Receipt-list',
  templateUrl: './Receipt-list.component.html',
  styleUrls: ['./Receipt-list.component.css']
})
export class ReceiptListComponent  {
  
  
displayedColumns: string[] = ['customer', 'date', 'number', 'amount', 'comments','nextPayDate', 'isActive', 'actions'];
isLoading: boolean = false
dataSource: any
Receipt: ReceiptVM[];
customers:CustomerVM[];
constructor(
  private catSvc: CatalogService,
  public dialog:  MatDialog,
  private route: Router,
  private RcvSvc: ReceivableService) {
}
ngOnInit(): void {
  this.GetReceipt();
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
    disableClose: true, panelClass: 'calendar-form-dialog', width: '1000px', height: '450px'
    , data: {}
  });
  dialogRef.afterClosed()
    .subscribe((res) => {
      this.GetReceipt()
    });
}
EditReceipt(id: number) {
  var dialogRef = this.dialog.open(ManageReceiptComponent, {
    disableClose: true, width: '1000px',
    height: '450px'
    , data: { id: id }
  });
  dialogRef.afterClosed()
    .subscribe((res) => {
      this.GetReceipt()
    });
}
GetReceipt() {
  this.isLoading=true
  var Receipts = new ReceiptVM
  this.RcvSvc.SearchReceipt(Receipts).subscribe({
    next: (res: ReceiptVM[]) => {
      this.Receipt = res
      this.dataSource = new MatTableDataSource(res)
      this.isLoading=false
    }, error: (e) => {
      console.warn(e)
      this.catSvc.ErrorMsgBar("Error Occurred", 4000)
    }
  })
}
}
