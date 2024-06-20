import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Globals } from 'src/app/globals';
import { InquiryVM } from './Models/InquiryVM';
import {FollowUpVM} from './Models/FollowUpVM'
import { AppointmentVM } from './Models/AppointmentVM';

@Injectable({
  providedIn: 'root'

})
export class InquiryService {
  
  selectedInquiry: InquiryVM;
  selectedFollowUp: FollowUpVM;
  confirm: any;
 
 
  
  
 

  SuccessMsgBar(arg0: string, arg1: number) {
    throw new Error('Method not implemented.');
  }
  ErrorMsgBar(arg0: string, arg1: number) {
    throw new Error('Method not implemented.');
  }


  constructor(private http: HttpClient) { }

  UpdateInquiry(value: InquiryVM) {
    return this.http.put(Globals.BASE_API_URL + 'Inquiry', value);
  }
  
  GetInquiryById(id: number): Observable<InquiryVM> {
    return this.http.get<InquiryVM>(Globals.BASE_API_URL + 'Inquiry/' + id).pipe()
  }
  SearchInquiry(value: InquiryVM): Observable<InquiryVM[]> {
    return this.http.post<InquiryVM[]>(Globals.BASE_API_URL + 'Inquiry/Search', value).pipe();
  }
  GetInquiry(): Observable<InquiryVM[]> {
    return this.http.get<InquiryVM[]>(Globals.BASE_API_URL + 'Inquiry').pipe();
  }
  SaveInquiry(value: InquiryVM): Observable<any> {
    return this.http.post(Globals.BASE_API_URL + 'Inquiry', value);
  }
  DeleteInquiry(id: number) {
    return this.http.delete(Globals.BASE_API_URL + 'Inquiry/' + id);
  }


 
 

  UpdateFollowUp(value: FollowUpVM) {
    return this.http.put(Globals.BASE_API_URL + 'FollowUp', value);
  }
  GetFollowUpById(id: number): Observable<FollowUpVM> {
    return this.http.get<FollowUpVM>(Globals.BASE_API_URL + 'FollowUp/' + id).pipe()
  }
  SearchFollowUp(value: FollowUpVM): Observable<FollowUpVM[]> {
    return this.http.post<FollowUpVM[]>(Globals.BASE_API_URL + 'FollowUp/Search', value).pipe();
  }
  GetFollowUp(): Observable<FollowUpVM[]> {
    return this.http.get<FollowUpVM[]>(Globals.BASE_API_URL + 'FollowUp').pipe();
  }
  SaveFollowUp(value: FollowUpVM): Observable<any> {
    return this.http.post(Globals.BASE_API_URL + 'FollowUp', value);
  }
  DeleteFollowUp(id: number) {
    return this.http.delete(Globals.BASE_API_URL + 'FollowUp/' + id);
  }
  EditFollowUp(id: number) {
    return this.http.delete(Globals.BASE_API_URL + 'FollowUp/' + id);
  }

  UpdateAppointment(value: AppointmentVM) {
    return this.http.put(Globals.BASE_API_URL + 'Appointment', value);
  }
  GetAppointmentById(id: number): Observable<AppointmentVM> {
    return this.http.get<AppointmentVM>(Globals.BASE_API_URL + 'Appointment/' + id).pipe()
  }
  SearchAppointment(value: AppointmentVM): Observable<AppointmentVM[]> {
    return this.http.post<AppointmentVM[]>(Globals.BASE_API_URL + 'Appointment/Search', value).pipe();
  }
  GetAppointment(): Observable<AppointmentVM[]> {
    return this.http.get<AppointmentVM[]>(Globals.BASE_API_URL + 'Appointment').pipe();
  }
  SaveAppointment(value: AppointmentVM): Observable<any> {
    return this.http.post(Globals.BASE_API_URL + 'Appointment', value);
  }
  DeleteAppointment(id: number) {
    return this.http.delete(Globals.BASE_API_URL + 'Appointment/' + id);
  }
  EditAppointment(id: number) {
    return this.http.delete(Globals.BASE_API_URL + 'Appointment/' + id);
  }

}
