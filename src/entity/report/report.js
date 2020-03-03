import { ReportType } from "./report-type";
import User from "../user/user";
import { ReportState } from "./report-state";

export class Report {

    constructor() {
        this.reportDate = new Date();
        this.reportLastUpdate = new Date();
        this.reportType = ReportType.NotSet;
        this.student = new User();
        this.state = ReportState.NotSet;
    }
}