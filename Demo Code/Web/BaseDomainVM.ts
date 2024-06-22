export class BaseDomainVM {
    id: number
    clientId: number
    createdOn: Date
    mondifiedOn: Date
    createdById: number
    modifiedById: number
    isActive: boolean
    hasErrors: boolean
    responseMessage: string
    userFriendlyMessage: string;
    messageType: string;
    message: string;
    pageNo: number;
    pageSize: number;
    includeSubordinatesData: boolean
    resultMessages: ResultMsg[];
    totalRecords: number
}
export class ResultMsg {
    messageType: string;
    message: string;
}
export class Response {
    messageType: string
    message: string;
    isSuccess: Boolean;
}