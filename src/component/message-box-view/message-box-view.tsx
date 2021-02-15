import React, { Fragment, useEffect, useState } from 'react';
import { AuthenticationState } from '../../entity/global/authentication-state-novel';
import UserService from '../../service/user-service/user-service-novel';
import SimpleNarrowWaiting from '../simple-waiting/simple-waiting';
import { commonMessages } from '../../resource/text/common-messages';
import { appGeneralInfo } from '../../setup-general-information';
import WhiteRibbon from '../white-ribbon/white-ribbon';
import { SimpleNarrowMessage } from '../simple-narrow-message/simple-narrow-message';
import { GlobalMessageType } from '../../entity/global-message/enum/global-message-type';
import ErrorMessage from '../../resource/text/error-message';
import GeneralGrid from '../general-grid/general-grid';
import IGridConfig from '../../entity/general-grid/grid-config';
import IListDataService from '../../entity/general-grid/IListDataService';
import UserMessageService from '../../service/user-message-service/user-message-service';
import IFilter from '../../entity/general-grid/IFilter';

export default function MessageBoxView(): JSX.Element {

    const messageBoxTitle = "Your Messages";
    const [isAuthenticated, setIsAuthenticated] = useState(AuthenticationState.NotSet);
    const [gridConfig, setGridConfig] = useState<IGridConfig | undefined>();
    const [listDataService, setListDataService] = useState<IListDataService | undefined>();
    const [initialFilter, setInitialFilter] = useState<IFilter | undefined>();
    useEffect(() => {
        const userService = new UserService();
        userService.isUserAuthenticated()
            .then((authResponse) => {
                setIsAuthenticated(authResponse.outputJson as AuthenticationState);
                setGridConfig(
                    {
                        id: 'messageBoxGridComponent',
                        headerColour: "#000000",
                        headerCellColour: 'red',
                        headerTitles: ['name', 'family', 'age'],
                        hasPaging: true,
                        oddRowsColur: 'green',
                        evenRowsColour: 'black'

                    } as IGridConfig)
                setListDataService(new UserMessageService());
                setInitialFilter(
                    {
                        pageNumber : 0
                    } as IFilter)

            });
    }, [])
    return (
        <div className={'messageBoxContainer'}>
            {
                (isAuthenticated === AuthenticationState.NotSet) ?
                    <SimpleNarrowWaiting /> : (
                        <Fragment>
                            {
                                (isAuthenticated === AuthenticationState.NotAuthenticated) ?
                                    (
                                        <React.Suspense fallback={<h3>{commonMessages.loading}</h3>}>
                                            <div style={{ visibility: 'hidden' }}>
                                                {
                                                    (window.location.href = appGeneralInfo.baseUrl +
                                                        appGeneralInfo.mainMenuItems.homePage)
                                                }
                                            </div>
                                        </React.Suspense>

                                    ) : (
                                        <Fragment>
                                            {
                                                (isAuthenticated === AuthenticationState.CommunicationError) ?
                                                    (<SimpleNarrowMessage type={GlobalMessageType.Error} link={''} linkTitle={''} messgae={ErrorMessage.Err0007()} />) :
                                                    (
                                                        <Fragment>
                                                            <WhiteRibbon />
                                                            <div className={'messageBoxTitleBar'}>
                                                                <div className={'messageBoxTitle'}>
                                                                    {messageBoxTitle}
                                                                </div>
                                                            </div>
                                                            <div className={'messageBoxGridContainer'}>
                                                                {
                                                                    gridConfig &&
                                                                    listDataService &&
                                                                    initialFilter &&
                                                                    <GeneralGrid
                                                                        gridConfig={gridConfig as IGridConfig}
                                                                        listDataService={listDataService as IListDataService}
                                                                        filter={initialFilter as IFilter} />}
                                                            </div>
                                                        </Fragment>
                                                    )
                                            }
                                        </Fragment>
                                    )
                            }
                        </Fragment>
                    )
            }
        </div>
    )

}