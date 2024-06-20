import { FormBuilder, NgForm } from '@angular/forms';

import { CatalogService } from 'src/app/views/catalog/catalog.service';
import { MatTableDataSource } from '@angular/material/table';
import { LMSService } from './../lms.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { PageVM } from '../Models/PageVM';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-manage-page',
  templateUrl: './manage-page.component.html',
  styleUrls: ['./manage-page.component.css']
})
export class ManagepageComponent implements OnInit {
 

 
   
    pageColumns: string[] = ['NovelId ', 'ChapterId','PageNo','Content','IsActive'];
    dataSource : any
    AddMode: boolean = true
    EditMode: boolean = false
    Add: boolean = true;
    Edit: boolean = false;
    proccessing: boolean = false;
   
    pageDataSource : any;
    hide = true;

    page: PageVM[]=[]
    selectedpage: PageVM
    @ViewChild('pageForm', { static: true }) pageForm: NgForm;
   
    constructor(
      private lmsSvc: LMSService,
      private catSvc: CatalogService,
      private fb: FormBuilder) {
      this.selectedpage = new PageVM
    }
    ngOnInit(): void {
 
      this.GetPage();
      
    this.selectedpage.isActive = true;
    }
  Getpage() {
    throw new Error('Method not implemented.');
  }
        

    GetPage() {
      this.lmsSvc.GetPage().subscribe({
        next: (value: PageVM[]) => {
          debugger;
          this.page = value
          this.pageDataSource = new MatTableDataSource(this.page)
        }, error: (err) => {
          alert('Error to retrieve Patient');
          this.catSvc.ErrorMsgBar("Error Occurred", 5000)
        },
      })
  }
  SavePage() {
  if (!this.selectedpage.PageNo) {
    this.catSvc.ErrorMsgBar("Please fill in all required fields.", 5000);
    return; // Exit the function if any required field is empty
  }

  this.lmsSvc.SavePage(this.selectedpage).subscribe({
    next: (value) => {
      this.catSvc.SuccessMsgBar("Successfully Added", 5000);
      this.Refresh();
    }, 
    error: (err) => {
      this.catSvc.ErrorMsgBar("Error Occurred", 5000);
    },
  });
}


  

  EditPage(page: PageVM) {
    this.EditMode = true
    this.AddMode = false
    this.selectedpage = page
    this.selectedpage.isActive = true;
  }
  
  

  UpdatePage() {
    this.proccessing = true;

    if (this.pageForm && !this.pageForm.invalid && this.selectedpage) {
      this.lmsSvc.UpdatePage(this.selectedpage).subscribe({
        next: (value) => {
          this.catSvc.SuccessMsgBar("Successfully Updated", 5000);
          this.Add = true;
          this.Edit = false;
          this.proccessing = false;
          this.ngOnInit();
        },
        error: (err) => {
          this.catSvc.ErrorMsgBar("Error Occurred", 5000);
          console.warn(err);
          this.proccessing = false;
        }
      });
    } else {
      this.catSvc.ErrorMsgBar("Please Fill all required fields!", 5000);
      this.proccessing = false;
    }
  }
  
  Refresh() {
    this.GetPage();
    this.selectedpage = new PageVM
    this.selectedpage.isActive = true;
    this.Add = true;
    this.Edit = false;
  }
  DeletePage(NovelId: number) {
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
        this.lmsSvc.DeletePage(NovelId).subscribe({
          next: (data) => {
            Swal.fire(
              'Deleted!',
              'Topic has been deleted.',
              'success'
            )
            this.Refresh();
          }, error: (e) => {
            this.catSvc.ErrorMsgBar("Error Occurred", 5000)
            console.warn(e);
          }
        })
      }
    })
  }
  
  }
  
