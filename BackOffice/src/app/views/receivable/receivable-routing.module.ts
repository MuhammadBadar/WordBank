import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { ReceivableModule } from './receivable.module';
import { ManageReceiptComponent} from './manage-receipt/manage-receipt.component' 
import { ManageCustomerComponent } from './manage-customer/manage-customer.component';
import { ManageInvoiceComponent } from './manage-invoice/manage-invoice.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { ReceiptListComponent } from './receipt-list/receipt-list.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Receivable'
    },
    children:[
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'receivable'
      },
       {
        path: "receipt",
        component: ReceiptListComponent,
    
      },
      {
        path: "customer",
        component: CustomerListComponent,
    
      },
      {
        path: "ManageCustomer",
        component: ManageCustomerComponent,
    
      },
      {
        path: "invoice",
        component: InvoiceListComponent,
    
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceivableRoutingModule { }
