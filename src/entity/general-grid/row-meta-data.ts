export default class RowMetaData {
    constructor() {
        this.annotations = [];     
    }
    annotations: string[];
    hasDelete: boolean | undefined;
    hasUpdate: boolean | undefined;
    hasView: boolean | undefined;
    rowData: any | undefined;
}