import React from 'react';
import './css/main-container.css';
import { Switch, Route} from "react-router-dom";
import ViewHandler from './util/view-handler.js';

export default class MainContainer extends React.Component {

    constructor(props){
        super(props);   
        this.state = {recreatComponent:true}     
        this.innerLinkClickEventHandler = this.innerLinkClickEventHandler.bind(this);
    }

    innerLinkClickEventHandler(){       
        this.setState({recreatComponent:true});
    }

    render() {
        return (

            <div id='mainContainer' className='absolute'>
                <React.Suspense fallback={<h3>Loading ...</h3>}>
                    <Switch>
                        {/* CATCH ALL POSSIBLE ROUTES! */}
                        <Route>
                            {
                                ViewHandler.retrieveView(this.innerLinkClickEventHandler)                                
                            }
                        </Route>
                    </Switch>
                </React.Suspense>
            </div>
        );
    }

    
}