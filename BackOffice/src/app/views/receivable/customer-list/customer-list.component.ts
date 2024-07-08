import { Component, ViewChild } from '@angular/core';
import { ManageCustomerComponent } from '../manage-customer/manage-customer.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { CustomerVM } from '../Models/CustomerVM';
import { ReceivableService } from '../receivable.service';
import { Router } from '@angular/router';
import { CatalogService } from '../../catalog/catalog.service';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent {
  displayedColumns: string[] = ['paymentTerm', 'name', 'email', 'phone', 'address', 'creditLimit', 'isActive', 'actions'];
  isLoading: boolean = false
  dataSource: any
  Customers: CustomerVM[];
  constructor(
    private catSvc: CatalogService,
    public dialog:  MatDialog,
    private route: Router,
    private RcvSvc: ReceivableService) {
  }
  ngOnInit(): void {
    this.GetCustomer();
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
      disableClose: true, panelClass: 'calendar-form-dialog', width: '1000px', height: '450px'
      , data: {}
    });
    dialogRef.afterClosed()
      .subscribe((res) => {
        this.GetCustomer()
      });
  }
  EditCustomer(id: number) {
    var dialogRef = this.dialog.open(ManageCustomerComponent, {
      disableClose: true, width: '1000px',
      height: '450px'
      , data: { id: id }
    });
    dialogRef.afterClosed()
      .subscribe((res) => {
        this.GetCustomer()
      });
  }
  GetCustomer() {
    this.isLoading=true
    var Customers = new CustomerVM
    this.RcvSvc.SearchCustomer(Customers).subscribe({
      next: (res: CustomerVM[]) => {
        this.Customers = res
        this.dataSource = new MatTableDataSource(res)
        this.isLoading=false
      }, error: (e) => {
        console.warn(e)
        this.catSvc.ErrorMsgBar("Error Occurred", 4000)
      }
    })
  }
}
