
import "core-js/stable";

import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss'
import App from './App';
import * as serviceWorker from './serviceWorker';


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.css";

import 'semantic-ui-css/semantic.min.css'
 

ReactDOM.render(
 
    <App />,
  document.getElementById('big-eat')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
