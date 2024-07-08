import { Component, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent  {
  
  
displayedColumns: string[] = [ 'customer','invDate', 'invNo', 'invAmount', 'comments', 'isActive', 'actions'];
isLoading: boolean = false
dataSource: any
invoice: InvoiceVM[];
customers:CustomerVM[];
constructor(
  private catSvc: CatalogService,
  public dialog:  MatDialog,
  private route: Router,
  private RcvSvc: ReceivableService) {
}
ngOnInit(): void {
  this.GetInvoice();
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
    disableClose: true, panelClass: 'calendar-form-dialog', width: '1000px', height: '450px'
    , data: {}
  });
  dialogRef.afterClosed()
    .subscribe((res) => {
      this.GetInvoice()
    });
}
EditInvoice(id: number) {
  var dialogRef = this.dialog.open(ManageInvoiceComponent, {
    disableClose: true, width: '1000px',
    height: '450px'
    , data: { id: id }
  });
  dialogRef.afterClosed()
    .subscribe((res) => {
      this.GetInvoice()
    });
}
GetInvoice() {
  this.isLoading=true
  var invoices = new InvoiceVM
  this.RcvSvc.SearchInvoice(invoices).subscribe({
    next: (res: InvoiceVM[]) => {
      this.invoice = res
      this.dataSource = new MatTableDataSource(res)
      this.isLoading=false
    }, error: (e) => {
      console.warn(e)
      this.catSvc.ErrorMsgBar("Error Occurred", 4000)
    }
  })
}
}
