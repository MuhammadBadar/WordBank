import { BaseDomainVM } from "../../catalog/Models/BaseDomainVM"

export class FollowUpVM extends BaseDomainVM { 
    statusId?: number
    inquiryId?: number
    date: Date
    nextAppointmentDate: Date
    comment?:string
    followUpStatuses?: string

}