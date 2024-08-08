import { BaseDomainVM } from "../../catalog/Models/BaseDomainVM"

export class ServiceChargesVM extends BaseDomainVM  {

    inquiryId?:number
    serviceCharges?:DoubleRange
    nextDueDate?: Date
    comments?: string
    
}