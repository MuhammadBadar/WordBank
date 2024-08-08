import { BaseDomainVM } from "../../catalog/Models/BaseDomainVM"

export class InquiryVM  extends BaseDomainVM {
    cityId?: number
    statusId?: number
    compainId?: number
    serviceIds?:string
    inquiryName?: string
    inquiryEmail?: string
    inquiryCell?: string
    area?: string
    cnic?: string
    city?:string
    status?:string
    inquiryComments?: string
    selectedServiceIds:number[] =[]
   
}