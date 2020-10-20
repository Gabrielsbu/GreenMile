import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import UserMap from './pages/UserMap';

function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Main}/>
                <Route path="/users/:name" component={UserMap}/>
                <Route path="/users/:name/repos" component={UserMap}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;