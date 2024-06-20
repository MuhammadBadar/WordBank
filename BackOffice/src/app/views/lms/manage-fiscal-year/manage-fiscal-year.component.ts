
import { CatalogService } from 'src/app/views/catalog/catalog.service';
import { MatTableDataSource } from '@angular/material/table';
import { LMSService } from './../lms.service';
import { Component, OnInit } from '@angular/core';

import { FiscalYearVM } from './../Models/FiscalYearVM';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-fiscal-year',
  templateUrl: './manage-fiscal-year.component.html',
  styleUrls: ['./manage-fiscal-year.component.css']
})
export class ManageFiscalYearComponent implements OnInit {
 
  
 
  
    fisyColumns: string[] = [ 'yearCode', 'yearDesc', 'yearDateFrom', 'yearDateTo', 'isActiveYear','isActive', 'actions'];
    AddMode: boolean = true
    EditMode: boolean = false
    Add: boolean = true;
    
    dataSource: any
    DataSource : any
   // selectedTopic: TopicVM
    selectedFiscalYear: FiscalYearVM
   // topics?: TopicVM[]
    fisy: FiscalYearVM[]
    constructor(
      private lmsSvc: LMSService,
      private catSvc: CatalogService) {
      this.selectedFiscalYear = new FiscalYearVM
    }
    ngOnInit(): void {
 
      this.GetFiscalYear();
      
    this.selectedFiscalYear.isActive = true;
    }
    
   
    GetFiscalYear() {
      this.lmsSvc.GetFiscalYear().subscribe({
        next: (value: FiscalYearVM[]) => {
          debugger;
          this.fisy = value
          this.DataSource = new MatTableDataSource(this.fisy)
        }, error: (err) => {
          alert('Error to retrieve FiscalYear');
          this.catSvc.ErrorMsgBar("Error Occurred", 5000)
        },
      })
  }
  SaveFiscalYear() {
    this.lmsSvc.SaveFiscalYear(this.selectedFiscalYear).subscribe({
      next: (value) => {
        this.catSvc.SuccessMsgBar("Successfully Added", 5000)
        this.Refresh();
      }, error: (err) => {
        console.warn(err)
        this.catSvc.ErrorMsgBar("Error Occurred", 5000)
      },
    })
  }
  EditFiscalYear(fisy: FiscalYearVM) {
    this.EditMode = true
    this.AddMode = false
    this.selectedFiscalYear = fisy
  }
  UpdateFiscalYear() {
    this.lmsSvc.UpdateFiscalYear(this.selectedFiscalYear).subscribe({
      next: (value) => {
        this.catSvc.SuccessMsgBar("Successfully Updated", 5000)
        this.Refresh();
      }, error: (err) => {
        this.catSvc.ErrorMsgBar("Error Occurred", 5000)
      },
    })
  }
  Refresh() {
    this.GetFiscalYear();
    this.selectedFiscalYear = new FiscalYearVM
    this.EditMode = false
    this.AddMode = true
  }
  DeleteFiscalYear(id: number) {
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
        this.lmsSvc.DeleteFiscalYear(id).subscribe({
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
  
