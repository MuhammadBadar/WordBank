

import { InquiryService } from '../inquiry.service';
import { AppointmentVM} from '../Models/AppointmentVM'
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { CatalogService } from '../../catalog/catalog.service';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-appointment',
  templateUrl: './manage-appointment.component.html',
  styleUrls: ['./manage-appointment.component.css']
})
export class ManageAppointmentComponent implements OnInit {
 
  
  displayedColumns: string[] = ['inquiryId', 'statusId', 'nextApptDate', 'comment','isActive', 'actions'];
    AddMode: boolean = true
    EditMode: boolean = false
    Add: boolean = true;
    Edit: boolean =false;
    dataSource: any
    DataSource : any
   
    selectedAppointment: AppointmentVM
   // topics?: TopicVM[]
    app: AppointmentVM[]
  snack: any;
  proccessing: boolean;
    constructor(
      private inqSvc: InquiryService,
      private catSvc: CatalogService) {
      this.selectedAppointment = new AppointmentVM
    }
    ngOnInit(): void {
 
      this.GetAppointment();
      
    this.selectedAppointment.isActive = true;
    }
    
   
    GetAppointment() {
      this.inqSvc.GetAppointment().subscribe({
        next: (value: AppointmentVM[]) => {
          debugger;
          this.app = value
          this.DataSource = new MatTableDataSource(this.app)
        }, error: (err) => {
          alert('Error to retrieve Appointment');
          this.catSvc.ErrorMsgBar("Error Occurred", 5000)
        },
      })
  }
  SaveAppointment() {
    this.inqSvc.SaveAppointment(this.selectedAppointment).subscribe({
      next: (value) => {
        this.catSvc.SuccessMsgBar("Successfully Added", 5000)
        this.Refresh();
      }, error: (err) => {
        console.warn(err)
        this.catSvc.ErrorMsgBar("Error Occurred", 5000)
      },
    })
  }
  EditAppointment(follow: AppointmentVM) {
    this.EditMode = true
    this.AddMode = false
    this.selectedAppointment = follow
  }
      GetAppointmentForEdit(id: number) {
        this.selectedAppointment = new AppointmentVM;
        this.selectedAppointment.id = id
        console.warn(this.selectedAppointment);
        this.inqSvc.SearchAppointment(this.selectedAppointment).subscribe({
          next: (res: AppointmentVM[]) => {
            this.app = res;
            console.warn(this.app);
            this.selectedAppointment = this.app[0]
            this.Edit = true;
            this.Add = false;
          }, error: (e) => {
            this.catSvc.ErrorMsgBar("Error Occurred", 5000)
            console.warn(e);
          }
        })
      }
      UpdateAppointment() {
        debugger
        this.inqSvc.UpdateAppointment(this.selectedAppointment).subscribe({
          next: (res) => {
            
            this.catSvc.SuccessMsgBar("Appointment Successfully Updated!", 5000)
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
  DeleteAppointment(id: number) {
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
        this.inqSvc.DeleteAppointment(id).subscribe({
          next: (data) => {
            Swal.fire(
              'Deleted!',
              'Appointment has been deleted.',
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
  

  
  