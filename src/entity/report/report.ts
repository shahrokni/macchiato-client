import { ReportType } from "./report-type";
import { User } from "../user/user";
import { ReportState } from "./report-state";

export class Report{
    reportDate:Date;
    reportLastUpdate:Date;
    reportType:ReportType;
    student:User;
    state:ReportState;
}