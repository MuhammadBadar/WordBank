import { LMSService } from './../lms.service';
import { UserVM } from './../Models/UserVM';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { CatalogService } from '../../catalog/catalog.service';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {ManageUserAdditionalfieldsComponent}from '../manage-user-additionalfields/manage-user-additionalfields.component'

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {
  
  hide = true;
  proccessing: boolean = false;
  Edit: boolean = false;
  Add: boolean = true;
  validFields: boolean = false;
  public date = new Date();
  User: UserVM[] | undefined;
  selectedUser: UserVM;
  @ViewChild('userForm', { static: true }) userForm!: NgForm;
  displayedColumns: string[] = ['email', 'password', 'isActive','actions'];
  dataSource: any;
  dialog: any;
  dialogRefe: any;
  dialogData: any;
  dialogRef: any;
 isDialod: any
  
  constructor(
    public lmsSvc: LMSService,
    private snack: MatSnackBar,
    private route: ActivatedRoute,
    private injector: Injector,
    private catSvc: CatalogService,
    private routee: Router) {
    this.selectedUser = new UserVM
   
    this.dialogRefe = this.injector.get(MatDialogRef, null);
    this.dialogData = this.injector.get(MAT_DIALOG_DATA, null);
  }
  ngOnInit(): void {
    this.Add = true;
    this.Edit = false;
    this.selectedUser = new UserVM
    this.GetUser()
    this.selectedUser.isActive = true;
    
  }
  GetUser() {
    this.lmsSvc.GetUser().subscribe({
      next: (res: UserVM[]) => {
        this.User = res;
        this.dataSource = new MatTableDataSource(this.User);
      }, error: (e) => {
        this.catSvc.ErrorMsgBar("Error Occurred", 5000)
        console.warn(e);
      }
    })
  }

/*   OpenUserDialog() {
    // this.isDialogOpen = true;
    this.dialogRef = this.dialog.open(ManageUserAdditionalfieldsComponent, {
      width: '1200px',
      height: '950px',
      data: { }
    });

   
}  */
  DeleteUser(id: number) {
    debugger
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
        this.lmsSvc.DeleteUser(id).subscribe({
          next: (data) => {
            Swal.fire(
              'Deleted!',
              'User has been deleted.',
              'success'
            )
            this.ngOnInit();
          }, error: (e) => {
            this.catSvc.ErrorMsgBar("Error Occurred", 5000)
            console.warn(e);
          }
        })
      }
    })
  }
  GetUserForEdit(id: string) {
    this.selectedUser = new UserVM;
    this.selectedUser.id = id
    console.warn(this.selectedUser);
    this.lmsSvc.SearchUser(this.selectedUser).subscribe({
      next: (res: UserVM[]) => {
        this.User = res;
        console.warn(this.User);
        this.selectedUser = this.User[0]
        this.Edit = true;
        this.Add = false;
      }, error: (e) => {
        this.catSvc.ErrorMsgBar("Error Occurred", 5000)
        console.warn(e);
      }
    })
  }
  SaveUser() {
    this.lmsSvc.GetUser().subscribe({
      next: (res: UserVM[]) => {
        console.warn(res)
        var list = res
        if (this.Edit)
          list = list.filter(x => x.id != this.selectedUser.id)
          console.warn(list)
        var find = list.find(x => x.email == this.selectedUser.email)
        if (find == undefined) {
          console.warn(this.selectedUser.id)
          if (!this.selectedUser.id) {
            if (this.Edit)
              this.UpdateUser()
            else {
              this.lmsSvc.SaveUser(this.selectedUser).subscribe({
                next: (res) => {
                  this.catSvc.SuccessMsgBar("User Successfully Added!", 5000)
                  this.Add = true;
                  this.Edit = false;
                  this.proccessing = false
                  this.ngOnInit();
                }, error: (e) => {
                  this.catSvc.ErrorMsgBar("Error Occurred", 5000)
                  console.warn(e);
                  this.proccessing = false
                }
              })
            }
          } else {
            this.catSvc.ErrorMsgBar("Please Fill all required fields!", 5000)
            this.proccessing = false
          }
        } else
          this.catSvc.ErrorMsgBar("This Email Address Already Taken ", 5000)
      }, error: (e) => {
        this.catSvc.ErrorMsgBar("Error Occurred", 5000)
        console.warn(e);
      }
    })
  }
  UpdateUser() {
    debugger
    this.lmsSvc.UpdateUser(this.selectedUser).subscribe({
      next: (res) => {
        
        this.catSvc.SuccessMsgBar("User Successfully Updated!", 5000)
        this.Add = true;
        this.Edit = false;
        this.proccessing = false
        this.ngOnInit();
      }, error: (e) => {
        this.catSvc.ErrorMsgBar("Error Occurred", 5000)
        console.warn(e);
        this.proccessing = false
      }
    })
    this.proccessing = false
  }
  Refresh() {
    this.Add = true;
    this.Edit = false;
  }
}