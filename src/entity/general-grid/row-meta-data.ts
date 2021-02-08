export default class RowMetaData{
    constructor() {
        this.annotations = [];
        this.hasDelete = false;
        this.hasUpdate = false;
        this.hasView = false;
        this.rowData = null;
    }
    annotations: string[];
    hasDelete: boolean;
    hasUpdate: boolean;
    hasView: boolean;
    rowData: any | null;
}