export class FollowUpVM{
    id?: number
    statusId?: number
    inquiryId?: number
    date: Date
    nextAppointmentDate: Date
    comment?:string
    isActive: boolean
    parentId: number | undefined
    enumTypeId: number | undefined

}