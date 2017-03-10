import React from 'react';
import { Router, Route, hashHistory } from 'react-router'

import { App } from './components/App.js';
import { Charts } from './containers/charts/charts';

export default () => {
    return (
      <Router history={hashHistory} >
       <Route path="/" component={App}>
        <Route path="charts" component={Charts} />
       </Route>
      </Router>
    );
}
