import { LMSService } from './../lms.service';
import { Course } from '../Models/Course';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { CatalogService } from '../../catalog/catalog.service';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  isActive?:false
  imageName: any
  hide :  any;
  previewImage = false;
  currentLightBoxImage: any
  proccessing: boolean = false;
  Edit: boolean = false;
  Add: boolean = true;
  validFields: boolean = false;
  public date = new Date();
  Course: Course[] | undefined;
  selectedCourse: Course;
  @ViewChild('CourseForm', { static: true }) CourseForm!: NgForm;
  displayedColumns: string[] = ['title',  'fee' ,'isActive', 'actions'];
  dataSource: any;
  isDialog: boolean = false;
  dialogData: any;
  dialogref: any;
  constructor(
    private injector: Injector,
    public accSvc: LMSService,
    private catSvc: CatalogService,
    private dialog: MatDialog ,


  ) {
    this.dialogref = this.injector.get(MatDialogRef, null);
    this.dialogData = this.injector.get(MAT_DIALOG_DATA, null);
    
    this.selectedCourse = new Course();
  }



  ngOnInit(): void {
    this.Add = true;
    this.Edit = false;
    this.selectedCourse = new Course
    
    // this.isDialog=true
    this.GetCourse()
    this.isDialog=true
    this.selectedCourse.isActive = true;

    if (this.dialogData ) {
      this.isDialog =this.dialogData.isDialog;
      console.warn(this.dialogData.courseId)}   
   
  
       
  
  }
  GetCourse() {
    this.accSvc.GetCourse().subscribe({
      next: (res: Course[]) => {
        this.Course = res;
        this.dataSource = new MatTableDataSource(this.Course);
      }, error: (e) => {
        this.catSvc.ErrorMsgBar("Error Occurred", 5000)
        console.warn(e);
      }
    })
  }
  DeleteCourse(id: number) {
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
        this.accSvc.DeleteCourse(id).subscribe({
          next: (data) => {
            Swal.fire(
              'Deleted!',
              'Course has been deleted.',
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
  GetCourseForEdit(id: number) {
    this.selectedCourse = new Course;
    this.selectedCourse.id = id
    console.warn(this.selectedCourse);
    this.accSvc.SearchCourse(this.selectedCourse).subscribe({
      next: (res: Course[]) => {
        this.Course = res;
        this.selectedCourse = this.Course[0]
        this.Edit = true;
        this.Add = false;
      }, error: (e) => {
        this.catSvc.ErrorMsgBar("Error Occurred", 5000)
        console.warn(e);
      }
    })
  }
}