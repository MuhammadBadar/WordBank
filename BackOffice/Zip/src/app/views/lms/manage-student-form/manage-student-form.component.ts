
import { CatalogService } from 'src/app/views/catalog/catalog.service';
import { MatTableDataSource } from '@angular/material/table';
import { LMSService } from './../lms.service';
import { Component, OnInit } from '@angular/core';

import { StudentFormVM } from '../Models/StudentFormVM';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-student-form',
  templateUrl: './manage-student-form.component.html',
  styleUrls: ['./manage-student-form.component.css']
})
export class ManagestudentformComponent implements OnInit {
 
  
 
  stdformColumns: string[] = [`id`,`studentName`,`guardianName`,`guardianRelationship`,'guardianProfession','degree','university','cNIC','joiningDate','address','isActive', 'actions'];
  
    AddMode: boolean = true
    EditMode: boolean = false
    Add: boolean = true;
    
     dataSource: any
    stdformDataSource : any
   // selectedTopic: TopicVM
    selectedStudentForm: StudentFormVM
   // topics?: TopicVM[]
    stdform: StudentFormVM[]
    constructor(
      private lmsSvc: LMSService,
      private catSvc: CatalogService) {
      this.selectedStudentForm = new StudentFormVM
    }
    ngOnInit(): void {
 
      this.GetStudentForm();
      
    this.selectedStudentForm.isActive = true;
    }
    
   
    GetStudentForm() {
      this.lmsSvc.GetStudentForm().subscribe({
        next: (value: StudentFormVM[]) => {
          debugger;
          this.stdform = value
          this.stdformDataSource = new MatTableDataSource(this.stdform)
        }, error: (err) => {
          alert('Error to retrieve StudentForm');
          this.catSvc.ErrorMsgBar("Error Occurred", 5000)
        },
      })
  }
  SaveStudentForm() {
    this.lmsSvc.SaveStudentForm(this.selectedStudentForm).subscribe({
      next: (value) => {
        this.catSvc.SuccessMsgBar("Successfully Added", 5000)
        this.Refresh();
      }, error: (err) => {
        this.catSvc.ErrorMsgBar("Error Occurred", 5000)
      },
    })
  }
  EditStudentForm(stdform: StudentFormVM) {
    this.EditMode = true
    this.AddMode = false
    this.selectedStudentForm = stdform
  }
  UpdateStudentForm() {
    this.lmsSvc.UpdateStudentForm(this.selectedStudentForm).subscribe({
      next: (value) => {
        this.catSvc.SuccessMsgBar("Successfully Updated", 5000)
        this.Refresh();
      }, error: (err) => {
        this.catSvc.ErrorMsgBar("Error Occurred", 5000)
      },
    })
  }
  Refresh() {
    this.GetStudentForm();
    this.selectedStudentForm = new StudentFormVM
    this.EditMode = false
    this.AddMode = true
  }
  DeleteStudentForm(id: number) {
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
        this.lmsSvc.DeleteStudentForm(id).subscribe({
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
  








