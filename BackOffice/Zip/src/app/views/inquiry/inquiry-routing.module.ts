import { NgModule } from '@angular/core';
import { InquiryModule } from './inquiry.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { ManageInquiryFollowUpComponent } from './manage-inquiry-follow-up/manage-inquiry-follow-up.component';
import { ManageAppointmentComponent } from './manage-appointment/manage-appointment.component';
import { ManageInquirylistComponent } from './manage-inquirylist/manage-inquirylist.component';
import { ManageInquiryComponent } from './manage-inquiry/manage-inquiry.component';

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
    path: "manage-inquiry",
    component: ManageInquiryComponent,

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
