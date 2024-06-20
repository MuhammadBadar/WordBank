import { FormBuilder, NgForm } from '@angular/forms';

import { CatalogService } from 'src/app/views/catalog/catalog.service';
import { MatTableDataSource } from '@angular/material/table';
import { LMSService } from './../lms.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { SampletypeVM } from '../Models/SampletypeVM';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-sampletype',
  templateUrl: './manage-sampletype.component.html',
  styleUrls: ['./manage-sampletype.component.css']
})
export class ManagesampletypeComponent implements OnInit {
 
//  PatientForm: FormGroup;
  //selectedPatient: any; // Replace with your actual class/interfac
  
 
   
    sampleColumns: string[] = ['ClientId ', 'SampleTypeName','IsActive'];
    dataSource : any
    AddMode: boolean = true
    EditMode: boolean = false
    Add: boolean = true;
    Edit: boolean = false;
    proccessing: boolean = false;
   
    sampleDataSource : any
    hide = true;

    sample: SampletypeVM[]=[]
    selectedSampletype: SampletypeVM
    @ViewChild('SampletypeForm', { static: true }) SampletypeForm: NgForm;
   
   
    constructor(
      private lmsSvc: LMSService,
      private catSvc: CatalogService,
      private fb: FormBuilder) {
      this.selectedSampletype = new SampletypeVM
    }
    ngOnInit(): void {
 
      this.GetSampletype();
      
    this.selectedSampletype.isActive = true;
    }

    GetSampletype() {
      this.lmsSvc.GetSampletype().subscribe({
        next: (value: SampletypeVM[]) => {
          debugger;
          this.sample = value
          this.sampleDataSource = new MatTableDataSource(this.sample)
        }, error: (err) => {
          alert('Error to retrieve Sampletype');
          this.catSvc.ErrorMsgBar("Error Occurred", 5000)
        },
      })
  }
  SaveSampletype() {
  if (!this.selectedSampletype.sampleTypeName ) {
    this.catSvc.ErrorMsgBar("Please fill in all required fields.", 5000);
    return; // Exit the function if any required field is empty
  }

  this.lmsSvc.SaveSampletype(this.selectedSampletype).subscribe({
    next: (value) => {
      this.catSvc.SuccessMsgBar("Successfully Added", 5000);
      this.Refresh();
    }, 
    error: (err) => {
      this.catSvc.ErrorMsgBar("Error Occurred", 5000);
    },
  });
}


  

  EditSampletype(sample: SampletypeVM) {
    this.EditMode = true
    this.AddMode = false
    this.selectedSampletype = sample
    this.selectedSampletype.isActive = true;
  }
  
  

  UpdateSampletype() {
    this.proccessing = true;

    if (this.SampletypeForm && !this.SampletypeForm.invalid && this.selectedSampletype) {
      this.lmsSvc.UpdateSampletype(this.selectedSampletype).subscribe({
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
    this.GetSampletype();
    this.selectedSampletype = new SampletypeVM
    this.selectedSampletype.isActive = true;
    this.Add = true;
    this.Edit = false;
  }
  DeleteSampletype(ClientId: number) {
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
        this.lmsSvc.DeleteSampletype(ClientId).subscribe({
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
  
