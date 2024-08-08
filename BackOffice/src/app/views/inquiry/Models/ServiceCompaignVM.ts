import { BaseDomainVM } from "../../catalog/Models/BaseDomainVM"

export class ServiceCompaignVM extends BaseDomainVM {

    templateId?:number
    serviceId?:number
    startDate?:Date
    endDate?:Date
    title?:string
    templates?:string
    services?:string
  date: Date
}