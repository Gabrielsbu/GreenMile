import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import UserMap from './pages/UserMap';

function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Main}/>
                <Route path="/users" component={UserMap}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;