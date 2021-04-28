import IListDataServiceFilter from './I-list-data-service-filter';
import RowMetaData from './row-meta-data';
import Response from '../../communication/entity/response-novel';
export default interface IListDataService {
    listData: (filter: IListDataServiceFilter | undefined | null) => Promise<Response<RowMetaData[]>>;
    countListData: (filter: IListDataServiceFilter | undefined | null) => Promise<Response<number>>;
}