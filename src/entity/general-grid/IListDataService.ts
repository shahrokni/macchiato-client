import IFilter from './IFilter';
import RowMetaData from './row-meta-data';
export default interface IListDataService {
    listData: (filter: IFilter) => Promise<RowMetaData[]>;
    countListData: () => Promise<number>;
}