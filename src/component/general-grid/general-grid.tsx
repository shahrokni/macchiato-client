import React, { Fragment, useEffect, useState } from 'react';
import IListDataService from '../../entity/general-grid/IListDataService';
import IGridConfig from "../../entity/general-grid/grid-config";
import IFilter from '../../entity/general-grid/IFilter';
import RowMetaData from '../../entity/general-grid/row-meta-data';
export default function GeneralGrid(
    gridConfig: IGridConfig,
    listDataService: IListDataService, filter: IFilter): JSX.Element {

    const [isHeaderLoaded, setIsHeaderLoaded] = useState(false);
    const [totalRowCount, setRowTotalCount] = useState(0);
    const [currenPage, setCurrenPage] = useState(0);
    const [rows, setRows] = useState<RowMetaData[] | null>(null);
    const [headerColour, setHeaderColour] = useState('');
    const [headerCellColour, setHeaderCellColour] = useState('');
    const [headerTitles, setHeaderTitles] = useState<string[]>([]);
    const [hasPaging, setHasPaging] = useState<boolean | null>(null);
    const [oddRowsColur, setOddRowsColur] = useState('');
    const [evenRowsColour, setEvenRowsColour] = useState('');
    const [cellLength, setCellLength] = useState('');
    const [gridId, setGridId] = useState('grid-' + Math.floor(Math.random() * Math.floor(10)));
    const [isGridLoaded, setIsGridLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        initialGridParams(gridConfig);
        listDataService.countListData()
            .then((countResponse) => {

                if (countResponse.isSuccessful && countResponse.outputJson) {
                    let total = countResponse.outputJson;
                    total = (total > 100) ? 100 : total;
                    setRowTotalCount(total);
                    filter.pageNumber = currenPage;
                    listDataService.listData(filter)
                        .then((listDataResponse) => {
                            if (listDataResponse.isSuccessful && listDataResponse.outputJson) {
                                const rows = listDataResponse.outputJson;
                                setRows(rows);
                            }
                            else {
                                setHasError(true);
                            }
                        })
                }
                else {
                    setHasError(true);
                }
            })
    }, []);

    const changePage = (pageNumber: number): void => {
        filter.pageNumber = pageNumber
        listDataService.listData(filter)
            .then((listDataResponse) => {
                if (listDataResponse.isSuccessful && listDataResponse.outputJson) {
                    const rows = listDataResponse.outputJson;
                    setRows(rows);
                    setCurrenPage(pageNumber + 1);
                }
                else {
                    setHasError(true);
                }
            });
    }

    const shift2NextPage = (): void => {

    }

    const shift2PrevPage = (): void => {

    }

    const createPager = (): JSX.Element => {
        const pageContainer =
            <div className={'pageContainer'}>

                {
                    ((): JSX.Element[] => {
                        const pageButtons: JSX.Element[] = [];
                        let pagesCount = Math.floor(totalRowCount / 10);
                        if (totalRowCount % 10 !== 0)
                            pagesCount += 1;
                        const btnWidth = (100 / pagesCount).toFixed(2) + '%';
                        for (let i = 0; i < pagesCount; i++) {
                            const pageButton =
                                <div className={'pageButton'} key={'pageBtn-' + (i + 1)} style={{ width: btnWidth }} onClick={() => {
                                    changePage(i + 1)
                                }}>
                                    {i + 1}
                                </div>;
                            pageButtons.push(pageButton);
                        }
                        return pageButtons;
                    })()
                }
            </div>
        return pageContainer;
    }

    const createHeader = (): JSX.Element => {
        const createHeadrCells = (headerTitles: string[]): JSX.Element[] => {
            const headerCells: JSX.Element[] = [];
            headerTitles.forEach((title, idx) => {
                const cell =
                    <div className={'headerCell'} key={'headerCell' + (idx + 1)}
                        style={{ color: headerCellColour, width: cellLength }}>
                        {title}
                    </div>
                headerCells.push(cell);
            })
            return headerCells;
        }
        const header =
            <div className={'gridHeader'} style={{ backgroundColor: headerColour }}>
                <div className={'headerCell'} key={'headerCell0'}>Row</div>
                {createHeadrCells(headerTitles)}
            </div>
        return header;
    }

    const createRows = (): JSX.Element => {

        const rowContainer = <div className={'rowContainer'} id={'rowContainer-' + grid}>
            {
                /* SELF INVOKE */
                ((): JSX.Element[] => {
                    const rowElements: JSX.Element[] = [];
                    if (rows && rows.length != 0) {
                        rows.forEach((r, idx) => {
                            const cellElements: JSX.Element[] = [];
                            let cssClasses = '';
                            ((idx + 1) % 2 === 0) ? (cssClasses += ' even') : (cssClasses += ' odd');
                            r.annotations.forEach((ann) => {
                                cssClasses = cssClasses + ' ' + ann;
                            })
                            const row = <div key={'gridRow-' + (idx + 1)} className={'gridRow' + cssClasses} style={{ backgroundColor: (idx % 2 === 0) ? evenRowsColour : oddRowsColur }}>
                                {
                                    /* SELF INVOKE */
                                    ((): JSX.Element[] => {
                                        let cellCounter = 1;
                                        for (const key in r.rowData) {
                                            if (r.hasOwnProperty(key)) {
                                                const cell =
                                                    <div key={'rowCell-' + cellCounter} className={'rowCell'} id={'rowCell-' + key}>
                                                        {r.rowData[key]}
                                                    </div>
                                                cellElements.push(cell);
                                            }
                                            cellCounter += 1;
                                        }
                                        return cellElements;
                                    })()
                                }
                            </div>
                            rowElements.push(row);
                        });
                    }
                    return rowElements;
                })()
            }
        </div>
        return rowContainer;
    }

    const initialGridParams = (gridConfig: IGridConfig): void => {
        setGridId('grid-' + gridConfig.id)
        setHeaderColour(gridConfig.headerColour);
        setHeaderCellColour(gridConfig.headerCellColour);
        setHeaderTitles(gridConfig.headerTitles);
        setHasPaging(gridConfig.hasPaging);
        setOddRowsColur(gridConfig.oddRowsColur);
        setEvenRowsColour(gridConfig.evenRowsColour);
        setCellLength((100 / (gridConfig.headerTitles.length + 1)).toFixed(2) + '%');
        setIsGridLoaded(true);
        setIsHeaderLoaded(true);
    }

    const grid =
        <Fragment>
            {
                (isGridLoaded) &&
                <div id={gridId} className={'generalGrid'}>
                    {isHeaderLoaded && createHeader()}
                    {rows && createRows()}
                    {totalRowCount && hasPaging && createPager()}
                </div>
            }
        </Fragment>;
    return grid;
}