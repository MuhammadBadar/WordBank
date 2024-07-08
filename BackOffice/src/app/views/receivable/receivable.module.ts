
import { ReceivableRoutingModule } from './receivable-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
 import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AccordionModule, BadgeModule, BreadcrumbModule, ButtonModule, CardModule, CollapseModule, GridModule, UtilitiesModule, SharedModule, ListGroupModule, PlaceholderModule, ProgressModule, SpinnerModule, TabsModule, NavModule, TooltipModule, CarouselModule, FormModule, DropdownModule, PaginationModule, PopoverModule, ModalModule, TableModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { AuthorizationCheck } from '../security/AuthorizationCheck';
import { ManageReceiptComponent } from './manage-receipt/manage-receipt.component';
import { ManageCustomerComponent } from './manage-customer/manage-customer.component';
import { ManageInvoiceComponent } from './manage-invoice/manage-invoice.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { ReceiptListComponent } from './receipt-list/receipt-list.component';





@NgModule({
  declarations: [  
    ManageReceiptComponent, ManageCustomerComponent, ManageInvoiceComponent, CustomerListComponent, InvoiceListComponent, ReceiptListComponent,
  ],
              
  imports: [
    NgxMatDatetimePickerModule,
    MatMomentDateModule,
    NgxMaterialTimepickerModule,
   // NgxMaterialTimepickerModule,
    NgxMatNativeDateModule,
    FlexLayoutModule,
    FormsModule,
    MatDialogModule,
   
    MatNativeDateModule,
    MatMomentDateModule,
    MatTableModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    MatTooltipModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    MatDatepickerModule,
   
    MatProgressBarModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    NgxMatTimepickerModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    CommonModule,
    ReceivableRoutingModule,

    AccordionModule,
    BadgeModule,
    BreadcrumbModule,
    ButtonModule,
    CardModule,
    CollapseModule,
    GridModule,
    UtilitiesModule,
    SharedModule,
    ListGroupModule,
    IconModule,
    ListGroupModule,
    PlaceholderModule,
    ProgressModule,
    SpinnerModule,
    TabsModule,
    NavModule,
    TooltipModule,
    CarouselModule,
    FormModule,
    DropdownModule,
    PaginationModule,
    PopoverModule,
    ModalModule,
    TableModule,
    MatToolbarModule,
    MatProgressSpinnerModule
  ],

  providers: [DatePipe ,AuthorizationCheck ,MatNativeDateModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ReceivableModule { }
