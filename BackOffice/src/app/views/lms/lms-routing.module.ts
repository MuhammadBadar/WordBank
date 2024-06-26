import { ManageCourseDetailComponent } from './manage-course-detail/manage-course-detail.component';

import { ManageCourseComponent } from './manage-course/manage-course.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageTopicComponent } from './manage-topic/manage-topic.component';
import { ManageLectureComponent } from './manage-lecture/manage-lecture.component';
import { ManageCityComponent } from './manage-city/manage-city.component';
import { ManageVocabularyComponent } from './manage-vocabulary/manage-vocabulary.component';
import { ManageCityStudentComponent } from './manage-city-student/manage-city-student.component';
import { ManageStudentComponent } from './manage-student/manage-student.component';

import { ManageAssignTaskComponent } from './manage-assign-task/manage-assign-task.component';
import { ManagePatientComponent } from './manage-patient/manage-patient.component';
import { ManagesampletypeComponent } from './manage-sampletype/manage-sampletype.component';
import { ManageFiscalYearComponent } from './manage-fiscal-year/manage-fiscal-year.component';
import { ManageUserattbydateComponent } from './manage-userattbydate/manage-userattbydate.component';
import { ManageTasksComponent } from './manage-tasks/manage-tasks.component';
import { ManageUserreportComponent } from './manage-userreport/manage-userreport.component';
import { ManageUsertaskbydateComponent } from './manage-usertaskbydate/manage-usertaskbydate.component';
import { ManagestudentformComponent } from './manage-student-form/manage-student-form.component';
import { ManageUsertaskComponent } from './manage-usertask/manage-usertask.component';
import { ManageClientComponent } from './manage-client/manage-client.component';
import { ManageDayStatusComponent } from './manage-day-status/manage-day-status.component';
import { LoginComponent } from '../security/login/login.component';
import { TokenCheck } from '../security/TokenCheck';
import { ManageAssignClassComponent } from './manage-assign-class/manage-assign-class.component';
import { ManageGuardianschoolComponent } from './manage-guardianschool/manage-guardianschool.component';
import { ManageFeepaymentschoolComponent } from './manage-feepaymentschool/manage-feepaymentschool.component';
import { ManageFeetypeschoolComponent } from './manage-feetypeschool/manage-feetypeschool.component';
import { ManageStudentschoolComponent } from './manage-studentschool/manage-studentschool.component';
import { ManageFeeDetailsComponent } from './manage-fee-details/manage-fee-details.component';
import { ManagepatientLabTestComponent } from './manage-patientlabtest/manage-patientlabtest.component';
import { CourseComponent } from './course/course.component';
import { ManageUserAdditionalfieldsComponent } from './manage-user-additionalfields/manage-user-additionalfields.component';




const routes: Routes = [{
  path: '',
  data: {
    title: 'Items'
  },
  children: [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'user'
    },
    {
      path: "user",
      component: ManageUserComponent,
      pathMatch: "full"
    },

    {
      path: "FiscalYear",
      component: ManageFiscalYearComponent,
      pathMatch: "full"
    },
    {
      path: "Course",
      component: CourseComponent,
      pathMatch: "full"
    },
    {
      path: "studentForm",
      component: ManagestudentformComponent,
      pathMatch: "full"
    },
    {
      path: "course",
      component: ManageCourseComponent,
      pathMatch: "full"
    },

    {
      path: "PatientLabTest",
      component: ManagepatientLabTestComponent,
      pathMatch: "full"
    },

    {
      path: "usertask",
      component: ManageUsertaskComponent,
      pathMatch: "full"
    },
    {
      path: "daystatus",
      component: ManageDayStatusComponent,
      pathMatch: "full"
    },
     
    {
      path: "courseDetail",
      component: ManageCourseDetailComponent,
      pathMatch: "full"
    },
    {
      path: "topic",
      component: ManageTopicComponent,
      pathMatch: "full"
    },
    
    {
      path: "userAd",
      component: ManageUserAdditionalfieldsComponent,
      pathMatch: "full"
    },
    {
      path: "lecture",
      component: ManageLectureComponent,
      pathMatch: "full"
    }, 
    {
      path: "assignTask",
      component: ManageAssignTaskComponent,
      pathMatch: "full"
    },
   
    {
      path: "Vocabulary",
      component: ManageVocabularyComponent,
      pathMatch: "full"
    },
    {
      path: "City",
      component: ManageCityComponent,
      pathMatch: "full"
    },
   
    {
      path: "CityStudent",
      component: ManageCityStudentComponent,
      pathMatch: "full"
    },
    {
      path: "Student",
      component: ManageStudentComponent,
      pathMatch: "full"
    },
   
    {
      path: "Patient",
      component: ManagePatientComponent,
      pathMatch: "full"
    },
    {
      path: "Client",
      component: ManageClientComponent,
      pathMatch: "full"
    },

    

    {
      path: "Userattbydate",
      component: ManageUserattbydateComponent,
      pathMatch: "full"
    },

    {
      path: "Tasks",
      component: ManageTasksComponent,
      pathMatch: "full"
    },

    {
      path: "Usertaskbydate",
      component: ManageUsertaskbydateComponent,
      pathMatch: "full"
    },
    {
      path: "Userreport",
      component: ManageUserreportComponent,
      pathMatch: "full"
    },
    {
      path: "GuardianSchool",
      component: ManageGuardianschoolComponent,
      pathMatch: "full"
    },
    {
      path: "AssignClass",
      component: ManageAssignClassComponent,
      pathMatch: "full"
    },
    {
      path: "FeePayment",
      component: ManageFeepaymentschoolComponent,
      pathMatch: "full"
    },
    {
      path: "FeeType",
      component: ManageFeetypeschoolComponent,
      pathMatch: "full"
    },
    {
      path: "StudentSchool",
      component: ManageStudentschoolComponent,
      pathMatch: "full"
    },
    {
      path:"FeeDetails",
      component:ManageFeeDetailsComponent,
      pathMatch:"full"
    },
    {
      path:"Sampletype",
      component:ManagesampletypeComponent,
      pathMatch:"full"
    },
   /*  {
      path:"forget-password",
      component:ForgetPasswordComponent,
      pathMatch:"full"
    }, */
    
    // {
    //   path: 'secLogin',
    //   component: LoginComponent,
    //   canActivate: [TokenCheck],
    //   data: {
    //     title: 'Login Page',
    //     Route: 'secLogin'
    //   }
    // },
  ]
  
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LMSRoutingModule { }
