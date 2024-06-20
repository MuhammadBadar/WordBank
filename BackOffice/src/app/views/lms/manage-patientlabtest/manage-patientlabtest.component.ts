import { FormBuilder, NgForm } from '@angular/forms';

import { CatalogService } from 'src/app/views/catalog/catalog.service';
import { MatTableDataSource } from '@angular/material/table';
import { LMSService } from './../lms.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { PatientLabTestVM } from '../Models/PatientLabTestVM';
import Swal from 'sweetalert2';

@Component({  
  selector: 'app-manage-patientLabTest',
  templateUrl: './manage-patientLabTest.component.html',
  styleUrls: ['./manage-patientLabTest.component.css']
})
export class ManagepatientLabTestComponent implements OnInit {
 
//  PatientForm: FormGroup;
  //selectedPatient: any; // Replace with your actual class/interfac
  
 
   
    PatlabColumns: string[] = ['clientId', 'labTestId', 'sampleTypeId', 'patientId', 'doctorId', 'testDate', 'remarks','price','discountAmt','paidAmt','resultDate','resultValue','isActive', 'actions'];
   
    AddMode: boolean = true
    EditMode: boolean = false
    Add: boolean = true;
    Edit: boolean = false;
    proccessing: boolean = false;
   
    PatlabDataSource : any
    hide = true;

    Patlab: PatientLabTestVM[]=[]
    selectedPatientLabTest: PatientLabTestVM
    @ViewChild('PatientLabTestForm', { static: true }) PatientLabTestForm: NgForm;
   
   
    constructor(
      private lmsSvc: LMSService,
      private catSvc: CatalogService,
      private fb: FormBuilder) {
      this.selectedPatientLabTest = new PatientLabTestVM
    }
    ngOnInit(): void {
 
      this.GetPatientLabTest();
      
    this.selectedPatientLabTest.isActive = true;
    }
        

    GetPatientLabTest() {
      this.lmsSvc.GetPatientLabTest().subscribe({
        next: (value: PatientLabTestVM[]) => {
          debugger;
          this.Patlab = value
          this.PatlabDataSource = new MatTableDataSource(this.Patlab)
        }, error: (err) => {
          alert('Error to retrieve PatientLabTest');
          this.catSvc.ErrorMsgBar("Error Occurred", 5000)
        },
      })
  }
  SavePatientLabTest() {
  if (!this.selectedPatientLabTest.clientId ) {
    this.catSvc.ErrorMsgBar("Please fill in all required fields.", 5000);
    return; // Exit the function if any required field is empty
  }

  this.lmsSvc.SavePatientLabTest(this.selectedPatientLabTest).subscribe({
    next: (value) => {
      this.catSvc.SuccessMsgBar("Successfully Added", 5000);
      this.Refresh();
    }, 
    error: (err) => {
      this.catSvc.ErrorMsgBar("Error Occurred", 5000);
    },
  });
}


  

  EditPatientLabTest(Patlab: PatientLabTestVM) {
    this.EditMode = true
    this.AddMode = false
    this.selectedPatientLabTest = Patlab
    this.selectedPatientLabTest.isActive = true;
  }
  
  

  UpdatePatientLabTest() {
    this.proccessing = true;

    if (this.PatientLabTestForm && !this.PatientLabTestForm.invalid && this.selectedPatientLabTest) {
      this.lmsSvc.UpdatePatientLabTest(this.selectedPatientLabTest).subscribe({
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
    this.GetPatientLabTest();
    this.selectedPatientLabTest = new PatientLabTestVM
    this.selectedPatientLabTest.isActive = true;
    this.Add = true;
    this.Edit = false;
  }
  DeletePatientLabTest(clientId: number) {
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
        this.lmsSvc.DeletePatientLabTest(clientId).subscribe({
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
  
