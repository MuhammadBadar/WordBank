import { NgModule } from '@angular/core';
import { InquiryModule } from './inquiry.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { ManageInquiryFollowUpComponent } from './manage-inquiry-follow-up/manage-inquiry-follow-up.component';
import { ManageAppointmentComponent } from './manage-appointment/manage-appointment.component';
import { ManageInquirylistComponent } from './manage-inquirylist/manage-inquirylist.component';
import { ManageInquiryComponent } from './manage-inquiry/manage-inquiry.component';
import { ManageServiceOutlineComponent } from './manage-service-out-line/manage-service-out-line.component';
import { ServiceListComponent } from './service-list/service-list.component';

const routes: Routes = [{ 
  path: '',
data: {
  title: 'Inquiry'
},
children:[
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'inquiry'
  },
  {
    path: "manageinquiry",
    component: ManageInquiryComponent,

  },
  {
    path: "serviceList",
    component: ServiceListComponent,

  },
  {
    path: "serviceOutline",
    component: ManageServiceOutlineComponent,

  },

  {
    path: "inquirylist",
    component: ManageInquirylistComponent,

  },
  {
    path: "followUp",
    component: ManageInquiryFollowUpComponent,

  },
  {
    path: "appointment",
    component: ManageAppointmentComponent,

  },




]




}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InquiryRoutingModule {


  
 }
