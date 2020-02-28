import { ReportType } from "./report-type";
import  User  from "../user/user";
import { ReportState } from "./report-state";

export class Report{
    reportDate:Date=new Date();
    reportLastUpdate:Date=new Date();
    reportType:ReportType=ReportType.notSet;
    student:User = new User();
    state:ReportState=ReportState.notSet;
}