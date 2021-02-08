import React, { useEffect, useState } from 'react';
import IListDataService from '../../entity/general-grid/IListDataService';
import IGridConfig from "../../entity/general-grid/grid-config";
import IFilter from '../../entity/general-grid/IFilter';
import RowMetaData from '../../entity/general-grid/row-meta-data';
export default function GeneralGrid(
    gridConfig: IGridConfig,
    listDataService: IListDataService, filter: IFilter): JSX.Element {

    const pageSize = 12;
    const [isHeaderLoaded, setIsHeaderLoaded] = useState(false);
    const [areRowsLoaded, setAreRosLoaded] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalRowCount, setRowTotalCount] = useState(0);
    const [currenPage, setCurrenPage] = useState(1);
    const [rows, setRows] = useState<JSX.Element[] | null>(null);
    const [headerColour, setHeaderColour] = useState('');
    const [headerCellColour, setHeaderCellColour] = useState('');
    const [headerTitles, setHeaderTitles] = useState<string[]>([]);
    const [hasPaging, setHasPaging] = useState<boolean | null>(null);
    const [oddRowsColur, setOddRowsColur] = useState('');
    const [evenRowsColour, setEvenRowsColour] = useState('');


    useEffect(() => {
        initialGridParams(gridConfig);
        listDataService.countListData()
            .then((total) => {
                //TODO...
                setRowTotalCount(total);
                filter.pageNumber = currenPage;
                listDataService.listData(filter)
                    .then((rows) => {
                        setRows(createRows(rows));
                    })
            })
    }, []);

    const changePage = ():void =>{
        //IMPORTANT!
    }

    const createPager = (totalRows:number):JSX.Element =>{
        return <div></div>
    }

    const createHeader = (): JSX.Element => {
        return <div></div>
    }

    const createRows = (rows: RowMetaData[]): JSX.Element[] => {
        return [];
    }

    const initialGridParams = (gridConfig: IGridConfig): void => {
        setHeaderColour(gridConfig.headerColour);
        setHeaderCellColour(gridConfig.headerCellColour);
        setHeaderTitles(gridConfig.headerTitles);
        setHasPaging(gridConfig.hasPaging);
        setOddRowsColur(gridConfig.oddRowsColur);
        setEvenRowsColour(gridConfig.evenRowsColour);
        setIsHeaderLoaded(true);
    }
    return <h1>!</h1>
}