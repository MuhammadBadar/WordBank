
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NotificationTemplateVM } from '../models/NotificationTemplateVM';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TMSService } from '../tms.service';
import { CreateNotificationTemplateComponent } from './create-notification-template/create-notification-template.component';
import { AppConstants } from 'src/app/app.constants/AppConstants';
import { CatalogService } from '../../catalog/catalog.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs';

@Component({
  selector: 'app-manage-notification-template',
  templateUrl: './manage-notification-template.component.html',
  styleUrls: ['./manage-notification-template.component.css']
})
export class ManageNotificationTemplateComponent implements OnInit {

  //displayedColumns = ['keycode', 'templatename', 'subject', 'body', 'actions']
  displayedColumns = ['templatename', 'subject', 'body', 'actions']
  templates: NotificationTemplateVM[]
  dataSource=new MatTableDataSource<NotificationTemplateVM>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  Edit: boolean = false;
  Add: boolean = true;
  dialogRef: any;
  isLoading: boolean = false
  constructor(
    private route: Router,
    public taskSvc: TMSService,
    public catSvc: CatalogService,
    public dialog:  MatDialog,
    private cdref: ChangeDetectorRef,
  ) {
    this.taskSvc.selectedTemplateData = new NotificationTemplateVM
  }
  ngOnInit(): void {
    this.catSvc.totalRecords = AppConstants.DEFAULT_TOTAL_RECORD;
    this.catSvc.defaultPageSize = AppConstants.DEFAULT_PAGE_SIZE;
    this.catSvc.pageSizes = AppConstants.PAGE_SIZE_OPTIONS;
    this.taskSvc.selectedTemplateData = new NotificationTemplateVM
    this.taskSvc.SearchTemplate(this.taskSvc.selectedTemplateData).subscribe((res: NotificationTemplateVM[]) => {
      this.templates = res;
      this.dataSource = new MatTableDataSource(this.templates);
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator.page
     
    this.cdref.detectChanges();
  }
  ngAfterContentChecked() {
    this.cdref.detectChanges();
    this.cdref.markForCheck();
  } 

  EditTemplate(tem) {
    this.route.navigate(['/tms/notificationtemplate'], { queryParams: { id: tem.id } });
  }
  DeleteTemplate(id) {
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
        this.taskSvc.DeleteTemplate(id).subscribe((data) => {
          Swal.fire(
            'Deleted!',
            'Template has been deleted.',
            'success'
          )
          this.ngOnInit();
        })
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
