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
        switch (innerViewId) {
            case 'homePage':
                TargetComponent = React.lazy(() => import('../register-view/register-view.jsx'));
                break;
        }

        if (TargetComponent) {
            return <TargetComponent />;
        }
    }
}