import React from 'react';
import './css/main-container.css';
export default class MainContainer extends React.Component {

    render() {
        return (

            <div id='mainContainer' className='absolute'>
                 <React.Suspense fallback={<div>Loading...</div>}>
                {this.generateInnerView(this.props.innerViewtId)}
                </React.Suspense>
            </div>
        );
    }

    generateInnerView(innerViewId) {

        let TargetComponent = undefined;
        let finalComponent = undefined;

        switch (innerViewId) {

            case 'homePage':
                TargetComponent = React.lazy(() => import('../homepage-view/homepage-view.jsx'));
                finalComponent = <TargetComponent/>
                break;
            case 'mockTests':
                TargetComponent = React.lazy(()=>import('../mocktests-view/mocktests.jsx'));
                finalComponent = <TargetComponent/>
                break;
            case 'reports':
                TargetComponent = React.lazy(()=>import('../reports-view/reports-view.jsx'));
                finalComponent = <TargetComponent/>
                break;
            case 'account':
                TargetComponent = React.lazy(()=>import('../account-view/account-view.jsx'));
                finalComponent = <TargetComponent/>
                break;
            case 'wallet':
                TargetComponent = React.lazy(()=>import('../wallet-view/wallet-view.jsx'));
                finalComponent = <TargetComponent/>
                break;
            case 'messages':
                TargetComponent = React.lazy(()=>import('../message-box-view/message-box-view.jsx'));
                finalComponent = <TargetComponent/>
                break;
            case 'about': 
                TargetComponent = React.lazy(()=>import('../about-view/about-view.jsx'));
                finalComponent = <TargetComponent/>
                break;
        }

       return finalComponent;
    }
}