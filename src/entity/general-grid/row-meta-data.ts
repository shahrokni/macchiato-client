export default class RowMetaData {
    constructor() {
        this.annotations = [];      
    }
    annotations: string[];
    hasDelete: boolean | undefined;
    deletionId:string | undefined
    hasUpdate: boolean | undefined;
    updateUrl: string | undefined;
    hasView: boolean | undefined;
    viewUrl: string | undefined;
    rowData: any | undefined;    
}