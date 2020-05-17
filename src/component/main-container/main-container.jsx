import React from 'react';
import './css/main-container.css';
import { Switch, Route} from "react-router-dom";

export default class MainContainer extends React.Component {

    render() {
        return (

            <div id='mainContainer' className='absolute'>
                <React.Suspense fallback={<h3>Loading ...</h3>}>
                    <Switch>
                        <Route>
                            {
                                this.retrieveView()
                            }
                        </Route>
                    </Switch>
                </React.Suspense>
            </div>
        );
    }

    retrieveView() {      
       
        console.log(window.location.href);
        if ('homePage') {
            const HomePageView = React.lazy(() => import('../homepage-view/homepage-view.jsx'));
            return <HomePageView />
        }
    }
}