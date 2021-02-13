import IFilter from './IFilter';
import RowMetaData from './row-meta-data';
import Response from '../../communication/entity/response-novel';
export default interface IListDataService {
    listData: (filter: IFilter) => Promise<Response<RowMetaData[]>>;
    countListData: () => Promise<Response<number>>;
}