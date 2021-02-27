import React, { useEffect, useState } from 'react';
import IListDataService from '../../entity/general-grid/IListDataService';
import IGridConfig, { ITitleWidthPair } from "../../entity/general-grid/grid-config";
import IListDataServiceFilter from '../../entity/general-grid/I-list-data-service-filter';
import RowMetaData from '../../entity/general-grid/row-meta-data';
import './css/general-grid.css';
import SimpleNarrowWaiting from '../simple-waiting/simple-waiting';
import { SimpleNarrowMessage } from '../simple-narrow-message/simple-narrow-message';
import { GlobalMessageType } from '../../entity/global-message/enum/global-message-type';
import ErrorMessage from '../../resource/text/error-message';
import Response from '../../communication/entity/response-novel';
import ActionButton, { ActionType } from './grid-action-button';

export interface IGeneralGridParams {
    gridConfig: IGridConfig;
    listDataService: IListDataService;
    filter: IListDataServiceFilter;
}

export default function GeneralGrid(
    generalGridParams: IGeneralGridParams): JSX.Element {

    const [isGridLoaded, setIsGridLoaded] = useState<boolean>(false);
    const [hasGridError, setHasGridError] = useState<boolean | undefined>(undefined);
    const [gridId] = useState<string>(generalGridParams.gridConfig.id);
    const [hasRowsActions] = useState<boolean>(generalGridParams.gridConfig.hasActions);
    const [headerColor] = useState<string>(generalGridParams.gridConfig.headerColour);
    const [headerCellColor] = useState<string>(generalGridParams.gridConfig.headerCellColor);
    const [headerTitleWidthPair] = useState<ITitleWidthPair[]>(generalGridParams.gridConfig.headerTitleWidthPair);
    const [totalRecords, setTotalRecords] = useState<number>(0);
    const [listDataServiceFilter, setListDataServiceFilter] = useState<IListDataServiceFilter>(generalGridParams.filter);
    const [listDataService] = useState<IListDataService>(generalGridParams.listDataService);
    const [rows, setRows] = useState<RowMetaData[] | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        listDataService?.countListData(null).then((countResponseData: Response<number>) => {
            if (countResponseData.isSuccessful) {
                const countRecords = ((countResponseData.outputJson as number) > 100) ? 100 : countResponseData.outputJson;
                setTotalRecords(countRecords as number);
                listDataService.listData(listDataServiceFilter)
                    .then((listDataServiceResponse: Response<RowMetaData[]>) => {
                        if (listDataServiceResponse.isSuccessful) {
                            setRows(listDataServiceResponse.outputJson);
                            setHasGridError(false);
                            setIsGridLoaded(true);
                        }
                        else {
                            setHasGridError(true);
                            setIsGridLoaded(true);
                        }
                    })
            }
            else {
                setHasGridError(true);
                setIsGridLoaded(true);
            }
        })
    }, []);

    const createGridHeader = (): JSX.Element => {
        const header = (
            <div id={gridId + '-headerContainer'}
                className={'headerContainer'}
                style={{ backgroundColor: headerColor }}>
                <div className={'headerCell'} style={{ width: '5%', color: headerCellColor }}>{'Row'}</div>
                {
                    ((): JSX.Element[] => {
                        const headerCells: JSX.Element[] = [];
                        headerTitleWidthPair?.forEach((p, index) => {
                            const cell = (
                                <div key={index}
                                    className={'headerCell'}
                                    style={{ width: p.width + '%', color: headerCellColor }}>
                                    {p.title}
                                </div>)
                            headerCells.push(cell);
                        })
                        return headerCells;
                    })()
                }
                {
                    hasRowsActions &&
                    <div className={'headerCell'} style={{ width: '20%', color: headerCellColor }}>{'Actions'}</div>
                }
            </div>
        );
        return header;
    }

    const createGridRows = (): JSX.Element => {
        const rowsContainer = (
            <div id={gridId + '-rowsContainer'}
                className={'rowsContainer'}>
                {
                    ((): JSX.Element[] => {
                        const rowElements: JSX.Element[] = [];
                        rows?.forEach((r, rowIndex) => {
                            let cssClasses = '';
                            r.annotations.forEach((a) => {
                                cssClasses = cssClasses + ' ' + a;
                            })
                            cssClasses = ((rowIndex + 1) % 2 === 0) ? cssClasses + ' evenRow' : cssClasses + ' oddRow';
                            const rowElement = (
                                <div className={'gridRow ' + cssClasses} key={rowIndex} >
                                    {
                                        ((): JSX.Element[] => {
                                            const rowCells: JSX.Element[] = [];
                                            const rowCounter = <div className={'rowCell'}
                                                style={{ width: '5%' }}
                                                key={0}>
                                                {rowIndex + 1}
                                            </div>;
                                            rowCells.push(rowCounter);

                                            headerTitleWidthPair?.forEach((p, pIndex) => {
                                                const cell = <div className={'rowCell'}
                                                    key={pIndex + 1}
                                                    style={{ width: p.width + '%' }}>
                                                    {
                                                        r?.rowData[p.dataKey]
                                                    }
                                                </div>;
                                                rowCells.push(cell);
                                            })

                                            if (hasRowsActions) {
                                                const cell = <div className={'rowCell'}
                                                    key={'actionsCell'}
                                                    style={{ width: '20%' }}>
                                                    {
                                                        r.hasView && <ActionButton type={ActionType.view} action={() => { }} />
                                                    }
                                                    {
                                                        r.hasUpdate && <ActionButton type={ActionType.update} action={() => { }} />
                                                    }
                                                    {
                                                        r.hasDelete && <ActionButton type={ActionType.delete} action={() => { }} />
                                                    }

                                                </div>;
                                                rowCells.push(cell);
                                            }
                                            return rowCells;
                                        })()
                                    }
                                </div>
                            )
                            rowElements.push(rowElement);
                        })
                        return rowElements;
                    })()
                }
            </div>
        )
        return rowsContainer;
    }

    const loadPage = (chosenPage: number): void => {
        if (chosenPage === currentPage)
            return;
        setListDataServiceFilter({ ...listDataServiceFilter, pageNumber: chosenPage } as IListDataServiceFilter);
        listDataService?.listData(listDataServiceFilter).then((listDataServiceResponse: Response<RowMetaData[]>) => {
            if (listDataServiceResponse.isSuccessful) {
                setRows(listDataServiceResponse.outputJson);
                setCurrentPage(chosenPage);
                setHasGridError(false);
                setIsGridLoaded(true);
            }
            else {
                setHasGridError(true);
                setIsGridLoaded(true);
            }
        })
    }

    const createGridPaging = (): JSX.Element => {
        /* TODO:TEST */
        const pagingContainer =
            <div id={gridId + '-PagingContainer'}>
                {
                    ((): JSX.Element[] => {
                        const numbericBtns: JSX.Element[] = [];
                        let btnsCount = Math.floor(totalRecords / 10);
                        btnsCount = (totalRecords % 10 > 0) ? btnsCount + 1 : btnsCount;
                        for (let i = 0; i < btnsCount; i++) {
                            const numericBtn =
                                <div key={i + 1}
                                    className={'pagingNumericBtn'}
                                    id={gridId + '-PagingContainer-' + (i + 1) + 'NumericBtn'}
                                    onClick={() => {
                                        loadPage(i);
                                    }}>
                                    {i + 1}
                                </div>;
                            numbericBtns.push(numericBtn);
                        }
                        return numbericBtns;
                    })()
                }
            </div>

        return pagingContainer;
    }

    return (
        isGridLoaded ? (
            !hasGridError ? (
                <div className={'generalGridContainer'} id={gridId}>
                    {createGridHeader()}
                    {rows && createGridRows()}
                    {(totalRecords > 10) && createGridPaging()}
                </div>) :
                <SimpleNarrowMessage type={GlobalMessageType.Error} messgae={ErrorMessage.Err0000()} link={''} linkTitle={''} />
        ) : <SimpleNarrowWaiting />
    )

}