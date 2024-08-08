import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Globals } from 'src/app/globals';
import { InquiryVM } from './Models/InquiryVM';
import {FollowUpVM} from './Models/FollowUpVM'
import { AppointmentVM } from './Models/AppointmentVM';
import { ServiceOutlineVM } from './Models/ServiceOutlineVM';
import {ServiceChargesVM} from './Models/ServiceChargesVM'
import {ServiceVM} from './Models/ServiceVM';
import {ServiceCompaignVM} from './Models/ServiceCompaignVM'


@Injectable({
  providedIn: 'root'

})
export class InquiryService {
  
  selectedFollowUp: FollowUpVM;
  confirm: any;


  constructor(private http: HttpClient) { }

  UpdateInquiry(value: InquiryVM): Observable<any> {
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


 
 

  UpdateFollowUp(value: FollowUpVM): Observable<any> {
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

  UpdateAppointment(value: AppointmentVM) : Observable<any>{
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


  UpdateService(value: ServiceVM): Observable<any> {
    return this.http.put(Globals.BASE_API_URL + 'Services', value);
  }
  GetServiceById(id: number): Observable<ServiceVM> {
    return this.http.get<ServiceVM>(Globals.BASE_API_URL + 'Services/' + id).pipe()
  }
  SearchService(value: ServiceVM): Observable<ServiceVM[]> {
    return this.http.post<ServiceVM[]>(Globals.BASE_API_URL + 'Services/Search', value).pipe();
  }
  GetService(): Observable<ServiceVM[]> {
    return this.http.get<ServiceVM[]>(Globals.BASE_API_URL + 'Services').pipe();
  }
  SaveService(value: ServiceVM): Observable<any> {
    return this.http.post(Globals.BASE_API_URL + 'Services', value);
  }
  DeleteService(id: number) {
    return this.http.delete(Globals.BASE_API_URL + 'Services/' + id);
  }
  EditService(id: number) {
    return this.http.delete(Globals.BASE_API_URL + 'Services/' + id);
  }


  
  UpdateServiceOutline(value: ServiceOutlineVM): Observable<any> {
    return this.http.put(Globals.BASE_API_URL + 'ServiceOutline', value);
  }
  GetServiceOutlineById(id: number): Observable<ServiceOutlineVM> {
    return this.http.get<ServiceOutlineVM>(Globals.BASE_API_URL + 'ServiceOutline/' + id).pipe()
  }
  SearchServiceOutline(value: ServiceOutlineVM): Observable<ServiceOutlineVM[]> {
    return this.http.post<ServiceOutlineVM[]>(Globals.BASE_API_URL + 'ServiceOutline/Search', value).pipe();
  }
  GetServiceOutline(): Observable<ServiceOutlineVM[]> {
    return this.http.get<ServiceOutlineVM[]>(Globals.BASE_API_URL + 'ServiceOutline').pipe();
  }
  SaveServiceOutline(value: ServiceOutlineVM): Observable<any> {
    return this.http.post(Globals.BASE_API_URL + 'ServiceOutline', value);
  }
  DeleteServiceOutline(id: number) {
    return this.http.delete(Globals.BASE_API_URL + 'ServiceOutline/' + id);
  }
  EditServiceOutline(id: number) {
    return this.http.delete(Globals.BASE_API_URL + 'ServiceOutline/' + id);
  }

  UpdateServiceCharges(value: ServiceChargesVM): Observable<any> {
    return this.http.put(Globals.BASE_API_URL + 'ServiceCharges', value);
  }
  GetServiceChargesById(id: number): Observable<ServiceChargesVM> {
    return this.http.get<ServiceChargesVM>(Globals.BASE_API_URL + 'ServiceCharges/' + id).pipe()
  }
  SearchServiceCharges(value: ServiceChargesVM): Observable<ServiceChargesVM[]> {
    return this.http.post<ServiceChargesVM[]>(Globals.BASE_API_URL + 'ServiceCharges/Search', value).pipe();
  }
  GetServiceCharges(): Observable<ServiceChargesVM[]> {
    return this.http.get<ServiceChargesVM[]>(Globals.BASE_API_URL + 'ServiceCharges').pipe();
  }
  SaveServiceCharges(value: ServiceChargesVM): Observable<any> {
    return this.http.post(Globals.BASE_API_URL + 'ServiceCharges', value);
  }
  DeleteServiceCharges(id: number) {
    return this.http.delete(Globals.BASE_API_URL + 'ServiceCharges/' + id);
  }
  EditServiceCharges(id: number) {
    return this.http.delete(Globals.BASE_API_URL + 'ServiceCharges/' + id);
  }

  
  UpdateServiceCompaign(value: ServiceCompaignVM): Observable<any> {
    return this.http.put(Globals.BASE_API_URL + 'ServiceCompaign', value);
  }
  GetServiceCompaignById(id: number): Observable<ServiceCompaignVM> {
    return this.http.get<ServiceCompaignVM>(Globals.BASE_API_URL + 'ServiceCompaign/' + id).pipe()
  }
  SearchServiceCompaign(value: ServiceCompaignVM): Observable<ServiceCompaignVM[]> {
    return this.http.post<ServiceCompaignVM[]>(Globals.BASE_API_URL + 'ServiceCompaign/Search', value).pipe();
  }
  GetServiceCompaign(): Observable<ServiceCompaignVM[]> {
    return this.http.get<ServiceCompaignVM[]>(Globals.BASE_API_URL + 'ServiceCompaign').pipe();
  }
  SaveServiceCompaign(value: ServiceCompaignVM): Observable<any> {
    return this.http.post(Globals.BASE_API_URL + 'ServiceCompaign', value);
  }
  DeleteServiceCompaign(id: number) {
    return this.http.delete(Globals.BASE_API_URL + 'ServiceCompaign/' + id);
  }
  EditServiceCompaign(id: number) {
    return this.http.delete(Globals.BASE_API_URL + 'ServiceCompaign/' + id);
  }

}
